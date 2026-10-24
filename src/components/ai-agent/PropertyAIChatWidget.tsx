"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProjectDetail } from "@/types/database";
import { validatePhoneNumber, PRIORITY_COUNTRIES } from "@/data/countriesData";
import { parseFloorPlan } from "@/lib/floorPlanParser";

export interface MessageCard {
  type:
    | "FLOOR_PLAN"
    | "PAYMENT_MILESTONES"
    | "LEAD_CAPTURE"
    | "BROCHURE_GATE"
    | "PROJECT_SHARE"
    | "PROJECT_RECOMMENDATION";
  title?: string;
  items?: any[];
  project_id?: string;
  project_name?: string;
  city?: string;
  district?: string;
  starting_price?: string;
  cover_image?: string;
  url?: string;
  full_url?: string;
  description?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "agent";
  text: string;
  cards?: MessageCard[];
  timestamp: string;
}

// Helper: Format message text with bolding, lists, and safe links
function renderFormattedMessage(rawText: string, hasShareCard?: boolean) {
  let cleaned = rawText || "";

  // If share card is rendered, strip duplicated project page link from the text
  if (hasShareCard) {
    cleaned = cleaned
      .replace(/\[https?:\/\/[^\]]+\]\((https?:\/\/[^\)]+)\)/gi, "")
      .replace(/https?:\/\/www\.asaheebrealestate\.com\/projects\/[a-zA-Z0-9_-]+/gi, "")
      .replace(/at the following link:\s*$/gim, "")
      .replace(/على الرابط التالي:\s*$/gim, "")
      .trim();
  }

  // Clean dangling markdown image syntax or stray ! before project names
  cleaned = cleaned
    .replace(/!\[[^\]]*\](?:\([^\)]*\))?/g, "")
    .replace(/^!\s*([a-zA-Z0-9\u0600-\u06FF])/gm, "$1")
    .replace(/\n!\s*([a-zA-Z0-9\u0600-\u06FF])/g, "\n$1");

  const lines = cleaned.split("\n");

  const renderInline = (str: string) => {
    const tokens: React.ReactNode[] = [];
    // Tokenize bold (**text**) and markdown links ([text](url))
    const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        tokens.push(str.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith("**") && token.endsWith("**")) {
        tokens.push(
          <strong key={`b_${match.index}`} className="font-semibold text-white">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
        const textMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (textMatch) {
          tokens.push(
            <a
              key={`a_${match.index}`}
              href={textMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6C687] hover:underline font-medium underline-offset-2"
            >
              {textMatch[1]}
            </a>
          );
        }
      }
      lastIndex = match.index + token.length;
    }

    if (lastIndex < str.length) {
      tokens.push(str.substring(lastIndex));
    }

    return tokens.length > 0 ? tokens : str;
  };

  return (
    <div className="space-y-1.5 leading-relaxed text-[13px]">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="h-1" />;
        }

        // Numbered item: e.g. "1. **Title**..."
        const numMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
              <span className="font-mono text-[#E6C687] text-xs font-bold pt-0.5">{numMatch[1]}.</span>
              <div className="flex-1 text-gray-200">{renderInline(numMatch[2])}</div>
            </div>
          );
        }

        // Bullet item: e.g. "* **Title**..." or "- Title"
        const bulletMatch = trimmed.match(/^[\*\-•]\s+(.*)$/);
        if (bulletMatch) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 my-0.5 pl-1.5">
              <span className="text-[#B8873B] text-xs pt-0.5">•</span>
              <div className="flex-1 text-gray-200">{renderInline(bulletMatch[1])}</div>
            </div>
          );
        }

        return (
          <p key={lineIdx} className="text-gray-100">
            {renderInline(line)}
          </p>
        );
      })}
    </div>
  );
}

interface PropertyAIChatWidgetProps {
  project: ProjectDetail;
  initialLanguage?: "ar" | "en";
  onOpenBrochureModal?: () => void;
}

export default function PropertyAIChatWidget({
  project,
  initialLanguage = "ar",
  onOpenBrochureModal,
}: PropertyAIChatWidgetProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"ar" | "en">(initialLanguage);
  const isAr = language === "ar";

  const [sessionId, setSessionId] = useState<string>("");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Quick form lead capture in chat
  const [phoneInput, setPhoneInput] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState<any>("SA");
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or restore session & check lead status
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionKey = `asaheeb_ai_session_${project.id}`;
      let stored = sessionStorage.getItem(sessionKey);
      if (!stored) {
        stored = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        sessionStorage.setItem(sessionKey, stored);
      }
      setSessionId(stored);

      // Initial welcome message
      const welcomeText = isAr
        ? project.ai_agent_welcome_ar ||
          `مرحباً بك! أنا مستشارك العقاري المعتمد لمشروع ${project.nameAr || project.nameEn}. يسعدني إطلاعك على أحدث الأسعار، المخططات، وخيارات التملك.`
        : project.ai_agent_welcome_en ||
          `Welcome! I am your dedicated luxury property advisor for ${project.nameEn || project.nameAr}. How can I assist you with floor plans, pricing, or internal project tours today?`;

      setMessages([
        {
          id: "welcome",
          sender: "agent",
          text: welcomeText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [project, isAr]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Lock background scrolling on mobile when chat drawer is open
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isOpen && window.innerWidth < 768) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Quick prompt triggers
  const quickPrompts = isAr
    ? [
        "ما هو السعر والدفعة الأولى؟",
        "استعراض المخططات والمساحات",
        "تحميل كتيب المشروع (PDF)",
        "مشاركة رابط هذا المشروع",
        "مشاريع أخرى مشابهة في جدة",
      ]
    : [
        "What is the starting price?",
        "Show available layouts",
        "Download brochure (PDF)",
        "Share link to this project",
        "Similar projects in Jeddah",
      ];

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    // If user clicked brochure download quick prompt and modal is provided, open modal too
    if (
      onOpenBrochureModal &&
      (textToSend.includes("تحميل كتيب") ||
        textToSend.includes("Download brochure") ||
        textToSend.toLowerCase().includes("brochure"))
    ) {
      onOpenBrochureModal();
    }

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage("");
    setIsLoading(true);

    try {
      const webhookUrl =
        process.env.NEXT_PUBLIC_PROPERTY_AI_WEBHOOK_URL ||
        process.env.NEXT_PUBLIC_PROPERTY_AI_TEST_WEBHOOK_URL ||
        "https://studio.adonixai.cloud/webhook/property-ai-agent";

      const rawPlans = project.floorPlans || (project as any).floor_plans || [];
      const parsedPlans = rawPlans.map((p: any, idx: number) => parseFloorPlan(p, idx));

      const payload = {
        session_id: sessionId,
        message: userMsg.text,
        language: language,
        is_lead_captured: leadCaptured,
        project: {
          id: project.id,
          name_en: project.nameEn,
          name_ar: project.nameAr,
          developer_en: project.developerEn,
          developer_ar: project.developerAr,
          city_en: project.cityEn,
          city_ar: project.cityAr,
          district_en: project.districtEn,
          district_ar: project.districtAr,
          starting_price_en: project.startingPriceEn,
          starting_price_ar: project.startingPriceAr,
          price_range_en: project.priceRangeEn,
          price_range_ar: project.priceRangeAr,
          status_en: project.statusEn,
          status_ar: project.statusAr,
          expected_delivery_en: project.expectedDeliveryEn,
          expected_delivery_ar: project.expectedDeliveryAr,
          payment_terms_en: project.paymentTermsEn,
          payment_terms_ar: project.paymentTermsAr,
          foreign_eligibility: (project as any).foreign_eligibility,
          foreign_eligibility_en: (project as any).foreign_eligibility_en,
          foreign_eligibility_ar: (project as any).foreign_eligibility_ar,
          custom_instructions: project.ai_agent_custom_instructions,
          floor_plans: parsedPlans.map((p: any) => ({
            model: p.modelEn || p.modelAr,
            category: p.categoryEn || p.categoryAr,
            areaSqm: p.areaEn || p.areaAr || "Available on request",
            bedrooms: p.bedrooms ? String(p.bedrooms) : "N/A",
            startingPrice: p.startingPriceEn || p.startingPriceAr || "Contact Sales",
            captionEn: p.captionEn || p.fullCaptionEn || "",
            captionAr: p.captionAr || p.fullCaptionAr || "",
            url: p.url || "",
          })),
          payment_milestones: project.paymentMilestones || (project as any).payment_milestones || [],
        },
      };

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Webhook returned status ${res.status}`);
      }

      const rawText = await res.text();
      let data: any = {};
      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = {};
      }

      const agentReply =
        data.reply ||
        (isAr
          ? `أهلاً بك! يسعدنا إفادتك بجميع تفاصيل مشروع ${projectName}. لأي استفسار مخصص يمكنك مراسلتنا مباشرة عبر buy@asaheebrealestate.com.`
          : `Welcome! We are delighted to assist you with ${projectName}. For direct inquiries or advisory support, please contact us at buy@asaheebrealestate.com.`);

      const agentMsg: ChatMessage = {
        id: `agent_${Date.now()}`,
        sender: "agent",
        text: agentReply,
        cards: data.cards || [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err: any) {
      console.warn("AI Agent webhook error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: "agent",
          text: isAr
            ? "نعتذر، حدث تأخير مؤقت في الاتصال. يمكنك مراسلة فريقنا مباشرة عبر البريد الإلكتروني: buy@asaheebrealestate.com وسيتم الرد عليك فوراً."
            : "Apologies, there was a temporary connection delay. For immediate assistance or official inquiries, please contact our team at: buy@asaheebrealestate.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBrochureLeadSubmit = async (customPhone?: string) => {
    const rawPhone = customPhone || phoneInput;
    if (!rawPhone.trim() || isSubmittingLead) return;

    const validation = validatePhoneNumber(rawPhone, selectedCountryCode);
    if (!validation.isValid) {
      setPhoneError(
        isAr
          ? validation.errorMessageAr || "يرجى إدخال رقم هاتف صحيح"
          : validation.errorMessageEn || "Please enter a valid phone number"
      );
      return;
    }

    setPhoneError(null);
    setIsSubmittingLead(true);

    try {
      // 1. Direct database insert via Next.js API for guaranteed Supabase recording
      fetch("/api/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Brochure Inquirer",
          phone: validation.formattedInternational || rawPhone,
          property_id: project.id,
          interest: `Brochure Download - ${project.nameEn || project.nameAr || project.id}`,
          source: "PROPERTY_AI_AGENT",
          notes: `Brochure unlocked via AI chat widget. Session: ${sessionId}`,
        }),
      }).catch((e) => console.warn("Direct lead insert failed (handled via webhook):", e));

      const webhookUrl =
        process.env.NEXT_PUBLIC_PROPERTY_AI_WEBHOOK_URL ||
        process.env.NEXT_PUBLIC_PROPERTY_AI_TEST_WEBHOOK_URL ||
        "https://studio.adonixai.cloud/webhook/property-ai-agent";

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          message: isAr
            ? `طلب استلام وتحميل الكتيب المعماري وجدول الأسعار (PDF): ${validation.formattedInternational}`
            : `Official brochure and pricing PDF download requested: ${validation.formattedInternational}`,
          language: language,
          lead_data: {
            phone: validation.formattedInternational || rawPhone,
            name: "Brochure Inquirer",
            property_id: project.id,
            preferred_unit: "Brochure Request",
            interest: `Brochure Download - ${project.nameAr || project.nameEn}`,
          },
          project: {
            id: project.id,
            name_en: project.nameEn,
            name_ar: project.nameAr,
          },
        }),
      });

      const confirmedPhone = validation.formattedInternational || rawPhone;
      localStorage.setItem("asaheeb_lead_phone", confirmedPhone);
      setLeadCaptured(true);
      setPhoneInput("");

      setMessages((prev) => [
        ...prev,
        {
          id: `lead_ack_${Date.now()}`,
          sender: "agent",
          text: isAr
            ? `شكراً لك! تم تفعيل إمكانية تحميل الكتيب المعماري والأسعار بصيغة PDF مباشرة. يمكنك النقر على زر التحميل أدناه.`
            : `Thank you! Access to the official brochure and pricing PDF has been unlocked. You can download the PDF below directly.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      console.error("Lead submission error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `lead_err_${Date.now()}`,
          sender: "agent",
          text: isAr
            ? "لطلب الكتيب المعماري أو رفع استفسار، يرجى مراسلتنا مباشرة عبر البريد الإلكتروني: buy@asaheebrealestate.com"
            : "To request the brochure or submit an inquiry directly, please email us at: buy@asaheebrealestate.com",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const copyProjectLink = (slugOrUrl: string) => {
    const fullUrl = slugOrUrl.startsWith("http")
      ? slugOrUrl
      : `${window.location.origin}${slugOrUrl.startsWith("/") ? "" : "/"}${slugOrUrl}`;

    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!project || !project.ai_agent_enabled) {
    return null;
  }

  const projectName = isAr ? project.nameAr || project.nameEn : project.nameEn || project.nameAr;
  const developerName = isAr ? project.developerAr || project.developerEn : project.developerEn || project.developerAr;

  return (
    <>
      {/* ─── FLOATING LUXURY TRIGGER BUTTON ──────────────────────────── */}
      {!isOpen && (
        <div className="fixed bottom-20 left-4 md:bottom-6 md:right-6 md:left-auto z-[360] flex items-center gap-3">
          {/* Mobile Icon Button (< md) - Positioned on left, perfectly separated from WhatsApp on right */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden relative flex items-center justify-center w-[54px] h-[54px] rounded-full bg-gradient-to-br from-[#0B132B] via-[#0E2038] to-[#070A0F] text-white shadow-[0_10px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(184,135,59,0.4)] border-2 border-[#B8873B] active:scale-95 transition-all duration-300"
            aria-label={isAr ? "اسأل مستشار المشروع" : "Ask Property Advisor"}
          >
            {/* Pulsing online indicator badge */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#10B981] border-2 border-[#0B132B]"></span>
            </span>

            {/* Concierge Icon & AI Micro-label */}
            <div className="flex flex-col items-center justify-center">
              <svg className="w-5 h-5 text-[#E6C687]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-[7.5px] font-mono font-black tracking-widest text-[#E6C687] uppercase leading-none mt-0.5">
                AI
              </span>
            </div>
          </button>

          {/* Desktop Pill Button (md and above) */}
          <button
            onClick={() => setIsOpen(true)}
            className="hidden md:flex group relative items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-[#0B132B] via-[#0E2038] to-[#0B132B] hover:from-[#111C3D] hover:to-[#111C3D] text-white rounded-full shadow-2xl border border-[#B8873B]/50 hover:border-[#D4AF37] transition-all duration-300 transform hover:scale-105"
            aria-label="Open Property AI Advisor"
          >
            {/* Glowing gold status dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8873B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span>
            </span>

            <div className="flex flex-col text-left">
              <span className="text-[12px] font-bold text-[#E6C687] tracking-wide flex items-center gap-1.5 font-sans">
                {isAr ? "اسأل مستشار المشروع" : "Ask Property Advisor"}
              </span>
              <span className="text-[10px] text-gray-300 opacity-90 truncate max-w-[140px]">
                {projectName}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* ─── LUXURY CHAT DRAWER / WINDOW ─────────────────────────────── */}
      {isOpen && (
        <div
          dir={isAr ? "rtl" : "ltr"}
          className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 z-[9999] w-full h-[100dvh] md:w-[420px] md:h-[640px] md:max-h-[90vh] bg-[#070A0F] md:bg-[#070A0F]/95 backdrop-blur-2xl border-0 md:border md:border-[#B8873B]/40 rounded-none md:rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-6"
        >
          {/* Header */}
          <div className="px-4 py-3.5 pt-[max(0.875rem,env(safe-area-inset-top))] bg-gradient-to-r from-[#0B132B] via-[#111D3B] to-[#0B132B] border-b border-[#B8873B]/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#B8873B]/20 border border-[#B8873B]/60 flex items-center justify-center text-[#D4AF37] shadow-inner shrink-0">
                <svg className="w-4 h-4 text-[#E6C687]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-wide truncate max-w-[180px] sm:max-w-[240px]">{projectName}</h3>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40 font-mono shrink-0">
                    {isAr ? "متصل" : "Online"}
                  </span>
                </div>
                <p className="text-[10px] text-gray-300 truncate">
                  {developerName ? `${developerName} · ` : ""}
                  {isAr ? "مستشار أصاهيب العقاري المعتمد" : "Asaheeb Real Estate Specialist"}
                </p>
              </div>
            </div>

            {/* Language switch & Close */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setLanguage(isAr ? "en" : "ar")}
                className="text-[10px] font-mono font-bold px-2 py-1.5 rounded border border-[#B8873B]/40 text-[#E6C687] hover:bg-[#B8873B]/10 transition-colors"
                title="Switch Language"
              >
                {isAr ? "English" : "عربي"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors text-base font-bold"
                aria-label="Close Chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-sm font-sans scrollbar-thin scrollbar-thumb-gray-800">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-md leading-relaxed text-[13px] ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-[#B8873B] to-[#996F2F] text-black font-medium rounded-br-none"
                      : "bg-[#111A2E]/90 border border-[#1F2D4A] text-gray-100 rounded-bl-none"
                  }`}
                >
                  {m.sender === "user" ? (
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  ) : (
                    renderFormattedMessage(
                      m.text,
                      m.cards?.some((c) => c.type === "PROJECT_SHARE")
                    )
                  )}

                  {/* ── CARD RENDERING ── */}
                  {m.cards && m.cards.length > 0 && (
                    <div className="mt-3 space-y-2.5">
                      {m.cards.map((c, idx) => {
                        // 1. GATED BROCHURE UNLOCK CARD (Instant in-chat download)
                        if (c.type === "BROCHURE_GATE") {
                          const brochureDownloadUrl =
                            project.brochureUrl ||
                            (project as any).brochure_url ||
                            (project as any).brochureUrlEn ||
                            (project as any).brochureUrlAr ||
                            "";

                          return (
                            <div
                              key={idx}
                              className="p-3.5 rounded-xl bg-gradient-to-br from-[#121E36] to-[#0A1020] border border-[#B8873B]/50 shadow-lg text-xs"
                            >
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-base">📑</span>
                                <h4 className="font-bold text-[#E6C687] text-xs">
                                  {c.title || (isAr ? "تحميل الكتيب المعماري والمخططات الرسمية" : "Download Official Architectural Brochure")}
                                </h4>
                              </div>
                              <p className="text-[11px] text-gray-300 mb-2.5 leading-normal">
                                {isAr
                                  ? "يرجى إدخال رقم هاتفك لفتح وتحميل ملف الكتيب المعماري وجدول الأسعار مباشرة بصيغة PDF:"
                                  : "Please provide your phone number to unlock and download the official architectural brochure and pricing PDF directly:"}
                              </p>

                              {!leadCaptured ? (
                                <div className="space-y-1.5">
                                  <div className="flex gap-1.5">
                                    <select
                                      value={selectedCountryCode}
                                      onChange={(e) => setSelectedCountryCode(e.target.value)}
                                      className="bg-[#070A0F] text-gray-200 border border-[#B8873B]/40 rounded-lg text-xs px-1.5 py-1.5 font-mono focus:outline-none"
                                    >
                                      {PRIORITY_COUNTRIES.slice(0, 6).map((item) => (
                                        <option key={item.code} value={item.code}>
                                          {item.flag} {item.dialCode}
                                        </option>
                                      ))}
                                    </select>
                                    <input
                                      type="tel"
                                      value={phoneInput}
                                      onChange={(e) => setPhoneInput(e.target.value)}
                                      placeholder={isAr ? "5X XXX XXXX" : "5X XXX XXXX"}
                                      className="flex-1 bg-[#070A0F] text-gray-100 border border-[#B8873B]/40 rounded-lg text-xs px-2.5 py-1.5 focus:border-[#D4AF37] focus:outline-none font-mono"
                                    />
                                    <button
                                      type="button"
                                      disabled={isSubmittingLead}
                                      onClick={() => handleBrochureLeadSubmit()}
                                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#B8873B] to-[#D4AF37] text-black font-bold text-xs hover:opacity-95 transition-opacity disabled:opacity-50 whitespace-nowrap"
                                    >
                                      {isSubmittingLead ? "..." : isAr ? "تحميل الكتيب" : "Unlock PDF"}
                                    </button>
                                  </div>
                                  {phoneError && <p className="text-[10px] text-red-400">{phoneError}</p>}
                                  {onOpenBrochureModal && (
                                    <button
                                      type="button"
                                      onClick={onOpenBrochureModal}
                                      className="w-full mt-1.5 py-1 text-[11px] text-[#E6C687] hover:underline flex items-center justify-center gap-1 opacity-90 cursor-pointer"
                                    >
                                      <span>📋</span>
                                      <span>{isAr ? "أو افتح نافذة التحميل الرسمية للمشروع" : "Or open official brochure form"}</span>
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div className="space-y-2 mt-1">
                                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40 text-[#34D399] text-xs">
                                    <span>✓</span>
                                    <span>{isAr ? "تم تسجيل بياناتك وتفعيل التحميل" : "Access unlocked successfully"}</span>
                                  </div>
                                  {brochureDownloadUrl ? (
                                    <a
                                      href={brochureDownloadUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      download
                                      className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#B8873B] to-[#D4AF37] text-black font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                                    >
                                      <span>📥</span>
                                      <span>{isAr ? "تحميل كتيب المشروع الآن (PDF)" : "Download Brochure PDF Now"}</span>
                                    </a>
                                  ) : (
                                    <p className="text-[10px] text-gray-300">
                                      {isAr
                                        ? "سيقوم مستشارنا بالتواصل معك وتزويدك بالكتيب المحدث مباشرة."
                                        : "Our advisor will reach out and provide the latest brochure."}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        }

                        // 2. PROJECT SHARE CARD
                        if (c.type === "PROJECT_SHARE") {
                          const projectPath = c.url || `/projects/${c.project_id || project.id}`;
                          const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${projectPath}` : `https://asaheeb.com${projectPath}`;

                          return (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-gradient-to-br from-[#121F38] to-[#0A1224] border border-[#B8873B]/40 shadow-lg text-xs"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-[#E6C687] text-xs">
                                  🔗 {c.title || projectName}
                                </span>
                                {c.starting_price && (
                                  <span className="text-[10px] text-[#34D399] font-mono">{c.starting_price}</span>
                                )}
                              </div>
                              <p className="text-[11px] text-gray-300 mb-2.5">
                                {isAr
                                  ? "يمكنك مشاركة واستعراض صفحة المشروع المباشرة على موقعنا:"
                                  : "View or share the live project page on our website:"}
                              </p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => copyProjectLink(projectPath)}
                                  className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#162544] hover:bg-[#1E325C] border border-[#B8873B]/40 text-[#E6C687] font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                                >
                                  <span>📋</span>
                                  <span>{copiedLink ? (isAr ? "تم النسخ ✓" : "Copied ✓") : (isAr ? "نسخ الرابط" : "Copy Link")}</span>
                                </button>
                                <a
                                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${projectName} - ${shareUrl}`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="py-1.5 px-3 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-[#25D366] font-medium text-xs flex items-center justify-center gap-1 transition-colors"
                                >
                                  <span>💬</span>
                                  <span>{isAr ? "واتساب" : "WhatsApp"}</span>
                                </a>
                              </div>
                            </div>
                          );
                        }

                        // 3. PROJECT RECOMMENDATION CARD (CROSS-SELLING ON OUR WEBSITE)
                        if (c.type === "PROJECT_RECOMMENDATION") {
                          const targetId = c.project_id || c.items?.[0]?.id || "";
                          const targetUrl = c.url || `/projects/${targetId}`;
                          const coverFallbackMap: Record<string, string> = {
                            "ewan-living": "https://res.cloudinary.com/diwqmlpr/image/upload/v1790844383/asaheeb/projects/Screenshot_2026-10-01_114228.png",
                            "al-rehab-m163-al-muhannad": "https://res.cloudinary.com/diwqmlpr/image/upload/v1792074019/asaheeb/projects/Screenshot_2026-10-15_172007.png",
                            "madinah-turath-al-salam": "https://res.cloudinary.com/diwqmlpr/image/upload/v1792599505/asaheeb/projects/Screenshot_2026-10-21_191759.png",
                            "turath-al-salam-madinah": "https://res.cloudinary.com/diwqmlpr/image/upload/v1792599505/asaheeb/projects/Screenshot_2026-10-21_191759.png",
                            "nesmah-obhur-193-al-ezz": "https://res.cloudinary.com/diwqmlpr/image/upload/v1792315182/asaheeb/projects/Nesmah_Obhur_facade_02.jpg",
                            "nesmah-obhur-2": "https://res.cloudinary.com/diwqmlpr/image/upload/v1792416288/asaheeb/projects/01_Nesmah_Obhur_2_Facade.jpg",
                            "living-palace-towers": "https://res.cloudinary.com/diwqmlpr/image/upload/v1790090319/asaheeb/projects/Screenshot_2026-09-22_181603.png",
                            "jeddah-rakaez-diyar-aloula": "https://res.cloudinary.com/diwqmlpr/image/upload/v1791993700/asaheeb/projects/Screenshot_2026-10-14_190115.png",
                            "rakaez": "https://res.cloudinary.com/diwqmlpr/image/upload/v1791993700/asaheeb/projects/Screenshot_2026-10-14_190115.png",
                            "al-shati-6-villa-730sqm": "https://res.cloudinary.com/diwqmlpr/image/upload/v1791727632/asaheeb/projects/WhatsApp_Image_2026-09-29_at_5.46.44_PM.jpg",
                            "suhail-compound": "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786507306/Suhail_1_mjbezd.webp",
                            "grand-sadana": "https://res.cloudinary.com/diwqmlpr/image/upload/v1789296769/asaheeb/projects/Screenshot_2026-09-13_004205.png",
                            "obhur-living": "https://res.cloudinary.com/diwqmlpr/image/upload/v1788784532/asaheeb/projects/Screenshot_2026-09-07_133206.png",
                            "hotel-complex-for-sale-in-medina-central-area": "https://res.cloudinary.com/diwqmlpr/image/upload/v1789999042/asaheeb/projects/Screenshot_2026-09-21_165144.png",
                          };

                          let cover = c.cover_image || "";
                          if (!cover || cover.includes("unsplash.com")) {
                            cover = coverFallbackMap[targetId] || cover;
                          }

                          return (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-gradient-to-br from-[#121F38] to-[#0A1224] border border-[#B8873B]/50 shadow-xl overflow-hidden text-xs"
                            >
                              {cover && (
                                <div className="relative w-full h-28 rounded-lg overflow-hidden mb-2.5 border border-gray-800">
                                  <Image
                                    src={cover}
                                    alt={c.title || "Project"}
                                    fill
                                    className="object-cover"
                                    sizes="350px"
                                  />
                                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] text-[#E6C687] font-mono border border-[#B8873B]/40">
                                    {c.city || "Jeddah"}
                                  </div>
                                </div>
                              )}

                              <div className="flex justify-between items-start mb-1.5">
                                <div>
                                  <h4 className="font-bold text-white text-xs">{c.title || c.project_id}</h4>
                                  {(c.district || c.city) && (
                                    <p className="text-[10px] text-gray-400">
                                      {[c.district, c.city].filter(Boolean).join(", ")}
                                    </p>
                                  )}
                                </div>
                                {c.starting_price && (
                                  <span className="text-[11px] font-mono font-bold text-[#34D399]">
                                    {c.starting_price}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => router.push(targetUrl)}
                                className="w-full mt-2 py-2 px-3 rounded-lg bg-gradient-to-r from-[#B8873B] to-[#D4AF37] text-black font-bold text-xs hover:opacity-90 flex items-center justify-center gap-1.5 transition-opacity"
                              >
                                <span>🏢</span>
                                <span>{isAr ? "استعراض تفاصيل المشروع" : "View Project Details"}</span>
                                <span>{isAr ? "←" : "→"}</span>
                              </button>
                            </div>
                          );
                        }

                        // 4. FLOOR PLAN CARDS
                        if (c.type === "FLOOR_PLAN") {
                          return (
                            <div
                              key={idx}
                              className="p-2.5 rounded-lg bg-black/40 border border-[#B8873B]/30 text-xs text-gray-200"
                            >
                              <p className="font-bold text-[#E6C687] mb-1.5 flex items-center gap-1">
                                <span>📐</span>
                                {c.title || (isAr ? "المخططات المتاحة" : "Available Layouts")}
                              </p>
                              {Array.isArray(c.items) &&
                                c.items.map((item: any, iIdx: number) => (
                                  <div
                                    key={iIdx}
                                    className="flex justify-between items-center py-1 border-b border-gray-800 last:border-none text-[11px]"
                                  >
                                    <span className="font-medium text-white">{item.model}</span>
                                    <span className="text-gray-400 font-mono">{item.areaSqm} م²</span>
                                    <span className="text-[#34D399] font-mono">{item.startingPrice}</span>
                                  </div>
                                ))}
                            </div>
                          );
                        }

                        // 5. PAYMENT MILESTONES CARD
                        if (c.type === "PAYMENT_MILESTONES") {
                          return (
                            <div
                              key={idx}
                              className="p-2.5 rounded-lg bg-black/40 border border-[#B8873B]/30 text-xs text-gray-200"
                            >
                              <p className="font-bold text-[#E6C687] mb-1.5 flex items-center gap-1">
                                <span>💳</span>
                                {c.title || (isAr ? "جدول الدفعات والأقساط" : "Payment Schedule")}
                              </p>
                              {Array.isArray(c.items) &&
                                c.items.map((item: any, iIdx: number) => (
                                  <div
                                    key={iIdx}
                                    className="flex justify-between items-center py-1 border-b border-gray-800 last:border-none text-[11px]"
                                  >
                                    <span className="text-white">
                                      {item.stageNumber ? `${item.stageNumber}. ` : ""}
                                      {isAr ? item.titleAr || item.titleEn : item.titleEn || item.titleAr}
                                    </span>
                                    <span className="text-[#E6C687] font-mono font-bold">
                                      {item.percentage}%
                                    </span>
                                  </div>
                                ))}
                            </div>
                          );
                        }

                        return null;
                      })}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-gray-500 mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-1.5 text-gray-400 text-xs px-2 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B] animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] text-gray-400 mr-1 font-mono">
                  {isAr ? "المستشار يكتب..." : "Advisor is typing..."}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-[#0A0F1D]/80 border-t border-[#1F2D4A] flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                disabled={isLoading}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] rounded-full bg-[#162238] hover:bg-[#1E2E4B] text-[#E6C687] border border-[#B8873B]/30 transition-all font-sans"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#0B132B] border-t border-[#1F2D4A] flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={isAr ? "اطرح أي سؤال حول المشروع..." : "Ask any question about this property..."}
              className="flex-1 bg-[#070A0F] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#B8873B] transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#B8873B] to-[#D4AF37] text-black flex items-center justify-center font-bold text-base hover:opacity-90 disabled:opacity-40 transition-opacity shrink-0"
              aria-label="Send Message"
            >
              {isAr ? "←" : "→"}
            </button>
          </div>

          {/* Legal Footer */}
          <div className="py-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] bg-[#05070B] text-center text-[9px] text-gray-500 font-mono shrink-0">
            {isAr
              ? "أصاهيب العقارية · رخصة فال 1200000000 · وافي معتمد"
              : "Asaheeb Real Estate · Fal Licensed · Wafi Certified"}
          </div>
        </div>
      )}
    </>
  );
}
