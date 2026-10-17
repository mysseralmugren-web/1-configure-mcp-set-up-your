import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ArrowLeft, ArrowRight, ShieldCheck, Award, Sparkles, Box } from "lucide-react";

interface HeroSectionProps {
  locale: Locale;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const dict = getDictionary(locale);
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-primary-950 text-white">
      {/* Background Architectural Photo with Navy/Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"
          alt="AlMuqrin Factory Luxury Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 transform scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/80 to-primary-900/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,164,103,0.15),rgba(255,255,255,0))]" />
      </div>

      {/* Grid Texture Layer */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* National Heritage Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-brand-gold/30 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-brand-gold" />
          <span className="text-xs sm:text-sm font-medium tracking-wide text-silver-light">
            {dict.hero.badge}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-md">
          {dict.hero.title}
        </h1>

        {/* Hero Subtitle */}
        <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-brand-gold mb-8 max-w-4xl mx-auto leading-relaxed">
          {dict.hero.subtitle}
        </p>

        {/* Hero Description */}
        <p className="text-base sm:text-lg lg:text-xl text-silver-light/90 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          {dict.hero.description}
        </p>

        {/* 3 Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-16">
          {/* Explore Our Work */}
          <Link
            href={`/${locale}/projects`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold/90 text-primary-950 font-bold text-sm tracking-wide shadow-xl shadow-brand-gold/25 hover:shadow-brand-gold/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>{dict.hero.ctaProjects}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>

          {/* Browse Models */}
          <Link
            href={`/${locale}/catalog`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm tracking-wide border border-white/20 backdrop-blur-md hover:border-white/30 transition-all"
          >
            <Box className="w-4 h-4 text-brand-gold" />
            <span>{dict.hero.ctaCatalog}</span>
          </Link>

          {/* Request a Quote */}
          <Link
            href={`/${locale}/request-quote`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-primary-800 hover:bg-primary-700 text-silver-light font-bold text-sm tracking-wide border border-silver/30 hover:text-white transition-all"
          >
            <span>{dict.hero.ctaQuote}</span>
          </Link>
        </div>

        {/* Live Factory Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-center justify-center gap-4">
            <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-start">
              <div className="text-2xl font-bold text-white font-mono">{dict.hero.stat1Number}</div>
              <div className="text-xs text-silver">{dict.hero.stat1Label}</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-center justify-center gap-4">
            <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold">
              <Box className="w-6 h-6" />
            </div>
            <div className="text-start">
              <div className="text-2xl font-bold text-white font-mono">{dict.hero.stat2Number}</div>
              <div className="text-xs text-silver">{dict.hero.stat2Label}</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-center justify-center gap-4">
            <div className="p-3 rounded-xl bg-brand-gold/15 text-brand-gold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-start">
              <div className="text-2xl font-bold text-white font-mono">{dict.hero.stat3Number}</div>
              <div className="text-xs text-silver">{dict.hero.stat3Label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
