"use client";

import { useState, useEffect } from "react";

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

interface Particle {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  symbol: string;
  color: string;
  type: "heart" | "sparkle";
}

const heartColors = [
  "#ff2d55", "#ff4d7d", "#ff6b8a", "#e8b4c8",
  "#f0c27a", "#fc5c7d", "#ff8fa3", "#ffb3c1",
];

const symbols = ["❤", "♥", "💕", "✦", "✧", "♡", "❥", "✿"];

export default function FloatingHearts() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 640);
  }, []);

  if (!mounted) return null;

  // Fewer particles on mobile for performance
  const count = isMobile ? 14 : 24;

  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: seededRandom(i * 7 + 1) * 100,
    size: isMobile
      ? seededRandom(i * 7 + 2) * 12 + 8
      : seededRandom(i * 7 + 2) * 18 + 10,
    delay: seededRandom(i * 7 + 3) * 20,
    duration: seededRandom(i * 7 + 4) * 15 + 12,
    symbol: symbols[Math.floor(seededRandom(i * 7 + 5) * symbols.length)],
    color: heartColors[Math.floor(seededRandom(i * 7 + 6) * heartColors.length)],
    type: seededRandom(i * 7 + 7) > 0.3 ? "heart" : "sparkle",
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={p.type === "heart" ? "animate-float-heart" : "animate-float-particle"}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            bottom: "-20px",
            fontSize: `${p.size}px`,
            color: p.color,
            textShadow: `0 0 ${p.size / 3}px ${p.color}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
