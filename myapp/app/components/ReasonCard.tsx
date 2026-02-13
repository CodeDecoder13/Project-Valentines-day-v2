"use client";

import { useState, useEffect } from "react";

interface ReasonCardProps {
  emoji: string;
  title: string;
  description: string;
  index: number;
}

export default function ReasonCard({ emoji, title, description, index }: ReasonCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: "1000px", height: isMobile ? "200px" : "220px" }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => { if (!isMobile) setIsFlipped(true); }}
      onMouseLeave={() => { if (!isMobile) setIsFlipped(false); }}
      role="button"
      aria-label={`${title} - ${isFlipped ? "showing details" : "tap to reveal"}`}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsFlipped(!isFlipped); } }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 glass p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-3xl sm:text-4xl mb-2 sm:mb-3">{emoji}</span>
          <h3
            className="font-playfair text-base sm:text-lg font-bold"
            style={{ color: "#fff0f3" }}
          >
            {title}
          </h3>
          <p className="text-[11px] sm:text-xs mt-1.5 sm:mt-2 font-great-vibes" style={{ color: "#e8b4c8" }}>
            {isMobile ? "tap to reveal" : "hover to reveal"}
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 glass p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, rgba(255,45,85,${0.08 + index * 0.02}), rgba(240,194,122,0.06))`,
          }}
        >
          <span className="text-xl sm:text-2xl mb-1.5 sm:mb-2">{emoji}</span>
          <p className="font-lora text-xs sm:text-sm leading-relaxed" style={{ color: "#fff0f3" }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
