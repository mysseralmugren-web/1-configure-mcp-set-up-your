import React from "react";
import Link from "next/link";
import { Locale } from "@/types";

interface LogoProps {
  locale?: Locale;
  variant?: "light" | "dark" | "monochrome" | "silver";
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  asLink?: boolean;
}

export function Logo({
  locale = "ar",
  variant = "light",
  showSubtitle = true,
  size = "md",
  className = "",
  asLink = true,
}: LogoProps) {
  const isDarkBg = variant === "light"; // on dark navbar, light logo is used
  const primaryColor = isDarkBg ? "#ffffff" : "#101d35";
  const accentColor = "#b9c2cc";
  const goldColor = "#c5a467";

  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14",
    xl: "h-20",
  }[size];

  const content = (
    <div
      className={`inline-flex items-center gap-3 transition-opacity hover:opacity-95 select-none ${className}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* Precision Architectural Geometric Emblem */}
      <svg
        className={`${sizeClasses} w-auto flex-shrink-0 drop-shadow-sm`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Architectural Precision Frame */}
        <rect
          x="3"
          y="3"
          width="58"
          height="58"
          rx="12"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeDasharray="4 2"
          opacity="0.6"
        />
        <rect
          x="7"
          y="7"
          width="50"
          height="50"
          rx="8"
          fill={isDarkBg ? "#101d35" : "#091326"}
          stroke={goldColor}
          strokeWidth="1.75"
        />
        {/* Stylized Interlocking Joinery 'M' Craftsmanship */}
        <path
          d="M17 44V23L27 34L32 28.5L37 34L47 23V44"
          stroke={accentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Gold Precision Joinery Inlay Line */}
        <path
          d="M23 44V33L32 42L41 33V44"
          stroke={goldColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Crown & Riyadh Architectonic Dot */}
        <circle cx="32" cy="18" r="2.5" fill={goldColor} />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={`font-bold tracking-tight leading-tight ${
            size === "sm"
              ? "text-sm"
              : size === "md"
              ? "text-base md:text-lg"
              : size === "lg"
              ? "text-xl md:text-2xl"
              : "text-2xl md:text-3xl"
          }`}
          style={{ color: primaryColor }}
        >
          {locale === "ar" ? "مصنع المقرن للأثاث" : "ALMUQRIN"}
        </span>
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-semibold tracking-wider uppercase ${
              size === "sm" ? "text-[10px]" : "text-xs"
            }`}
            style={{ color: accentColor }}
          >
            {locale === "ar" ? "والديكور • الرياض" : "FURNITURE & DECOR FACTORY"}
          </span>
          {showSubtitle && (
            <span
              className="text-[9px] font-medium tracking-widest uppercase opacity-75 hidden sm:inline"
              style={{ color: goldColor }}
            >
              EST. 1998
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href={`/${locale}`} aria-label="AlMuqrin Furniture Factory">
        {content}
      </Link>
    );
  }

  return content;
}

export function WatermarkOverlay({
  opacity = 0.22,
  className = "",
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden z-10 ${className}`}
      style={{ opacity }}
    >
      <div className="transform -rotate-12 border-2 border-white/40 px-6 py-3 rounded-lg bg-black/10 backdrop-blur-[2px] flex items-center gap-3">
        <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
          <rect x="6" y="6" width="52" height="52" rx="8" stroke="#b9c2cc" strokeWidth="2" />
          <path d="M18 42V25L27 34L32 29L37 34L46 25V42" stroke="#b9c2cc" strokeWidth="2.5" />
          <circle cx="32" cy="20" r="2.5" fill="#c5a467" />
        </svg>
        <div className="text-white text-xs font-bold tracking-widest uppercase">
          ALMUQRIN FACTORY • مصنع المقرن
        </div>
      </div>
    </div>
  );
}
