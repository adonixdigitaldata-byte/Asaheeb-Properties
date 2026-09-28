"use client";

import { useRef } from "react";
import { BANKS } from "./constants";

interface BankSelectorProps {
  selectedSlug: string;
  onSelect: (slug: string) => void;
  isRTL?: boolean;
}

export default function BankSelector({
  selectedSlug,
  onSelect,
  isRTL = false,
}: BankSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeftRef.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = (x - startXRef.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-full min-w-0">
      <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8873B] font-semibold">
          {isRTL ? "اختر البنك" : "Select Bank"}
        </p>
        <span className="text-[10px] font-mono text-[#8C8477]">
          {isRTL ? "١٠ بنوك سعودية معتمدة" : "10 Approved Saudi Banks"}
        </span>
      </div>

      <div className="relative group/banks w-full max-w-full min-w-0 overflow-hidden">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full border border-[rgba(184,135,59,0.3)] bg-[#12130F] text-[#B8873B] hover:bg-[#B8873B] hover:text-[#12130F] flex items-center justify-center transition-all duration-200 shadow-md opacity-0 group-hover/banks:opacity-100 hidden sm:flex"
          aria-label="Scroll left"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide select-none px-1"
          style={{ cursor: "grab", scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {BANKS.map((bank) => {
            const active = bank.slug === selectedSlug;
            const name = isRTL ? bank.nameAr : bank.nameEn;
            return (
              <button
                key={bank.slug}
                type="button"
                onClick={() => {
                  if (
                    !isDraggingRef.current ||
                    Math.abs((scrollRef.current?.scrollLeft ?? 0) - scrollLeftRef.current) < 5
                  ) {
                    onSelect(bank.slug);
                  }
                }}
                className={`shrink-0 px-4 py-2.5 rounded-sm border text-xs font-mono font-bold tracking-wide uppercase transition-all duration-200 whitespace-nowrap focus:outline-none cursor-pointer ${
                  active
                    ? "text-[#12130F] font-semibold shadow-[0_0_12px_rgba(184,135,59,0.35)]"
                    : "text-[#C5BCAD] hover:text-[#E8DFCE] hover:border-[rgba(184,135,59,0.4)]"
                }`}
                style={
                  active
                    ? { borderColor: "#B8873B", backgroundColor: "#B8873B" }
                    : { borderColor: "rgba(184,135,59,0.2)", backgroundColor: "rgba(18,19,15,0.5)" }
                }
                aria-pressed={active}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full border border-[rgba(184,135,59,0.3)] bg-[#12130F] text-[#B8873B] hover:bg-[#B8873B] hover:text-[#12130F] flex items-center justify-center transition-all duration-200 shadow-md opacity-0 group-hover/banks:opacity-100 hidden sm:flex"
          aria-label="Scroll right"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
