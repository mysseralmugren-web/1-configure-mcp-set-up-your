import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/types";
import { MANUFACTURING_STEPS } from "@/lib/data/manufacturing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Cog, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

interface ManufacturingProcessProps {
  locale: Locale;
}

export function ManufacturingProcess({ locale }: ManufacturingProcessProps) {
  const dict = getDictionary(locale);
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-28 bg-surface-muted relative overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-bold mb-3">
              <Cog className="w-3.5 h-3.5 animate-spin-slow" />
              <span>{isAr ? "الدقة الصناعية والتكنولوجيا الألمانية" : "Industrial Precision & German Tech"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">
              {isAr ? "مراحل التصنيع في مصنع المقرن" : "Our End-to-End Manufacturing Workflow"}
            </h2>
            <p className="mt-3 text-text-secondary text-base">
              {isAr
                ? "من ألواح الأخشاب الخام إلى روائع معمارية متكاملة عبر 8 مراحل خاضعة لرقابة الجودة الصارمة."
                : "From raw certified timber to architectural masterpieces across 8 rigorous stages."}
            </p>
          </div>

          <Link
            href={`/${locale}/manufacturing`}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-accent group transition-colors"
          >
            <span>{isAr ? "استكشف خطوط الإنتاج والآلات" : "Explore Factory Machinery"}</span>
            <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Highlighted Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MANUFACTURING_STEPS.slice(0, 4).map((step) => (
            <div
              key={step.step}
              className="group relative rounded-3xl overflow-hidden bg-white border border-border hover:border-primary-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-primary-950">
                <Image
                  src={step.image}
                  alt={isAr ? step.titleAr : step.titleEn}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <WatermarkOverlay opacity={0.2} />

                {/* Step badge */}
                <div className="absolute top-3 start-3 w-8 h-8 rounded-full bg-brand-gold text-primary-950 font-extrabold text-sm flex items-center justify-center shadow-lg">
                  0{step.step}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                  {isAr ? step.titleAr : step.titleEn}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 mb-4 flex-grow">
                  {isAr ? step.descriptionAr : step.descriptionEn}
                </p>

                <div className="pt-3 border-t border-border flex items-center gap-2 text-[11px] font-semibold text-primary">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span className="line-clamp-1">{isAr ? step.machineryAr : step.machineryEn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ManufacturingProcess;
