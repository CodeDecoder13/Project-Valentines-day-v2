"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface Sparkle {
  id: string;
  x: number;
  y: number;
  tx: string;
  ty: string;
  color: string;
  emoji: string;
  size: number;
}

const sparkleColors = ["#ff2d55", "#ff4d7d", "#f0c27a", "#ff8fa3", "#ffb3c1", "#fc5c7d"];
const sparkleEmojis = ["❤️", "✨", "💕", "💫", "🌟", "💗"];

export default function HeroSection() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const isHovering = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sparkleIdRef = useRef(0);
  const lastTouch = useRef({ x: 0, y: 0 });

  const createSparkles = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const count = window.innerWidth < 640 ? 3 : 6;
    const maxDist = window.innerWidth < 640 ? 50 : 100;

    const newSparkles: Sparkle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * maxDist;
      return {
        id: `sparkle-${sparkleIdRef.current++}`,
        x,
        y,
        tx: `${Math.cos(angle) * distance}px`,
        ty: `${Math.sin(angle) * distance}px`,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        emoji: sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)],
        size: window.innerWidth < 640 ? 10 + Math.random() * 10 : 12 + Math.random() * 16,
      };
    });

    setSparkles((prev) => {
      const maxSparkles = window.innerWidth < 640 ? 15 : 30;
      const combined = [...prev, ...newSparkles];
      return combined.slice(-maxSparkles);
    });

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id)));
    }, 800);
  }, []);

  useEffect(() => {
    return () => { isHovering.current = false; };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-5 sm:px-6 md:px-8"
      onMouseMove={(e) => {
        if (Math.random() > 0.7) createSparkles(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        lastTouch.current = { x: t.clientX, y: t.clientY };
        createSparkles(t.clientX, t.clientY);
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];
        const dx = t.clientX - lastTouch.current.x;
        const dy = t.clientY - lastTouch.current.y;
        if (Math.abs(dx) + Math.abs(dy) > 30) {
          lastTouch.current = { x: t.clientX, y: t.clientY };
          createSparkles(t.clientX, t.clientY);
        }
      }}
    >
      {/* Background aurora */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 animate-aurora"
          style={{
            background: "radial-gradient(ellipse at 30% 20%, rgba(255,45,85,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(240,194,122,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(255,77,125,0.06) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Rotating rings - scale with viewport */}
      <div className="absolute animate-rotate-slow pointer-events-none w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]">
        <div className="w-full h-full rounded-full" style={{
          border: "1px solid rgba(255,45,85,0.08)",
          boxShadow: "0 0 40px rgba(255,45,85,0.04)",
        }} />
      </div>
      <div
        className="absolute animate-rotate-slow pointer-events-none w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px]"
        style={{ animationDirection: "reverse", animationDuration: "30s" }}
      >
        <div className="w-full h-full rounded-full" style={{
          border: "1px dashed rgba(240,194,122,0.05)",
        }} />
      </div>

      {/* Heart */}
      <div className="relative mb-5 sm:mb-8 cursor-pointer select-none">
        <span
          className="text-5xl sm:text-7xl md:text-8xl animate-heartbeat inline-block"
          style={{ filter: "drop-shadow(0 0 25px rgba(255,45,85,0.5))" }}
        >
          ❤️
        </span>
      </div>

      {/* Title */}
      <h1
        className="font-playfair text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-3 sm:mb-4 relative z-10 leading-tight"
        style={{
          color: "#fff0f3",
          textShadow: "0 0 40px rgba(255,45,85,0.3), 0 0 80px rgba(255,45,85,0.15)",
        }}
      >
        Happy Valentine&apos;s Day
      </h1>

      {/* Subtitle */}
      <p
        className="font-great-vibes text-xl sm:text-3xl md:text-4xl text-center mb-1 sm:mb-2 relative z-10"
        style={{ color: "#f0c27a", textShadow: "0 0 20px rgba(240,194,122,0.25)" }}
      >
        To someone truly special
      </p>

      <p className="font-lora text-xs sm:text-sm md:text-base text-center mt-2 relative z-10 px-4" style={{ color: "#e8b4c8" }}>
        Scroll down to begin our story
      </p>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 animate-scroll-bounce">
        <a href="#love-letter" className="flex flex-col items-center gap-1.5 sm:gap-2 no-underline" style={{ color: "#e8b4c8" }}>
          <span className="text-[10px] sm:text-xs tracking-widest uppercase font-lora">Scroll</span>
          <svg width="18" height="24" viewBox="0 0 20 28" fill="none" className="opacity-50 sm:opacity-60 w-4 h-6 sm:w-5 sm:h-7">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="10" cy="9" r="2" fill="currentColor" className="animate-scroll-bounce" />
          </svg>
        </a>
      </div>

      {/* Sparkles */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute pointer-events-none z-20"
          style={{
            left: s.x,
            top: s.y,
            fontSize: `${s.size}px`,
            color: s.color,
            animation: "sparkle-fly 0.8s ease-out forwards",
            "--tx": s.tx,
            "--ty": s.ty,
          } as React.CSSProperties}
        >
          {s.emoji}
        </span>
      ))}
    </section>
  );
}
