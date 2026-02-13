"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { getCookie, setCookie } from "../hooks/useCookies";

const noTexts = [
  { text: "No 😢" },
  { text: "Are you sure? 🥺" },
  { text: "Really sure? 💔" },
  { text: "Think again! 😭" },
  { text: "Please? 🙏" },
  { text: "Don't do this... 😿" },
  { text: "I'll be sad 💧" },
  { text: "You're breaking my heart 😩" },
  { text: "Last chance! 💘" },
  { text: "Pretty please? 🌹" },
];

const COOKIE_NAME = "valentines_v2_accepted";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
  duration: number;
}

export default function ValentineAsk() {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (getCookie(COOKIE_NAME) === "true") {
      setAccepted(true);
    }
    setLoaded(true);
  }, []);

  const handleYes = useCallback(() => {
    setAccepted(true);
    setCookie(COOKIE_NAME, "true", 365);

    const pieces: ConfettiPiece[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ["#ff2d55", "#ff4d7d", "#f0c27a", "#ff8fa3", "#ffb3c1", "#fc5c7d", "#ffd89b"][Math.floor(Math.random() * 7)],
      delay: Math.random() * 1.5,
      rotation: Math.random() * 360,
      duration: 2 + Math.random() * 2,
    }));
    setConfetti(pieces);

    const formData = new FormData();
    formData.append("access_key", "06e51d7d-3a2d-4af1-a1a2-2d73a62ec92b");
    formData.append("subject", "Valentine's Day V2 - She said YES! 💖");
    formData.append("message", `She said yes! 💕 (V2)\n\nDodge attempts: ${dodgeCount}\nTime: ${new Date().toLocaleString()}`);
    fetch("https://api.web3forms.com/submit", { method: "POST", body: formData }).catch(() => {});
  }, [dodgeCount]);

  const dodgeNo = useCallback(() => {
    if (!noBtnRef.current || !containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 640;

    const baseRange = isMobile ? 60 : 150;
    const extraRange = dodgeCount * (isMobile ? 8 : 20);
    const range = Math.min(baseRange + extraRange, isMobile ? 120 : 250);

    let newX: number, newY: number;
    let attempts = 0;
    do {
      newX = (Math.random() - 0.5) * range * 2;
      newY = (Math.random() - 0.5) * range;
      attempts++;
    } while (attempts < 15 && Math.abs(newX) < 40 && Math.abs(newY) < 20);

    // Clamp to stay visible
    const maxX = (container.width / 2) - 50;
    const maxY = isMobile ? 80 : 100;
    newX = Math.max(-maxX, Math.min(maxX, newX));
    newY = Math.max(-maxY, Math.min(maxY, newY));

    noBtnRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    setDodgeCount((prev) => prev + 1);
  }, [dodgeCount]);

  if (!loaded) return null;

  const yesScale = Math.min(1 + dodgeCount * 0.05, 1.35);
  const noScale = Math.max(1 - dodgeCount * 0.04, 0.65);
  const noOpacity = Math.max(1 - dodgeCount * 0.07, 0.35);
  const currentNoText = noTexts[Math.min(dodgeCount, noTexts.length - 1)];

  return (
    <section className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden" ref={containerRef}>
      <div className="section-glow bottom-1/4 left-1/3" style={{ background: "radial-gradient(circle, rgba(255,45,85,0.15), transparent 70%)" }} />

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {!accepted ? (
          <>
            <div className="text-5xl sm:text-6xl md:text-8xl mb-4 sm:mb-6 animate-heartbeat">💝</div>
            <h2
              className="font-playfair text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3"
              style={{ color: "#fff0f3", textShadow: "0 0 40px rgba(255,45,85,0.3)" }}
            >
              Will You Be My Valentine?
            </h2>
            <p className="font-great-vibes text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12" style={{ color: "#f0c27a" }}>
              You already know the answer...
            </p>

            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 min-h-[160px] sm:min-h-[140px]">
              {/* Yes button */}
              <button
                onClick={handleYes}
                className="font-playfair text-base sm:text-lg md:text-xl font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl transition-all duration-300 cursor-pointer active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #ff2d55, #ff4d7d)",
                  color: "#fff",
                  boxShadow: "0 6px 25px rgba(255,45,85,0.4)",
                  transform: `scale(${yesScale})`,
                  border: "none",
                  minWidth: "140px",
                }}
              >
                Yes! 💖
              </button>

              {/* No button */}
              <button
                ref={noBtnRef}
                onClick={dodgeNo}
                onMouseEnter={dodgeNo}
                onTouchStart={(e) => { e.preventDefault(); dodgeNo(); }}
                className="font-playfair text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-colors duration-200 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "#e8b4c8",
                  border: "1px solid rgba(255,100,130,0.2)",
                  transform: `scale(${noScale})`,
                  opacity: noOpacity,
                  whiteSpace: "nowrap",
                }}
              >
                {currentNoText.text}
              </button>
            </div>

            {dodgeCount > 0 && (
              <p className="mt-8 sm:mt-6 text-xs sm:text-sm font-lora" style={{ color: "#e8b4c8", opacity: 0.5 }}>
                Attempts to say no: {dodgeCount} 😏
              </p>
            )}
          </>
        ) : (
          <div className="relative py-4">
            {/* Celebration */}
            <div className="text-6xl sm:text-7xl md:text-9xl mb-4 sm:mb-6 animate-heartbeat">
              💖
            </div>

            {/* Heart burst */}
            <div className="absolute inset-0 flex items-start justify-center pointer-events-none pt-8">
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const distance = 60 + (i % 3) * 20;
                return (
                  <span
                    key={i}
                    className="absolute text-base sm:text-xl"
                    style={{
                      animation: "sparkle-fly 1.5s ease-out forwards",
                      "--tx": `${Math.cos(angle) * distance}px`,
                      "--ty": `${Math.sin(angle) * distance}px`,
                      animationDelay: `${i * 0.05}s`,
                    } as React.CSSProperties}
                  >
                    ❤️
                  </span>
                );
              })}
            </div>

            <h2
              className="font-playfair text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4"
              style={{ color: "#fff0f3", textShadow: "0 0 40px rgba(255,45,85,0.4)" }}
            >
              You Said Yes! 🎉
            </h2>
            <p className="font-great-vibes text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4" style={{ color: "#f0c27a" }}>
              You just made me the happiest person alive
            </p>
            <p className="font-lora text-xs sm:text-sm" style={{ color: "#e8b4c8" }}>
              I love you more than words could ever say ❤️
            </p>
          </div>
        )}
      </div>

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 pointer-events-none"
          style={{
            left: `${piece.x}%`,
            width: "6px",
            height: "12px",
            background: piece.color,
            borderRadius: "2px",
            animation: `confetti-fall ${piece.duration}s ease-in forwards`,
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </section>
  );
}
