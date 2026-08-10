"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

const TOTAL_FRAMES = 80;
const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.webp`;

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  const aspectCanvas = cw / ch;
  const aspectImage = iw / ih;

  let sx = 0, sy = 0, sw = iw, sh = ih;
  if (aspectImage > aspectCanvas) {
    sw = ih * aspectCanvas;
    sx = (iw - sw) / 2;
  } else {
    sh = iw / aspectCanvas;
    sy = (ih - sh) / 2;
  }

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

export default function HeroDesktop() {
  const { t, toggleLanguage } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pastRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const frameDataRef = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);

  // ── Helper to draw a frame to the canvas ─────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Find requested frame or closest loaded fallback frame
    let targetImg = frameDataRef.current[index];
    if (!targetImg || !targetImg.complete || targetImg.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = frameDataRef.current[Math.max(0, index - offset)];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          targetImg = prev;
          break;
        }
        const next = frameDataRef.current[Math.min(TOTAL_FRAMES - 1, index + offset)];
        if (next && next.complete && next.naturalWidth > 0) {
          targetImg = next;
          break;
        }
      }
    }

    if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        drawCoverImage(ctx, targetImg, canvas.width, canvas.height);
      }
    }
  }, []);

  // ── Frame update function for scroll trigger ──────────────────────────────
  const updateFrame = useCallback((index: number) => {
    if (currentFrame.current === index) return;
    currentFrame.current = index;
    drawFrame(index);
  }, [drawFrame]);

  // ─── Preload all frames into memory ───────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i + 1);
      
      // Request decode in background to cache in GPU
      if (typeof img.decode === "function") {
        img.decode().catch((err) => {
          console.warn(`Failed decoding frame ${i + 1}`, err);
        });
      }
      
      img.onload = () => {
        if (i === 0) {
          setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
          }, 50);
        }
      };
      images[i] = img;
    }
    frameDataRef.current = images;
  }, []);

  // ─── Handle Canvas Resize & High-DPI scaling ─────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      drawFrame(currentFrame.current);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [drawFrame]);

  // ─── GSAP ScrollTrigger setup ───────────────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const proxy = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.15, // Low scrub damping for instant, responsive scroll sync
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // "The past" — visible immediately on mount (1), stays until 20%, fades out by 32%
          const pastOpacity = p < 0.20
            ? 1
            : p < 0.32
              ? 1 - (p - 0.20) / 0.12
              : 0;

          // "Today" — fades in 45%→55%, stays until 75%, fades out by 84%
          const todayOpacity = p < 0.45
            ? 0
            : p < 0.55
              ? (p - 0.45) / 0.10
              : p < 0.75
                ? 1
                : p < 0.84
                  ? 1 - (p - 0.75) / 0.09
                  : 0;

          // Tagline — fades in 84%→92% and stays visible
          const taglineOpacity = p < 0.84
            ? 0
            : Math.min(1, (p - 0.84) / 0.08);

          if (pastRef.current) pastRef.current.style.opacity = String(pastOpacity);
          if (todayRef.current) todayRef.current.style.opacity = String(todayOpacity);
          if (taglineRef.current) taglineRef.current.style.opacity = String(taglineOpacity);
        },
      },
    });

    tl.to(proxy, {
      frame: TOTAL_FRAMES - 1,
      ease: "none", // Removed snap to prevent timeline scroll fighting
      onUpdate: () => {
        updateFrame(Math.round(proxy.frame));
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [updateFrame]);

  return (
    <section
      ref={sectionRef}
      className="hero-desktop relative w-full h-screen overflow-hidden bg-ink"
      aria-label="Hero — Saudi Arabia transformation"
    >
      {/* ── Video Fallback (Ensures crisp visuals even before all frames load) ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none z-0"
        src="/hero-desktop.mp4"
      />

      {/* ── High-DPI Canvas Display ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1]"
        style={{
          display: "block",
          imageRendering: "auto",
        }}
      />

      {/* ── Cinematic gradient vignette ── */}
      <div className="hero-vignette absolute inset-0 pointer-events-none" />

      {/* ── Text 1: "WHY INVEST IN SAUDI ARABIA?" (Section 2 Main Title) ── */}
      <div
        ref={pastRef}
        className="hero-overlay-text absolute bottom-[26%] left-1/2 -translate-x-1/2 text-center pointer-events-none w-full px-4 max-w-4xl"
        style={{ opacity: 1, willChange: "opacity" }}
      >
        <p
          className="font-display text-[#FFFFFF] text-3xl md:text-5xl lg:text-6xl tracking-[0.12em] uppercase font-bold"
          style={{
            textShadow: "0 4px 30px #000000, 0 0 50px #000000, 0 0 25px rgba(184,135,59,0.9)"
          }}
        >
          {t.whyInvestTitle}
        </p>

        {/* Catchy Subtitle without any background color */}
        <p
          className="font-sans text-[#E8DFCE] text-base md:text-xl tracking-[0.05em] font-medium mt-3 max-w-2xl mx-auto"
          style={{
            textShadow: "0 4px 20px #000000, 0 0 30px #000000"
          }}
        >
          {t.whyInvestSub}
        </p>

        <div className="w-px h-10 bg-[#B8873B] mx-auto mt-5 shadow-[0_0_12px_#B8873B]" />
        
        <div className="mt-3 inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-ping" />
          <span
            className="font-mono text-[#E8DFCE] text-xs md:text-sm tracking-[0.3em] uppercase font-bold"
            style={{
              textShadow: "0 2px 10px #000000"
            }}
          >
            {t.scrollExplore}
          </span>
        </div>
      </div>

      {/* ── Text 2: "SAUDI ARABIA. TODAY." ── */}
      <div
        ref={todayRef}
        className="hero-overlay-text absolute bottom-[28%] left-1/2 -translate-x-1/2 text-center pointer-events-none w-full px-4 max-w-3xl"
        style={{ opacity: 0, willChange: "opacity" }}
      >
        <p
          className="font-display text-[#FFFFFF] text-3xl md:text-5xl lg:text-6xl tracking-[0.18em] uppercase font-bold"
          style={{
            textShadow: "0 4px 30px #000000, 0 0 50px #000000"
          }}
        >
          {t.heroPastTitle}
        </p>
        <p
          className="font-display text-[#B8873B] text-2xl md:text-4xl lg:text-5xl tracking-[0.2em] uppercase font-bold mt-2"
          style={{
            textShadow: "0 0 35px rgba(184,135,59,0.95), 0 4px 20px #000000"
          }}
        >
          {t.heroPastSub}
        </p>
      </div>

      {/* ── Text 3: Tagline ── */}
      <div
        ref={taglineRef}
        className="hero-overlay-tagline absolute bottom-[20%] left-1/2 -translate-x-1/2 text-center pointer-events-none w-full px-6 max-w-4xl"
        style={{ opacity: 0, willChange: "opacity" }}
      >
        <p
          className="font-display text-[#FFFFFF] text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight"
          style={{
            textShadow: "0 4px 30px #000000, 0 0 50px #000000"
          }}
        >
          {t.heroTagline}
          <br />
          <span
            className="text-[#B8873B] inline-block mt-2 font-bold"
            style={{
              textShadow: "0 0 35px rgba(184,135,59,0.95), 0 4px 20px #000000"
            }}
          >
            {t.heroTaglineSub}
          </span>
        </p>
        <div className="w-px h-10 bg-[#B8873B] mx-auto mt-6 opacity-90 shadow-[0_0_12px_#B8873B]" />
        <p
          className="font-mono text-[#E8DFCE] text-xs tracking-[0.25em] uppercase mt-3 font-semibold"
          style={{ textShadow: "0 2px 10px #000000" }}
        >
          {t.scrollExplore}
        </p>
        <div className="mt-2 mx-auto w-5 h-5 border-r-2 border-b-2 border-[#B8873B] rotate-45 animate-bounce" />
      </div>
    </section>
  );
}
