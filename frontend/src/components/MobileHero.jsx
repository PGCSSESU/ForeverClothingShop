import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import model from "../assets/men.jpg";
import model1 from "../assets/image3.png";
import model2 from "../assets/sam.jpg";
import model3 from "../assets/bol.jpg";
import model4 from "../assets/jaipur.webp";
import model5 from "../assets/pooja.jpg";

/* SLIDES */
const slides = [
  { title: "Vivid Future", subtitle: "Designed for tomorrow", image: model },
  { title: "Radiant Allure", subtitle: "Timeless fashion", image: model1 },
  { title: "Bold Uniqueness", subtitle: "Stand out in style", image: model2 },
  { title: "Pure Opulence", subtitle: "Luxury redefined", image: model3 },
  { title: "Flawless Craft", subtitle: "Precision in every detail", image: model4 },
  { title: "Creative Edge", subtitle: "Where art meets fashion", image: model5 },
];

const SPRING = 0.12;
const VELOCITY_SKIP = 0.65;

const MobileHero = () => {
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startX = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const raf = useRef(null);
  const autoplay = useRef(null);

  const navigate = useNavigate();

  /* AUTOPLAY (LOOPED) */
  useEffect(() => {
    autoplay.current = setInterval(() => {
      if (!dragging) goNext();
    }, 5600);

    return () => clearInterval(autoplay.current);
  }, [dragging]);

  /* LOOPED CONTROLS */
  const goNext = () =>
    setIndex((i) => (i + 1) % slides.length);

  const goPrev = () =>
    setIndex((i) => (i - 1 + slides.length) % slides.length);

  /* TOUCH */
  const onStart = (e) => {
    setDragging(true);
    startX.current = e.touches[0].clientX;
    lastX.current = startX.current;
    lastTime.current = Date.now();
    cancelAnimationFrame(raf.current);
    clearInterval(autoplay.current);
  };

  const onMove = (e) => {
    if (!dragging) return;

    const x = e.touches[0].clientX;
    const dx = x - startX.current;

    const now = Date.now();
    const dt = now - lastTime.current;
    velocity.current = (x - lastX.current) / Math.max(1, dt);

    lastX.current = x;
    lastTime.current = now;

    setOffset(dx);
  };

  const onEnd = () => {
    setDragging(false);

    const shouldSkip =
      Math.abs(offset) > window.innerWidth * 0.25 ||
      Math.abs(velocity.current) > VELOCITY_SKIP;

    if (shouldSkip) {
      offset < 0 ? goNext() : goPrev();
    }

    snapBack();
  };

  /* SPRING SNAP */
  const snapBack = () => {
    const animate = () => {
      setOffset((o) => {
        const next = o * (1 - SPRING);
        if (Math.abs(next) < 0.5) return 0;
        return next;
      });
      raf.current = requestAnimationFrame(animate);
    };
    animate();
  };

  return (
    <section
      className="relative w-full h-[90svh] overflow-hidden bg-black"
      onTouchStart={onStart}
      onTouchMove={onMove}
      onTouchEnd={onEnd}
    >
      {slides.map((slide, i) => {
        // LOOP POSITION CALCULATION
        const diff =
          ((i - index + slides.length + slides.length / 2) %
            slides.length) -
          slides.length / 2;

        const active = diff === 0;

        return (
          <div
            key={i}
            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(${diff * 100 + offset / 3}%)`,
              zIndex: active ? 10 : 1,
            }}
          >
            {/* FULL-WIDTH SURFACE */}
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

              {active && (
                <div className="absolute bottom-20 left-5 right-5 text-white animate-[fadeUp_1s_ease-out]">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-emerald-300 mb-2">
                    Featured
                  </p>

                  <h1 className="text-3xl font-medium leading-tight mb-2">
                    {slide.title}
                  </h1>

                  <p className="text-white/80 text-base mb-6">
                    {slide.subtitle}
                  </p>

                  <button
                    onClick={() => navigate("/collection")}
                    className="inline-flex items-center gap-2 text-sm font-medium border-b border-white/60 pb-1"
                  >
                    Explore Collection
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* PROGRESS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-[2px] transition-all ${
              i === index ? "w-8 bg-white" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(26px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default MobileHero;
