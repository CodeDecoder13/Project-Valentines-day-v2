"use client";

import ScrollReveal from "./ScrollReveal";
import ReasonCard from "./ReasonCard";

const reasons = [
  {
    emoji: "😊",
    title: "Your Smile",
    description: "Your smile lights up the darkest rooms and makes my whole day brighter. It's the most beautiful thing I've ever seen.",
  },
  {
    emoji: "💛",
    title: "Your Kindness",
    description: "The way you care for others, your gentle heart, and your endless compassion make you truly one of a kind.",
  },
  {
    emoji: "😂",
    title: "Your Laughter",
    description: "Your laugh is contagious and my absolute favorite sound. It fills every space with joy and warmth.",
  },
  {
    emoji: "💪",
    title: "Your Strength",
    description: "You face every challenge with grace and courage. Your resilience inspires me to be a better person every day.",
  },
  {
    emoji: "🌟",
    title: "Your Spirit",
    description: "Your energy and passion for life are magnetic. You bring magic into everything you do and everyone you meet.",
  },
  {
    emoji: "🤗",
    title: "Your Warmth",
    description: "Being near you feels like home. Your warmth and love wrap around me like the coziest blanket in the world.",
  },
];

export default function ReasonsSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Section glow */}
      <div className="section-glow bottom-0 right-1/4" style={{ background: "radial-gradient(circle, rgba(240,194,122,0.15), transparent 70%)" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="section-divider mb-3 sm:mb-4" />
          <h2
            className="font-great-vibes text-2xl sm:text-4xl md:text-5xl text-center mb-2 sm:mb-4"
            style={{ color: "#f0c27a", textShadow: "0 0 30px rgba(240,194,122,0.2)" }}
          >
            Reasons I Adore You
          </h2>
          <p className="font-lora text-xs sm:text-sm text-center mb-8 sm:mb-12" style={{ color: "#e8b4c8" }}>
            Every reason is just the beginning...
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {reasons.map((reason, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <ReasonCard
                emoji={reason.emoji}
                title={reason.title}
                description={reason.description}
                index={i}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
