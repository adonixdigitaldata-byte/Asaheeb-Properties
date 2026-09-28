import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { validatePhoneNumber } from "@/data/countriesData";
import { BANKS, MORTGAGE_CONFIG } from "@/components/mortgage-calculator/constants";
import { calculateMortgage, getRate, getMinDownPaymentPct } from "@/components/mortgage-calculator/engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      phoneNumber,
      monthlyIncome,
      redfSupported,
      monthlyObligations,
      price,
      isCitizen,
      isFirstHome,
      downPaymentAmount,
      loanPeriodYears,
      bankSlug,
    } = body;

    // ── 1. Required field validation ─────────────────────────────────────────
    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "Full name is required" },
        { status: 400 }
      );
    }
    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.isValid) {
      return NextResponse.json(
        { success: false, error: phoneValidation.errorMessageEn || "Invalid phone number" },
        { status: 400 }
      );
    }

    // ── 2. Calculator input validation ───────────────────────────────────────
    if (
      typeof price !== "number" ||
      typeof downPaymentAmount !== "number" ||
      typeof loanPeriodYears !== "number"
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid calculator inputs" },
        { status: 400 }
      );
    }

    if (
      loanPeriodYears < MORTGAGE_CONFIG.minLoanPeriodYears ||
      loanPeriodYears > MORTGAGE_CONFIG.maxLoanPeriodYears
    ) {
      return NextResponse.json(
        { success: false, error: "Loan period must be between 5 and 25 years" },
        { status: 400 }
      );
    }

    const minDownPct = getMinDownPaymentPct(Boolean(isCitizen), isFirstHome ?? null);
    const minDown = price * (minDownPct / 100);
    const maxDown = price * (MORTGAGE_CONFIG.maxDownPaymentPct / 100);

    if (downPaymentAmount < minDown || downPaymentAmount > maxDown) {
      return NextResponse.json(
        { success: false, error: `Down payment must be between ${minDownPct}% and ${MORTGAGE_CONFIG.maxDownPaymentPct}% of property price` },
        { status: 400 }
      );
    }

    // ── 3. Bank validation ───────────────────────────────────────────────────
    const bank = BANKS.find((b) => b.slug === bankSlug);
    if (!bank) {
      return NextResponse.json(
        { success: false, error: "Invalid bank selection" },
        { status: 400 }
      );
    }

    // ── 4. Re-run calculation server-side (do NOT trust client-sent results) ─
    const appliedRatePct = getRate(bankSlug, loanPeriodYears);
    const calcResult = calculateMortgage({
      price,
      downPaymentAmount,
      loanPeriodYears,
      annualRatePct: appliedRatePct,
    });

    const downPaymentPct = (downPaymentAmount / price) * 100;
    const formattedPhone =
      phoneValidation.formattedInternational || phoneNumber.trim();

    // ── 5. Insert into mortgage_leads table with fallback to general leads table ──
    const leadRecord = {
      full_name: fullName.trim(),
      phone_number: formattedPhone,
      monthly_income: monthlyIncome || null,
      redf_supported: redfSupported ?? null,
      monthly_obligations: monthlyObligations || null,
      property_price: price,
      is_citizen: Boolean(isCitizen),
      is_first_home: isCitizen ? (isFirstHome ?? null) : null,
      down_payment_amount: downPaymentAmount,
      down_payment_pct: Math.round(downPaymentPct * 100) / 100,
      loan_period_years: loanPeriodYears,
      bank_slug: bankSlug,
      bank_name_en: bank.nameEn,
      applied_rate_pct: appliedRatePct,
      monthly_instalment: Math.round(calcResult.monthlyInstalment),
      total_payable_value: Math.round(calcResult.totalPayableValue),
      total_loan_amount: Math.round(calcResult.totalLoanAmount),
      bank_profit_percentage:
        Math.round(calcResult.bankProfitPercentage * 10000) / 10000,
      status: "new",
      source: "mortgage_calculator_page",
    };

    let leadSaved = false;
    let savedLeadId: string | null = null;

    // Try primary mortgage_leads table (write-only insert without .select to respect RLS insert policy)
    try {
      const { error: insertError } = await supabase
        .from("mortgage_leads")
        .insert([leadRecord]);

      if (!insertError) {
        leadSaved = true;
        savedLeadId = "mortgage_lead_recorded";
      } else {
        console.warn("Primary mortgage_leads insert note:", insertError.message);
      }
    } catch (e: any) {
      console.warn("mortgage_leads table insert attempt:", e?.message);
    }

    // Always ensure lead is recorded in the standard 'leads' table as well
    try {
      const generalLeadPayload: Record<string, any> = {
        name: fullName.trim(),
        phone: formattedPhone,
        source: "mortgage_calculator_page",
        interest: `Mortgage Request — ${bank.nameEn}`,
        form_data: {
          form_type: "Mortgage Calculator Lead",
          bank: bank.nameEn,
          property_price: price,
          down_payment: downPaymentAmount,
          down_payment_pct: Math.round(downPaymentPct * 10) / 10,
          loan_period_years: loanPeriodYears,
          applied_rate_pct: appliedRatePct,
          monthly_instalment: Math.round(calcResult.monthlyInstalment),
          total_payable: Math.round(calcResult.totalPayableValue),
          monthly_income: monthlyIncome || null,
          monthly_obligations: monthlyObligations || null,
          redf_supported: redfSupported ?? null,
          is_citizen: Boolean(isCitizen),
          is_first_home: isCitizen ? (isFirstHome ?? null) : null,
          submitted_at: new Date().toISOString(),
        },
      };

      const { data: fallbackLead, error: fallbackError } = await supabase
        .from("leads")
        .insert([generalLeadPayload])
        .select("id")
        .single();

      if (!fallbackError && fallbackLead) {
        leadSaved = true;
        if (!savedLeadId) savedLeadId = fallbackLead.id;
      } else if (fallbackError) {
        // Fallback without form_data JSON if schema is strict
        const minimalPayload = {
          name: fullName.trim(),
          phone: formattedPhone,
          source: "mortgage_calculator_page",
          interest: `Mortgage — ${bank.nameEn} (Price: SAR ${price.toLocaleString()}, Mo: SAR ${Math.round(calcResult.monthlyInstalment).toLocaleString()})`,
        };
        await supabase.from("leads").insert([minimalPayload]);
        leadSaved = true;
      }
    } catch (leadsErr: any) {
      console.warn("CRM leads table backup note:", leadsErr?.message);
    }

    // ── 6. Trigger email notification ────────────────────────────────────────
    let emailSent = false;
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

      const nationalityLabel = isCitizen
        ? `Saudi Citizen${isFirstHome ? " — First Home" : " — Not First Home"}`
        : "Non-Saudi";

      const emailRes = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Mortgage Calculator Lead",
          name: fullName.trim(),
          phone: formattedPhone,
          interest: `Mortgage Request — ${bank.nameEn}`,
          message: [
            `Bank: ${bank.nameEn}`,
            `Property Price: SAR ${price.toLocaleString("en-US")}`,
            `Down Payment: SAR ${downPaymentAmount.toLocaleString("en-US")} (${downPaymentPct.toFixed(1)}%)`,
            `Loan Period: ${loanPeriodYears} years`,
            `Applied Rate: ${appliedRatePct}%`,
            `Monthly Instalment: SAR ${Math.round(calcResult.monthlyInstalment).toLocaleString("en-US")}`,
            `Total Payable: SAR ${Math.round(calcResult.totalPayableValue).toLocaleString("en-US")}`,
            `Nationality: ${nationalityLabel}`,
            monthlyIncome ? `Monthly Income: SAR ${monthlyIncome.toLocaleString("en-US")}` : null,
            monthlyObligations ? `Monthly Obligations: SAR ${monthlyObligations.toLocaleString("en-US")}` : null,
            redfSupported !== null && redfSupported !== undefined
              ? `REDF Supported: ${redfSupported ? "Yes" : "No"}`
              : null,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      if (emailRes.ok) emailSent = true;
    } catch (emailErr) {
      console.error("Mortgage lead email notification error:", emailErr);
    }

    // If saved to any table OR email sent, treat as success
    if (leadSaved || emailSent) {
      return NextResponse.json({
        success: true,
        id: savedLeadId || "received",
        status: "new",
      });
    }

    return NextResponse.json(
      { success: false, error: "Failed to record lead. Please try again or reach out on WhatsApp." },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Error in /api/mortgage-lead:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to submit mortgage request" },
      { status: 500 }
    );
  }
}
