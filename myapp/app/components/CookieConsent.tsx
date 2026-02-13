"use client";

import { useState, useEffect } from "react";
import { getCookie, setCookie } from "../hooks/useCookies";

const COOKIE_NAME = "cookie_consent_v2";

export function hasConsent(): boolean {
  if (typeof document === "undefined") return false;
  return getCookie(COOKIE_NAME) === "accepted";
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME);
    if (!consent) {
      setTimeout(() => setVisible(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    setCookie(COOKIE_NAME, "accepted", 365);
    setVisible(false);
  };

  const handleDecline = () => {
    setCookie(COOKIE_NAME, "declined", 365);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 sm:left-auto sm:right-4 sm:bottom-4 md:right-6 md:bottom-6 sm:max-w-sm z-50 p-3 sm:p-0"
      style={{ animation: "fade-in-up 0.5s ease-out" }}
    >
      <div className="glass-strong p-4 sm:p-5 md:p-6">
        <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
          <span className="text-xl sm:text-2xl flex-shrink-0">🍪</span>
          <div className="min-w-0">
            <h3 className="font-playfair text-xs sm:text-sm font-bold mb-0.5 sm:mb-1" style={{ color: "#fff0f3" }}>
              Cookie Notice
            </h3>
            <p className="font-lora text-[10px] sm:text-xs leading-relaxed" style={{ color: "#e8b4c8" }}>
              We use cookies to remember your Valentine response and preferences.
              No tracking or analytics — just love. 💕
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="flex-1 font-playfair text-xs sm:text-sm font-bold py-2.5 sm:py-3 rounded-xl transition-all duration-300 cursor-pointer active:scale-95"
            style={{
              background: "linear-gradient(135deg, #ff2d55, #ff4d7d)",
              color: "#fff",
              border: "none",
              boxShadow: "0 4px 15px rgba(255,45,85,0.3)",
            }}
          >
            Accept ❤️
          </button>
          <button
            onClick={handleDecline}
            className="font-playfair text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl transition-all duration-300 cursor-pointer active:scale-95"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "#e8b4c8",
              border: "1px solid rgba(255,100,130,0.15)",
            }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
