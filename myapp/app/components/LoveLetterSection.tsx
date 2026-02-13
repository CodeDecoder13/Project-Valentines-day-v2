"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="love-letter" className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Section glow */}
      <div className="section-glow top-0 left-1/4" style={{ background: "radial-gradient(circle, rgba(255,45,85,0.2), transparent 70%)" }} />

      <div className="max-w-3xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="section-divider mb-3 sm:mb-4" />
          <h2
            className="font-great-vibes text-2xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-12"
            style={{ color: "#f0c27a", textShadow: "0 0 30px rgba(240,194,122,0.2)" }}
          >
            A Letter For You
          </h2>
        </ScrollReveal>

        {/* Envelope */}
        <ScrollReveal delay={200}>
          <div className="relative max-w-2xl mx-auto">
            {/* Envelope body */}
            <div
              className="glass-strong p-0.5 sm:p-1 cursor-pointer active:scale-[0.99] transition-transform"
              onClick={() => setIsOpen(!isOpen)}
              role="button"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close the love letter" : "Open the love letter"}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsOpen(!isOpen); } }}
              style={{ perspective: "1000px" }}
            >
              {/* Envelope flap */}
              <div
                className="relative z-10 w-full h-14 sm:h-16 md:h-20 flex items-center justify-center transition-transform duration-700 rounded-t-[18px] sm:rounded-t-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255,45,85,0.15), rgba(240,194,122,0.1))",
                  transformOrigin: "top center",
                  transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
                  borderBottom: "1px solid rgba(255,100,130,0.15)",
                }}
              >
                {!isOpen && (
                  <span className="font-great-vibes text-base sm:text-lg md:text-xl" style={{ color: "#e8b4c8" }}>
                    tap to open ✉️
                  </span>
                )}
              </div>

              {/* Letter content */}
              <div
                className="overflow-hidden transition-all duration-700 ease-in-out"
                style={{
                  maxHeight: isOpen ? "1200px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="p-5 sm:p-7 md:p-10">
                  <p className="font-great-vibes text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6" style={{ color: "#f0c27a" }}>
                    My Dearest,
                  </p>

                  <div className="space-y-4 sm:space-y-5 font-lora text-sm sm:text-base leading-relaxed sm:leading-loose" style={{ color: "#fff0f3" }}>
                    <p className="drop-cap">
                      Meeting you feels like stumbling into a really good moment I didn&apos;t
                      expect the kind you just want to enjoy without rushing it. We&apos;ve only
                      just started getting to know each other, but I already find myself smiling
                      at the little things… our conversations, the laughs, the easy way we can
                      just be around each other.
                    </p>

                    <p>
                      I like how simple moments with you turn fun without even trying. Whether
                      we&apos;re talking about random things, planning small hangouts, or just
                      sharing silence, it somehow feels comfortable and honestly, that means
                      a lot to me.
                    </p>

                    <p>
                      I&apos;m not trying to rush anything. I just genuinely enjoy what we have
                      right now and I&apos;m excited to see where it naturally goes. Maybe more
                      adventures, more laughs, more memories we haven&apos;t even thought about yet.
                    </p>

                    <p>
                      Thanks for being someone I can vibe with so easily. I&apos;m looking forward
                      to whatever comes next one step, one story, one fun moment at a time.
                    </p>
                  </div>

                  <div className="mt-6 sm:mt-8 text-right">
                    <p className="font-great-vibes text-lg sm:text-xl md:text-2xl" style={{ color: "#f0c27a" }}>
                      Yours truly,
                    </p>
                    <p
                      className="font-great-vibes text-xl sm:text-2xl md:text-3xl mt-1 sm:mt-2"
                      style={{ color: "#ff4d7d" }}
                    >
                      Rhuzzel ❤️
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
