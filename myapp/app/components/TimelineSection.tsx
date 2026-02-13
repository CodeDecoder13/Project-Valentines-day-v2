"use client";

import ScrollReveal from "./ScrollReveal";

const milestones = [
  {
    emoji: "✨",
    title: "The Day We Met",
    description: "The universe aligned and our paths crossed. From that moment, everything changed.",
    side: "left" as const,
  },
  {
    emoji: "💬",
    title: "First Conversations",
    description: "Late night talks that turned into early mornings. Every word made me fall a little more.",
    side: "right" as const,
  },
  {
    emoji: "🦋",
    title: "The Butterflies",
    description: "That feeling in my stomach every time you smiled. I knew this was something real.",
    side: "left" as const,
  },
  {
    emoji: "💕",
    title: "Falling In Love",
    description: "It wasn't a single moment — it was every moment. Slowly, beautifully, completely.",
    side: "right" as const,
  },
  {
    emoji: "🌅",
    title: "Our Adventures",
    description: "Every adventure with you, big or small, becomes a treasured memory I'll never forget.",
    side: "left" as const,
  },
  {
    emoji: "💖",
    title: "Forever & Always",
    description: "And now, here we are. My favorite chapter is the one we're writing together.",
    side: "right" as const,
  },
];

export default function TimelineSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="section-glow top-1/3 left-0" style={{ background: "radial-gradient(circle, rgba(255,45,85,0.12), transparent 70%)" }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="section-divider mb-3 sm:mb-4" />
          <h2
            className="font-great-vibes text-2xl sm:text-4xl md:text-5xl text-center mb-2 sm:mb-4"
            style={{ color: "#f0c27a", textShadow: "0 0 30px rgba(240,194,122,0.2)" }}
          >
            Our Story timeline Plan
          </h2>
          <p className="font-lora text-xs sm:text-sm text-center mb-10 sm:mb-16" style={{ color: "#e8b4c8" }}>
            Every moment led us here...
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Mobile left line */}
          <div
            className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(255,45,85,0.3), rgba(240,194,122,0.3), transparent)" }}
          />

          {milestones.map((milestone, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className={`relative flex items-start mb-8 sm:mb-10 md:mb-12 ${milestone.side === "right" ? "md:flex-row-reverse" : ""}`}>
                {/* Dot on timeline */}
                <div
                  className="absolute left-4 sm:left-6 md:left-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full z-10 -translate-x-1/2 mt-5 sm:mt-6"
                  style={{
                    background: i % 2 === 0 ? "#ff2d55" : "#f0c27a",
                    boxShadow: `0 0 10px ${i % 2 === 0 ? "rgba(255,45,85,0.5)" : "rgba(240,194,122,0.5)"}`,
                  }}
                />

                {/* Card */}
                <div className={`glass p-4 sm:p-5 md:p-6 ml-10 sm:ml-14 md:ml-0 ${milestone.side === "left" ? "md:mr-auto md:pr-10 lg:pr-12" : "md:ml-auto md:pl-10 lg:pl-12"} w-[calc(100%-3rem)] sm:w-[calc(100%-4.5rem)] md:w-[45%]`}>
                  <span className="text-2xl sm:text-3xl mb-1.5 sm:mb-2 inline-block">{milestone.emoji}</span>
                  <h3 className="font-playfair text-base sm:text-lg font-bold mb-1.5 sm:mb-2" style={{ color: "#fff0f3" }}>
                    {milestone.title}
                  </h3>
                  <p className="font-lora text-xs sm:text-sm leading-relaxed" style={{ color: "#e8b4c8" }}>
                    {milestone.description}
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
