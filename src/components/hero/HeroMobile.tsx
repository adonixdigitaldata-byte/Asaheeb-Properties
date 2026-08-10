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

export default function HeroMobile() {
  const { t, toggleLanguage } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pastRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  const frameDataRef = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);

  // Helper to draw frame
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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
        ctx.imageSmoothingQuality = "medium";
        drawCoverImage(ctx, targetImg, canvas.width, canvas.height);
      }
    }
  }, []);

  const updateFrame = useCallback((index: number) => {
    if (currentFrame.current === index) return;
    currentFrame.current = index;
    drawFrame(index);
  }, [drawFrame]);

  // Preload frame images
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i + 1);

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

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

  // GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const proxy = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: 0.1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;

          const pastOpacity = p < 0.20
            ? 1
            : p < 0.32
              ? 1 - (p - 0.20) / 0.12
              : 0;

          const todayOpacity = p < 0.45
            ? 0
            : p < 0.55
              ? (p - 0.45) / 0.10
              : p < 0.75
                ? 1
                : p < 0.84
                  ? 1 - (p - 0.75) / 0.09
                  : 0;

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
      ease: "none",
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
      className="hero-mobile relative w-full h-screen overflow-hidden bg-ink"
      aria-label="Hero — Saudi Arabia transformation"
    >
      {/* Video Fallback */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none z-0"
        src="/hero-mobile.mp4"
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1]"
        style={{ display: "block" }}
      />

      {/* Mobile Vignette */}
      <div className="hero-vignette absolute inset-0 pointer-events-none" />

      {/* Text 1: "WHY INVEST IN SAUDI ARABIA?" (Section 2 Main Title) */}
      <div
        ref={pastRef}
        className="hero-overlay-text absolute bottom-[24%] left-1/2 -translate-x-1/2 text-center pointer-events-none w-full px-4"
        style={{ opacity: 1, willChange: "opacity" }}
      >
        <p
          className="font-display text-[#FFFFFF] text-xl sm:text-3xl tracking-[0.1em] uppercase font-bold"
          style={{ textShadow: "0 4px 25px #000000, 0 0 35px #000000, 0 0 20px rgba(184,135,59,0.9)" }}
        >
          {t.whyInvestTitle}
        </p>

        <p
          className="font-sans text-[#E8DFCE] text-xs sm:text-base tracking-[0.04em] font-medium mt-2 max-w-xs mx-auto"
          style={{ textShadow: "0 4px 16px #000000, 0 0 25px #000000" }}
        >
          {t.whyInvestSub}
        </p>

        <div className="w-px h-8 bg-[#B8873B] mx-auto mt-4 shadow-[0_0_10px_#B8873B]" />
        
        <div className="mt-2 inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B] animate-ping" />
          <span
            className="font-mono text-[#E8DFCE] text-[10px] tracking-[0.24em] uppercase font-bold"
            style={{ textShadow: "0 2px 10px #000000" }}
          >
            {t.scrollExplore}
          </span>
        </div>
      </div>

      {/* Text 2: Today */}
      <div
        ref={todayRef}
        className="hero-overlay-text absolute bottom-[26%] left-1/2 -translate-x-1/2 text-center pointer-events-none w-full px-4"
        style={{ opacity: 0, willChange: "opacity" }}
      >
        <p
          className="font-display text-[#FFFFFF] text-2xl sm:text-4xl tracking-[0.15em] uppercase font-bold"
          style={{ textShadow: "0 4px 25px #000000, 0 0 35px #000000" }}
        >
          {t.heroPastTitle}
        </p>
        <p
          className="font-display text-[#B8873B] text-xl sm:text-3xl tracking-[0.18em] uppercase font-bold mt-2"
          style={{ textShadow: "0 0 30px rgba(184,135,59,0.95), 0 4px 20px #000000" }}
        >
          {t.heroPastSub}
        </p>
      </div>

      {/* Text 3: Tagline */}
      <div
        ref={taglineRef}
        className="hero-overlay-tagline absolute bottom-[18%] left-1/2 -translate-x-1/2 text-center pointer-events-none w-full px-5"
        style={{ opacity: 0, willChange: "opacity" }}
      >
        <p
          className="font-display text-[#FFFFFF] text-lg sm:text-2xl font-semibold leading-snug"
          style={{ textShadow: "0 4px 25px #000000, 0 0 35px #000000" }}
        >
          {t.heroTagline}
          <br />
          <span
            className="text-[#B8873B] block mt-1 font-bold"
            style={{ textShadow: "0 0 30px rgba(184,135,59,0.95), 0 4px 20px #000000" }}
          >
            {t.heroTaglineSub}
          </span>
        </p>
        <div className="w-px h-8 bg-[#B8873B] mx-auto mt-4 opacity-90 shadow-[0_0_8px_#B8873B]" />
        <p
          className="font-mono text-[#E8DFCE] text-[10px] tracking-[0.2em] uppercase mt-2 font-semibold"
          style={{ textShadow: "0 2px 10px #000000" }}
        >
          {t.scrollExplore}
        </p>
        <div className="mt-2 mx-auto w-4 h-4 border-r-2 border-b-2 border-[#B8873B] rotate-45 animate-bounce" />
      </div>
    </section>
  );
}
