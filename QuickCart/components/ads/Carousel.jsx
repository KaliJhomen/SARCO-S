'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Carousel4x5
 * Props:
 *  - slides: Array of { src, alt, caption? } OR array of React nodes
 *  - autoplay: number (ms) | 0 to disable (default 4000)
 *  - loop: boolean (default true)
 *  - showNav: boolean (default true)
 *  - showIndicators: boolean (default true)
 *  - className: string additional wrapper classes
 *
 * Aspect ratio: 4:5 (width:height) via style { aspectRatio: '4 / 5' }
 */
export default function Carousel({
  slides = [],
  autoplay = 4000,
  loop = true,
  showNav = true,
  showIndicators = true,
  className = '',
}) {
  const isNodeObjects = slides.length > 0 && typeof slides[0] === 'object' && !React.isValidElement(slides[0]);
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const touchStartX = useRef(null);
  const touchDelta = useRef(0);
  const autoplayTimer = useRef(null);

  const go = useCallback((nextIndex) => {
    if (count === 0) return;
    if (loop) {
      const idx = ((nextIndex % count) + count) % count;
      setIndex(idx);
    } else {
      setIndex(Math.max(0, Math.min(count - 1, nextIndex)));
    }
  }, [count, loop]);

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // autoplay
  useEffect(() => {
    if (!autoplay || autoplay <= 0 || isPaused || count <= 1) return;
    autoplayTimer.current = setInterval(() => {
      go(index + 1);
    }, autoplay);
    return () => {
      clearInterval(autoplayTimer.current);
    };
  }, [autoplay, isPaused, index, go, count]);

  // Pause on hover/focus
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleFocus = () => setIsPaused(true);
  const handleBlur = () => setIsPaused(false);

  // Touch handlers (swipe)
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };
  const onTouchMove = (e) => {
    if (touchStartX.current == null) return;
    touchDelta.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    const delta = touchDelta.current;
    const swipeThreshold = 40; // px
    if (Math.abs(delta) > swipeThreshold) {
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
    touchDelta.current = 0;
  };

  if (count === 0) return null;

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Viewport with fixed aspect ratio 4:5 */}
      <div
        className="overflow-hidden rounded-lg bg-gray-100"
        // fallback padding-top para navegadores sin soporte aspect-ratio
        style={{
          position: 'relative',
          aspectRatio: '4 / 5',
          height: 0,
          paddingTop: '125%' // (5 / 4) * 100%
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Track (absoluto para llenar el área creada por padding-top) */}
        <div
          ref={trackRef}
          className="absolute inset-0 flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)`, width: `${count * 100}%` }}
        >
          {slides.map((s, i) => {
            const content = React.isValidElement(s)
               ? s
               : isNodeObjects
                 ? (
                   // image object { src, alt, caption? }
                  <div className="w-full h-full relative">
                    <img
                      src={s.src}
                      alt={s.alt || `slide-${i}`}
                      style={{ display: 'block', width: '100%', height: '100%' }}
                      className="absolute inset-0 object-cover object-center"
                      draggable={false}
                    />
                  </div>
                 )
                 : (
                   // fallback - plain string -> treat as img src
                  <div className="w-full h-full relative">
                    <img
                      src={s}
                      alt={`slide-${i}`}
                      style={{ display: 'block', width: '100%', height: '100%' }}
                      className="absolute inset-0 object-cover object-center"
                      draggable={false}
                    />
                  </div>
                 );

            return (
              <div key={i} className="flex-shrink-0 w-full h-full">
                {content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      {showNav && count > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center"
          >
            ‹
          </button>

          <button
            aria-label="Siguiente"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center"
          >
            ›
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && count > 1 && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir a slide ${i + 1}`}
              onClick={() => go(i)}
              className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/60' } shadow`}
            />
          ))}
        </div>
      )}
    </div>
  );
}