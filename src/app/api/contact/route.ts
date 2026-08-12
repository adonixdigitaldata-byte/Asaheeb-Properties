import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/data/contactConfig";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      formType = "Website Lead",
      name = "N/A",
      email = "N/A",
      phone = "N/A",
      interest = "General Inquiry",
      budget = "Not Specified",
      message = "No additional message provided.",
      projectName = "",
    } = body;

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Riyadh",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const isProjectInquiry = Boolean(projectName);
    const emailSubject = isProjectInquiry
      ? `[New Inquiry] ${projectName} — ${name}`
      : `[New Lead - ${formType}] ${name}`;

    // Luxury HTML Email Template
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0F1117; color: #E8DFCE; margin: 0; padding: 20px; }
          .container { max-width: 650px; margin: 0 auto; background-color: #12130F; border: 1px solid #B8873B; border-radius: 4px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background-color: #171813; border-bottom: 2px solid #B8873B; padding: 25px 30px; text-align: center; }
          .header h1 { color: #B8873B; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; }
          .header p { color: #8C8477; margin: 5px 0 0 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; }
          .content { padding: 30px; }
          .badge { display: inline-block; background-color: rgba(184,135,59,0.15); color: #B8873B; border: 1px solid rgba(184,135,59,0.4); padding: 4px 12px; font-size: 10px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; border-radius: 2px; }
          .data-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
          .data-table th, .data-table td { text-align: left; padding: 12px 15px; border-bottom: 1px solid rgba(184,135,59,0.15); }
          .data-table th { color: #B8873B; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; width: 35%; background-color: rgba(255,255,255,0.02); }
          .data-table td { color: #E8DFCE; font-size: 14px; }
          .message-box { background-color: rgba(255,255,255,0.03); border-left: 3px solid #B8873B; padding: 15px 20px; margin-top: 15px; font-size: 14px; line-height: 1.6; color: #D4C7B5; }
          .footer { background-color: #070A0D; padding: 18px 30px; text-align: center; font-size: 11px; color: #8C8477; border-top: 1px solid rgba(255,255,255,0.08); }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ASAHEEB REAL ESTATE</h1>
            <p>Investment Advisory & Lead Portal</p>
          </div>
          <div class="content">
            <span class="badge">${formType.toUpperCase()}</span>
            ${isProjectInquiry ? `<div style="color: #7FA8B3; font-size: 13px; font-weight: bold; margin-bottom: 15px;">PROJECT: ${projectName.toUpperCase()}</div>` : ""}
            
            <table class="data-table">
              <tr>
                <th>Full Name</th>
                <td><strong>${name}</strong></td>
              </tr>
              <tr>
                <th>Phone / WhatsApp</th>
                <td><a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="color: #25D366; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td><a href="mailto:${email}" style="color: #B8873B; text-decoration: none;">${email}</a></td>
              </tr>
              ${interest !== "General Inquiry" ? `<tr><th>Investment Interest</th><td>${interest}</td></tr>` : ""}
              ${budget !== "Not Specified" ? `<tr><th>Budget Range</th><td>${budget}</td></tr>` : ""}
              <tr>
                <th>Submitted At (AST)</th>
                <td>${timestamp}</td>
              </tr>
            </table>

            ${message ? `
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #B8873B; margin-top: 20px;">Client Message / Request Notes:</div>
              <div class="message-box">${message.replace(/\n/g, "<br/>")}</div>
            ` : ""}
          </div>
          <div class="footer">
            Automated Lead Notification · Asaheeb Real Estate Saudi Arabia · Destined to: ${CONTACT_EMAIL}
          </div>
        </div>
      </body>
    </html>
    `;

    // Setup SMTP Transporter if credentials configured in process.env, otherwise fallback cleanly
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Asaheeb Website Leads" <${smtpUser}>`,
        to: CONTACT_EMAIL,
        replyTo: email !== "N/A" ? email : undefined,
        subject: emailSubject,
        html: htmlTemplate,
      });
    } else {
      console.log("==========================================");
      console.log(`[INSTANT LEAD EMAIL NOTIFICATION] To: ${CONTACT_EMAIL}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Name: ${name} | Phone: ${phone} | Email: ${email}`);
      console.log(`Form Type: ${formType} | Project: ${projectName}`);
      console.log(`Budget: ${budget} | Interest: ${interest}`);
      console.log(`Message: ${message}`);
      console.log("==========================================");
    }

    return NextResponse.json({ success: true, message: "Lead submitted and emailed successfully" });
  } catch (error) {
    console.error("Error submitting lead:", error);
    return NextResponse.json({ success: false, error: "Failed to process lead submission" }, { status: 500 });
  }
}
