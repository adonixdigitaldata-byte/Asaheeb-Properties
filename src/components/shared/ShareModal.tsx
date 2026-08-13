"use client";

import { useState, useEffect } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  url: string;
  isAr: boolean;
  type?: "property" | "article";
}

export default function ShareModal({
  isOpen,
  onClose,
  title,
  text,
  url,
  isAr,
  type = "property",
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator.share === "function") {
      setCanNativeShare(true);
    }
  }, []);

  // Reset copied state when modal closes
  useEffect(() => {
    if (!isOpen) setCopied(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${text} - ${title}`);

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text}: ${url}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
      onClose();
    } catch (err) {
      console.error("Native share cancelled or failed:", err);
    }
  };

  const isArticle = type === "article";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div
        className="relative w-full max-w-lg p-6 sm:p-8 bg-[#12130F] border border-[#B8873B]/40 rounded-sm shadow-[0_0_50px_rgba(184,135,59,0.15)] space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-start justify-between gap-4 border-b border-white/10 pb-4 ${isAr ? "flex-row-reverse" : ""}`}>
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#B8873B] block mb-1">
              {isAr
                ? isArticle
                  ? "مشاركة المقال"
                  : "مشاركة العقار"
                : isArticle
                ? "Share Article"
                : "Share Property"}
            </span>
            <h3 className="font-display text-xl sm:text-2xl text-[#E8DFCE] font-normal leading-tight">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-white/10 text-[#C5BCAD] hover:border-[#B8873B] hover:text-[#B8873B] transition-colors rounded-sm cursor-pointer"
            aria-label={isAr ? "إغلاق النافذة" : "Close Share Modal"}
          >
            ✕
          </button>
        </div>

        {/* Native Share Option (Mobile / Supported Browsers) */}
        {canNativeShare && (
          <button
            onClick={handleNativeShare}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold border border-[#B8873B] bg-[#B8873B]/10 text-[#B8873B] hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 rounded-sm cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{isAr ? "مشاركة عبر خيارات الجهاز" : "Share via Device Apps"}</span>
          </button>
        )}

        {/* Quick Share Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 border border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/20 transition-all rounded-sm group text-center"
          >
            <span className="text-xl mb-1">💬</span>
            <span className="font-mono text-[9px] tracking-wider text-[#25D366] uppercase font-semibold">WhatsApp</span>
          </a>

          {/* X / Twitter */}
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 border border-white/20 bg-white/5 hover:bg-white/15 transition-all rounded-sm group text-center"
          >
            <span className="text-xl mb-1">𝕏</span>
            <span className="font-mono text-[9px] tracking-wider text-[#E8DFCE] uppercase font-semibold">X / Twitter</span>
          </a>

          {/* LinkedIn */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 border border-[#0A66C2]/30 bg-[#0A66C2]/5 hover:bg-[#0A66C2]/20 transition-all rounded-sm group text-center"
          >
            <span className="text-xl mb-1">💼</span>
            <span className="font-mono text-[9px] tracking-wider text-[#0A66C2] uppercase font-semibold">LinkedIn</span>
          </a>

          {/* Telegram */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 border border-[#229ED9]/30 bg-[#229ED9]/5 hover:bg-[#229ED9]/20 transition-all rounded-sm group text-center"
          >
            <span className="text-xl mb-1">✈️</span>
            <span className="font-mono text-[9px] tracking-wider text-[#229ED9] uppercase font-semibold">Telegram</span>
          </a>
        </div>

        {/* Copy Link Section */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#8C8477] block">
            {isAr
              ? isArticle
                ? "رابط المقال المباشر"
                : "رابط العقار المباشر"
              : isArticle
              ? "Direct Article Link"
              : "Direct Property Link"}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 bg-black/40 border border-white/10 px-3.5 py-2.5 font-mono text-xs text-[#E8DFCE] focus:outline-none rounded-sm select-all"
            />
            <button
              onClick={handleCopy}
              className={`px-5 py-2.5 font-mono text-[10px] tracking-[0.18em] uppercase font-bold border transition-all duration-300 rounded-sm whitespace-nowrap cursor-pointer ${
                copied
                  ? "border-[#25D366] bg-[#25D366] text-[#12130F]"
                  : "border-[#B8873B] text-[#B8873B] hover:bg-[#B8873B] hover:text-[#12130F]"
              }`}
            >
              {copied ? (isAr ? "✓ تم النسخ" : "✓ Copied!") : (isAr ? "نسخ الرابط" : "Copy Link")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
