import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { FACTORY_STATS } from "@/lib/data/manufacturing";
import { Cpu, CheckCircle2, Truck, ArrowLeft, ArrowRight } from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

interface FactoryIntroductionProps {
  locale: Locale;
}

export function FactoryIntroduction({ locale }: FactoryIntroductionProps) {
  const dict = getDictionary(locale);
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-28 bg-surface-muted relative overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Media with Watermark */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border border-border">
              <Image
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                alt="AlMuqrin Factory CNC Machining Facility in Riyadh"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <WatermarkOverlay opacity={0.3} />

              {/* Floating Badge in corner */}
              <div className="absolute bottom-4 start-4 bg-primary-900/90 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10 shadow-lg">
                <div className="text-2xl font-bold font-mono text-brand-gold">1998</div>
                <div className="text-xs text-silver">
                  {isAr ? "أكثر من 26 عاماً من الريادة بالرياض" : "26+ Years of Riyadh Leadership"}
                </div>
              </div>
            </div>

            {/* Overlapping secondary photo */}
            <div className="hidden sm:block absolute -bottom-8 -end-8 w-1/2 aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                alt="Hardwood joinery craftsmanship"
                fill
                sizes="25vw"
                className="object-cover"
              />
              <WatermarkOverlay opacity={0.25} />
            </div>
          </div>

          {/* Right Column: Narrative & Key Pillars */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-bold mb-4">
              <span>{dict.intro.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-tight mb-6">
              {dict.intro.title}
            </h2>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-4">
              {dict.intro.p1}
            </p>

            <p className="text-text-secondary text-base leading-relaxed mb-8">
              {dict.intro.p2}
            </p>

            {/* 3 Pillars */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-surface border border-border">
                <div className="p-2.5 rounded-xl bg-primary-50 text-primary flex-shrink-0 mt-0.5">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-sm sm:text-base">
                    {dict.intro.feature1Title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1">
                    {dict.intro.feature1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-surface border border-border">
                <div className="p-2.5 rounded-xl bg-primary-50 text-primary flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-sm sm:text-base">
                    {dict.intro.feature2Title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1">
                    {dict.intro.feature2Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-surface border border-border">
                <div className="p-2.5 rounded-xl bg-primary-50 text-primary flex-shrink-0 mt-0.5">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-sm sm:text-base">
                    {dict.intro.feature3Title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1">
                    {dict.intro.feature3Desc}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-accent group transition-colors"
            >
              <span>{dict.common.learnMore}</span>
              <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FactoryIntroduction;
