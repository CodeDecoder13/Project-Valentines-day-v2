"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { getCookie, setCookie } from "../hooks/useCookies";

const CORRECT_PIN = "060606";
const COOKIE_NAME = "valentines_v2_unlocked";

export default function PinLock({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (getCookie(COOKIE_NAME) === "true") {
      setIsUnlocked(true);
    }
    setLoaded(true);
  }, []);

  const checkPin = useCallback((newPin: string[]) => {
    const fullPin = newPin.join("");
    if (fullPin.length === 6) {
      if (fullPin === CORRECT_PIN) {
        setSuccess(true);
        setTimeout(() => {
          setCookie(COOKIE_NAME, "true", 365);
          setIsUnlocked(true);
        }, 800);
      } else {
        setError(true);
        setTimeout(() => {
          setPin(Array(6).fill(""));
          inputRefs.current[0]?.focus();
        }, 600);
      }
    }
  }, []);

  const handleChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setError(false);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    checkPin(newPin);
  }, [pin, checkPin]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [pin]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const newPin = pasted.split("");
      setPin(newPin);
      inputRefs.current[5]?.focus();
      checkPin(newPin);
    }
  }, [checkPin]);

  if (!loaded) return null;
  if (isUnlocked) return <>{children}</>;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        background: "radial-gradient(ellipse at center, #1a0012 0%, #0a0009 70%)",
      }}
    >
      {/* Ambient glow orbs - hidden on very small screens for perf */}
      <div
        className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,45,85,0.4), transparent 70%)", filter: "blur(40px)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(240,194,122,0.3), transparent 70%)", filter: "blur(40px)" }}
      />

      <div className={`glass-strong p-6 sm:p-8 md:p-12 text-center w-full max-w-[360px] sm:max-w-md ${error ? "animate-shake" : ""} ${success ? "animate-pin-success" : ""}`}>
        {/* Lock icon */}
        <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">
          {success ? (
            <span style={{ filter: "drop-shadow(0 0 20px rgba(255,45,85,0.6))" }}>💖</span>
          ) : (
            <span style={{ filter: "drop-shadow(0 0 15px rgba(255,45,85,0.3))" }}>🔒</span>
          )}
        </div>

        <h2
          className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2"
          style={{ color: "#fff0f3", textShadow: "0 0 30px rgba(255,45,85,0.3)" }}
        >
          Enter the Secret Code
        </h2>
        <p className="font-great-vibes text-lg sm:text-xl mb-6 sm:mb-8" style={{ color: "#e8b4c8" }}>
          A date that means everything...
        </p>

        {/* PIN inputs */}
        <div className="flex justify-center gap-1.5 sm:gap-2 md:gap-3 mb-5 sm:mb-6">
          {pin.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={i === 0 ? handlePaste : undefined}
              className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-xl sm:text-2xl font-bold rounded-lg sm:rounded-xl outline-none transition-all duration-300"
              style={{
                background: digit
                  ? "linear-gradient(135deg, rgba(255,45,85,0.2), rgba(255,77,125,0.15))"
                  : "rgba(255,255,255,0.05)",
                border: digit
                  ? "2px solid rgba(255,45,85,0.5)"
                  : "2px solid rgba(255,255,255,0.1)",
                color: "#fff0f3",
                boxShadow: digit ? "0 0 15px rgba(255,45,85,0.2)" : "none",
                fontFamily: "var(--font-playfair)",
                caretColor: "#ff2d55",
              }}
              autoFocus={i === 0}
            />
          ))}
        </div>

        {/* Hint dots - MM/DD/YY grouping */}
        <div className="flex justify-center items-center gap-1 mb-4">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300" style={{ background: pin[0] ? "#ff2d55" : "rgba(255,255,255,0.2)" }} />
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300" style={{ background: pin[1] ? "#ff2d55" : "rgba(255,255,255,0.2)" }} />
          </div>
          <span className="text-[10px] mx-0.5 sm:mx-1" style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300" style={{ background: pin[2] ? "#ff2d55" : "rgba(255,255,255,0.2)" }} />
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300" style={{ background: pin[3] ? "#ff2d55" : "rgba(255,255,255,0.2)" }} />
          </div>
          <span className="text-[10px] mx-0.5 sm:mx-1" style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300" style={{ background: pin[4] ? "#ff2d55" : "rgba(255,255,255,0.2)" }} />
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300" style={{ background: pin[5] ? "#ff2d55" : "rgba(255,255,255,0.2)" }} />
          </div>
        </div>

        {error && (
          <p className="text-xs sm:text-sm mt-2" style={{ color: "#ff6b8a" }}>
            That&apos;s not it... try again ❤️
          </p>
        )}

        {success && (
          <p className="font-great-vibes text-lg sm:text-xl mt-2" style={{ color: "#f0c27a" }}>
            Welcome, my love ✨
          </p>
        )}
      </div>
    </div>
  );
}
