"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ZoomableLightboxStageProps {
  src: string;
  alt: string;
  priority?: boolean;
  scale: number;
  onScaleChange: (newScale: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
  isAr?: boolean;
  stageClassName?: string;
  imageClassName?: string;
  bgWhite?: boolean;
}

export function ZoomableLightboxStage({
  src,
  alt,
  priority = false,
  scale: externalScale,
  onScaleChange,
  onNext,
  onPrev,
  isAr = false,
  stageClassName = "",
  imageClassName = "object-contain",
  bgWhite = false,
}: ZoomableLightboxStageProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Current visual scale & pan offsets
  const [currentScale, setCurrentScale] = useState<number>(externalScale || 1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // Sync with external scale changes (e.g. from 2x / 1x button clicks in parent)
  useEffect(() => {
    setCurrentScale(externalScale);
    if (externalScale <= 1.05) {
      setPan({ x: 0, y: 0 });
    }
  }, [externalScale, src]);

  // Keep refs for event listeners
  const scaleRef = useRef<number>(currentScale);
  scaleRef.current = currentScale;

  const panRef = useRef<{ x: number; y: number }>(pan);
  panRef.current = pan;

  // Touch gesture state refs
  const pinchStartDistRef = useRef<number>(0);
  const pinchStartScaleRef = useRef<number>(1);
  const isPinchingRef = useRef<boolean>(false);

  const isDraggingRef = useRef<boolean>(false);
  const dragStartTouchRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const touchStartTimeRef = useRef<number>(0);
  const swipeStartXRef = useRef<number | null>(null);
  const swipeStartYRef = useRef<number | null>(null);
  const lastTapTimeRef = useRef<number>(0);

  // Desktop Mouse Drag state
  const isMouseDownRef = useRef<boolean>(false);
  const mouseStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseStartPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Calculate allowable pan bounds based on container size and scale
  const getPanBounds = useCallback((scaleVal: number) => {
    const stage = stageRef.current;
    if (!stage || scaleVal <= 1) {
      return { boundX: 0, boundY: 0 };
    }
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    // Extra margin so edges can comfortably clear the borders
    const boundX = Math.max((w * (scaleVal - 1)) / 2 + 40, 20);
    const boundY = Math.max((h * (scaleVal - 1)) / 2 + 40, 20);
    return { boundX, boundY };
  }, []);

  // Update scale helper
  const updateScale = useCallback(
    (newScale: number) => {
      const clamped = Math.min(Math.max(newScale, 1), 4);
      setCurrentScale(clamped);
      scaleRef.current = clamped;
      onScaleChange(clamped);
      if (clamped <= 1.05) {
        setPan({ x: 0, y: 0 });
        panRef.current = { x: 0, y: 0 };
      }
    },
    [onScaleChange]
  );

  // Native non-passive touch event listener bindings for rock-solid iOS/Android gesture control
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.stopPropagation();

      if (e.touches.length === 2) {
        // Two fingers -> Pinch Zoom
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        pinchStartDistRef.current = dist;
        pinchStartScaleRef.current = scaleRef.current;
        isPinchingRef.current = true;
        isDraggingRef.current = false;
        swipeStartXRef.current = null;
        setIsInteracting(true);
      } else if (e.touches.length === 1) {
        const t = e.touches[0];
        touchStartTimeRef.current = Date.now();
        swipeStartXRef.current = t.clientX;
        swipeStartYRef.current = t.clientY;

        if (scaleRef.current > 1.05) {
          // One finger drag when zoomed in
          isDraggingRef.current = true;
          isPinchingRef.current = false;
          dragStartTouchRef.current = { x: t.clientX, y: t.clientY };
          dragStartPanRef.current = { ...panRef.current };
          setIsInteracting(true);
        } else {
          isDraggingRef.current = false;
          isPinchingRef.current = false;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.stopPropagation();

      if (e.touches.length === 2 && isPinchingRef.current) {
        // Pinch zoom in progress
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        if (pinchStartDistRef.current > 0) {
          const factor = dist / pinchStartDistRef.current;
          const nextScale = Math.min(Math.max(pinchStartScaleRef.current * factor, 1), 4);
          setCurrentScale(nextScale);
          scaleRef.current = nextScale;
          onScaleChange(nextScale);

          // If zooming out close to 1, gracefully pull pan back towards center
          if (nextScale <= 1.1) {
            setPan({ x: 0, y: 0 });
            panRef.current = { x: 0, y: 0 };
          }
        }
      } else if (e.touches.length === 1 && isDraggingRef.current && scaleRef.current > 1.05) {
        // Panning across the zoomed image
        e.preventDefault();
        const t = e.touches[0];
        const dx = t.clientX - dragStartTouchRef.current.x;
        const dy = t.clientY - dragStartTouchRef.current.y;

        const { boundX, boundY } = getPanBounds(scaleRef.current);
        // Allow slight elastic overdrag during active drag
        const maxOverX = boundX + 60;
        const maxOverY = boundY + 60;

        const newX = Math.min(Math.max(dragStartPanRef.current.x + dx, -maxOverX), maxOverX);
        const newY = Math.min(Math.max(dragStartPanRef.current.y + dy, -maxOverY), maxOverY);

        setPan({ x: newX, y: newY });
        panRef.current = { x: newX, y: newY };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.stopPropagation();
      setIsInteracting(false);

      if (isPinchingRef.current) {
        isPinchingRef.current = false;
        if (scaleRef.current < 1.08) {
          updateScale(1);
          setPan({ x: 0, y: 0 });
          panRef.current = { x: 0, y: 0 };
        } else {
          // Re-clamp pan within bounds
          const { boundX, boundY } = getPanBounds(scaleRef.current);
          setPan((prev) => ({
            x: Math.min(Math.max(prev.x, -boundX), boundX),
            y: Math.min(Math.max(prev.y, -boundY), boundY),
          }));
        }
      }

      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        // Snap back inside strict bounds on release
        const { boundX, boundY } = getPanBounds(scaleRef.current);
        setPan((prev) => ({
          x: Math.min(Math.max(prev.x, -boundX), boundX),
          y: Math.min(Math.max(prev.y, -boundY), boundY),
        }));
      }

      // Handle Double-Tap (zoom toggle) or Swipe to Next/Prev (when scale is 1)
      if (scaleRef.current <= 1.05 && swipeStartXRef.current !== null && e.changedTouches.length > 0) {
        const t = e.changedTouches[0];
        const deltaX = swipeStartXRef.current - t.clientX;
        const deltaY = (swipeStartYRef.current || 0) - t.clientY;
        const duration = Date.now() - touchStartTimeRef.current;

        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
          // Horizontal swipe between images
          if (deltaX > 0) {
            if (isAr) onPrev?.();
            else onNext?.();
          } else {
            if (isAr) onNext?.();
            else onPrev?.();
          }
        } else if (Math.abs(deltaX) < 18 && Math.abs(deltaY) < 18 && duration < 320) {
          // Single or double tap check
          const now = Date.now();
          if (now - lastTapTimeRef.current < 350) {
            // Double tap detected: toggle 1x <-> 2.5x!
            const target = scaleRef.current > 1.2 ? 1 : 2.5;
            updateScale(target);
            setPan({ x: 0, y: 0 });
            lastTapTimeRef.current = 0;
          } else {
            lastTapTimeRef.current = now;
          }
        }
      } else if (scaleRef.current > 1.05 && e.changedTouches.length > 0) {
        // Double tap while zoomed in to quickly reset to 1x
        const t = e.changedTouches[0];
        const deltaX = (swipeStartXRef.current || 0) - t.clientX;
        const deltaY = (swipeStartYRef.current || 0) - t.clientY;
        const duration = Date.now() - touchStartTimeRef.current;
        if (Math.abs(deltaX) < 18 && Math.abs(deltaY) < 18 && duration < 320) {
          const now = Date.now();
          if (now - lastTapTimeRef.current < 350) {
            updateScale(1);
            setPan({ x: 0, y: 0 });
            lastTapTimeRef.current = 0;
          } else {
            lastTapTimeRef.current = now;
          }
        }
      }

      swipeStartXRef.current = null;
      swipeStartYRef.current = null;
    };

    stage.addEventListener("touchstart", handleTouchStart, { passive: false });
    stage.addEventListener("touchmove", handleTouchMove, { passive: false });
    stage.addEventListener("touchend", handleTouchEnd, { passive: false });
    stage.addEventListener("touchcancel", handleTouchEnd, { passive: false });

    return () => {
      stage.removeEventListener("touchstart", handleTouchStart);
      stage.removeEventListener("touchmove", handleTouchMove);
      stage.removeEventListener("touchend", handleTouchEnd);
      stage.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [getPanBounds, updateScale, isAr, onNext, onPrev, onScaleChange]);

  // Desktop Mouse Events for pan & double-click
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scaleRef.current > 1.05) {
      isMouseDownRef.current = true;
      mouseStartRef.current = { x: e.clientX, y: e.clientY };
      mouseStartPanRef.current = { ...panRef.current };
      setIsInteracting(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDownRef.current && scaleRef.current > 1.05) {
      e.preventDefault();
      const dx = e.clientX - mouseStartRef.current.x;
      const dy = e.clientY - mouseStartRef.current.y;
      const { boundX, boundY } = getPanBounds(scaleRef.current);
      const newX = Math.min(Math.max(mouseStartPanRef.current.x + dx, -boundX), boundX);
      const newY = Math.min(Math.max(mouseStartPanRef.current.y + dy, -boundY), boundY);
      setPan({ x: newX, y: newY });
      panRef.current = { x: newX, y: newY };
    }
  };

  const handleMouseUp = () => {
    if (isMouseDownRef.current) {
      isMouseDownRef.current = false;
      setIsInteracting(false);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const target = scaleRef.current > 1.2 ? 1 : 2.5;
    updateScale(target);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      ref={stageRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      className={`relative z-10 w-full flex items-center justify-center overflow-hidden select-none ${
        bgWhite ? "bg-white rounded-xs shadow-2xl border border-white/20 p-3 sm:p-4" : ""
      } ${stageClassName}`}
      style={{
        touchAction: "none",
        cursor: currentScale > 1 ? (isInteracting ? "grabbing" : "grab") : "zoom-in",
      }}
    >
      <div
        className="relative w-full h-full flex items-center justify-center will-change-transform"
        style={{
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${currentScale})`,
          transition: isInteracting ? "none" : "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          transformOrigin: "center center",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={imageClassName}
          sizes="(max-width: 1024px) 100vw, 1400px"
          priority={priority}
          draggable={false}
        />
      </div>

      {/* Mobile touch hint when at 1x */}
      {currentScale <= 1.05 && (
        <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none sm:hidden">
          <span className="font-mono text-[8.5px] tracking-wider uppercase bg-black/80 backdrop-blur-xs text-[#E2B768] px-3 py-1 rounded-full border border-[#B8873B]/50 shadow-md">
            {isAr ? "استخدم إصبعين أو انقر مرتين للتكبير والتحريك" : "Pinch with fingers or double-tap to zoom"}
          </span>
        </div>
      )}

      {/* Floating Active Zoom Controls & Drag Indicator when zoomed in */}
      {currentScale > 1.05 && (
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2 pointer-events-auto">
          <span className="font-mono text-[9px] tracking-wider uppercase bg-black/85 backdrop-blur-xs text-[#FAF6EE] px-3 py-1 rounded-full border border-[#B8873B]/60 shadow-lg flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B] animate-pulse" />
            <span>
              {isAr
                ? `${currentScale.toFixed(1)}x · حرّك بإصبعك لتصفح كل زاوية`
                : `${currentScale.toFixed(1)}x · Drag with finger to view all parts`}
            </span>
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              updateScale(1);
              setPan({ x: 0, y: 0 });
            }}
            className="px-2.5 py-1 bg-[#B8873B] hover:bg-[#9E722E] text-[#080907] font-mono text-[9px] font-bold tracking-wider uppercase rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
            aria-label="Reset zoom"
          >
            {isAr ? "1x ضبط" : "1x Reset"}
          </button>
        </div>
      )}
    </div>
  );
}
