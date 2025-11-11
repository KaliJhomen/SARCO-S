import React, { useState, useEffect, useRef, useCallback } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const defaultSlides = [
  { id: 1, imgSrc: assets.prueba_ad_banner, link: "#" }
];

const resolveSrc = (src) => {
  if (!src) return "/articulos/placeholder.svg";
  if (typeof src !== "string") return src;
  const s = src.trim();
  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("/")) return s;
  return `/articulos/${encodeURIComponent(s)}`;
};

const HeaderSlider = ({ slides: slidesProp }) => {
  const slides = slidesProp && slidesProp.length ? slidesProp : defaultSlides;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slideCount = Math.max(0, slides.length);

  const go = useCallback((index) => {
    if (slideCount <= 0) return;
    // Normalize index to 0..slideCount-1
    let next = index;
    // handle negative values
    next = ((next % slideCount) + slideCount) % slideCount;
    setCurrent(next);
  }, [slideCount]);

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  useEffect(() => {
    if (isPaused) return;
    if (slideCount <= 1) return; // don't autoplay when 0 or 1 slides
    const id = setInterval(() => next(), 4000);
    return () => clearInterval(id);
  }, [current, isPaused, next]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // touch / swipe support
  useEffect(() => {
  const el = containerRef.current;
  if (!el) return;

    const onTouchStart = (e) => {
      touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    };
    const onTouchMove = (e) => {
      touchEndX.current = e.touches ? e.touches[0].clientX : e.clientX;
    };
    const onTouchEnd = () => {
      const dx = touchStartX.current - touchEndX.current;
      if (Math.abs(dx) > 50) {
        if (dx > 0) next();
        else prev();
      }
      touchStartX.current = 0;
      touchEndX.current = 0;
    };

  el.addEventListener("touchstart", onTouchStart, { passive: true });
  el.addEventListener("touchmove", onTouchMove, { passive: true });
  el.addEventListener("touchend", onTouchEnd);
    // mouse drag support
    let dragging = false;
    const onMouseDown = (e) => { dragging = true; touchStartX.current = e.clientX; };
    const onMouseMove = (e) => { if (dragging) touchEndX.current = e.clientX; };
    const onMouseUp = () => { if (dragging) onTouchEnd(); dragging = false; };

  el.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [next, prev]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={containerRef}
    >
      {/* Slides strip */}
      <div
        className="flex transition-transform duration-700 ease-in-out flex-nowrap"
        style={{
          width: `${slideCount * 100}%`,
          transform: `translateX(-${(current * 100) / Math.max(1, slideCount)}%)`,
        }}
      >
        {slides.map((slide, idx) => {
          const imgSrc = resolveSrc(slide.imgSrc);
          return (
            <div
              key={slide.id ?? idx}
              className="w-full flex-shrink-0 flex items-center justify-center py-4 md:py-8 px-3 md:px-6"
              style={{ minWidth: `${100 / Math.max(1, slideCount)}%` }}
            >
              <Link
                href={slide.link ?? '#'}
                className="w-full max-w-6xl group block rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {/* aspect ratio box so the image is contained and not cropped unexpectedly */}
                <div className="w-full bg-[#E6E9F2] flex items-center justify-center" style={{ aspectRatio: '16 / 6', minHeight: 160 }}>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={imgSrc}
                      alt={slide.title ?? `Slide ${idx + 1}`}
                      sizes="(max-width: 1008px) 100vw, 800px"
                      className="object-contain object-center"
                      fill
                      unoptimized
                      priority={idx === 0}
                    />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Left / Right arrows (hidden when only one slide) */}
      {slideCount > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={prev}
            className="flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 rounded-full shadow hover:bg-white z-30"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 6L9 12l6 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            aria-label="Siguiente"
            onClick={next}
            className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 rounded-full shadow hover:bg-white z-30"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Dots (hidden when only one slide) */}
      {slideCount > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir a slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full ${current === i ? "bg-orange-600" : "bg-gray-400/60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderSlider;
