"use client";

export default function FooterSection() {
  return (
    <footer className="relative w-full py-12 sm:py-16 px-4 sm:px-6 text-center">
      <div className="section-divider mb-6 sm:mb-8" />

      <div className="max-w-md mx-auto">
        {/* Heartbeat */}
        <span
          className="text-3xl sm:text-4xl animate-heartbeat inline-block mb-3 sm:mb-4"
          style={{ color: "#ff2d55", textShadow: "0 0 20px rgba(255,45,85,0.5)", filter: "drop-shadow(0 0 10px rgba(255,45,85,0.3))" }}
        >
          &#10084;
        </span>

        <p
          className="font-great-vibes text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3"
          style={{ color: "#f0c27a", textShadow: "0 0 20px rgba(240,194,122,0.2)" }}
        >
          Made with love, for you
        </p>

        <p className="font-lora text-[10px] sm:text-xs mb-5 sm:mb-6" style={{ color: "#e8b4c8", opacity: 0.6 }}>
          Every pixel placed with you in mind ❤️
        </p>

        <a
          href="#hero"
          className="inline-flex items-center gap-1.5 sm:gap-2 font-lora text-xs sm:text-sm no-underline transition-opacity duration-300 hover:opacity-100 active:opacity-100 py-2 px-3"
          style={{ color: "#e8b4c8", opacity: 0.6 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="w-3 h-3 sm:w-3.5 sm:h-3.5">
            <path d="M6 1L6 11M6 1L2 5M6 1L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to top
        </a>
      </div>

      <div className="mt-6 sm:mt-8 font-lora text-[10px] sm:text-xs" style={{ color: "rgba(232,180,200,0.35)" }}>
        Created & Developed by Rhuzzel Paramio
      </div>
    </footer>
  );
}
