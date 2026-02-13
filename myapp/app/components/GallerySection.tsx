"use client";

import ScrollReveal from "./ScrollReveal";

const memories = [
  { caption: "Our first date", icon: "📸" },
  { caption: "Your beautiful smile", icon: "💫" },
  { caption: "Adventures together", icon: "🌅" },
  { caption: "Cozy moments", icon: "☕" },
  { caption: "Our favorite place", icon: "🌸" },
  { caption: "Forever & always", icon: "💕" },
];

export default function GallerySection() {
  return (
    <section className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="section-glow top-1/4 right-0" style={{ background: "radial-gradient(circle, rgba(240,194,122,0.12), transparent 70%)" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="section-divider mb-3 sm:mb-4" />
          <h2
            className="font-great-vibes text-2xl sm:text-4xl md:text-5xl text-center mb-2 sm:mb-4"
            style={{ color: "#f0c27a", textShadow: "0 0 30px rgba(240,194,122,0.2)" }}
          >
            Our Memories
          </h2>
          <p className="font-lora text-xs sm:text-sm text-center mb-8 sm:mb-12" style={{ color: "#e8b4c8" }}>
            Moments frozen in time...
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {memories.map((memory, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div
                className="relative h-40 sm:h-52 md:h-60 lg:h-64 glass overflow-hidden group cursor-pointer transition-all duration-400 hover:-translate-y-1 active:scale-[0.98]"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
              >
                {/* Placeholder gradient */}
                <div className="absolute inset-0 gallery-placeholder" />

                {/* Lock overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ background: "radial-gradient(ellipse at center, rgba(10,0,9,0.5), rgba(10,0,9,0.8))" }}
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-110">
                    {memory.icon}
                  </span>
                  <span
                    className="text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2 transition-all duration-300 group-hover:scale-110"
                    style={{ filter: "drop-shadow(0 0 8px rgba(255,45,85,0.3))" }}
                  >
                    🔒
                  </span>
                  <span className="font-lora text-[10px] sm:text-xs" style={{ color: "#e8b4c8" }}>Coming soon</span>
                </div>

                {/* Caption */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 md:p-4"
                  style={{ background: "linear-gradient(transparent, rgba(10,0,9,0.9))" }}
                >
                  <p className="font-great-vibes text-sm sm:text-base md:text-lg" style={{ color: "#f0c27a" }}>
                    {memory.caption}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
