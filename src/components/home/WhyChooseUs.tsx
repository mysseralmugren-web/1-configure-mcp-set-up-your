import React from "react";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ShieldCheck, Factory, Compass, Gem, Award, CheckCircle } from "lucide-react";

interface WhyChooseUsProps {
  locale: Locale;
}

export function WhyChooseUs({ locale }: WhyChooseUsProps) {
  const dict = getDictionary(locale);
  const isAr = locale === "ar";

  const icons = [Factory, ShieldCheck, Compass, Gem];

  return (
    <section className="py-20 lg:py-28 bg-surface-muted relative overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5 text-brand-gold" />
            <span>{dict.whyUs.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">
            {dict.whyUs.title}
          </h2>
          <p className="mt-3 text-text-secondary text-base sm:text-lg">
            {isAr
              ? "نجمع بين عراقة الحرفة الوطنية وأحدث خطوط الإنتاج الرقمية لنقدم شريكاً موثوقاً لكبرى المشروعات."
              : "Merging national craftsmanship with high-precision digital machinery to be the trusted partner for major developments."}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dict.whyUs.reasons.map((reason, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={index}
                className="p-8 rounded-3xl bg-white border border-border hover:border-primary-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mb-6">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-lg font-bold text-text-primary mb-3 leading-snug">
                  {reason.title}
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed flex-grow">
                  {reason.desc}
                </p>

                <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs font-semibold text-brand-gold">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{isAr ? "معايير الجودة الصارمة" : "Guaranteed Benchmark"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
