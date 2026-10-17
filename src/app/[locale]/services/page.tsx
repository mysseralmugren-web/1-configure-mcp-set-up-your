import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/types";
import { FACTORY_SERVICES } from "@/lib/data/services";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Layers, ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "خدمات التصنيع والحلول المتكاملة" : "Manufacturing Services & Solutions",
    description: isAr
      ? "استكشف 10 خطوط تصنيع متخصصة في مصنع المقرن للأثاث والديكور بالرياض."
      : "Explore 10 specialized manufacturing divisions at AlMuqrin Furniture Factory in Riyadh.",
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === "en" ? "en" : "ar") as Locale;
  const dict = getDictionary(validLocale);
  const isAr = validLocale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-28 pb-20 bg-surface-muted" dir={isAr ? "rtl" : "ltr"}>
      {/* Header Banner */}
      <section className="bg-primary-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-gold/30 text-silver-light text-xs font-semibold mb-6">
            <Layers className="w-4 h-4 text-brand-gold" />
            <span>{isAr ? "القدرات التصنيعية الشاملة" : "Full Manufacturing Capabilities"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            {isAr ? "خدمات وخطوط تصنيع مصنع المقرن" : "Our Manufacturing Services & Divisions"}
          </h1>

          <p className="text-lg sm:text-xl text-silver max-w-3xl mx-auto leading-relaxed">
            {isAr
              ? "نقدم حلولاً تصنيعية متكاملة تغطي كافة متطلبات المشاريع الكبرى: من الأثاث المكتبي ومحطات العمل، إلى الأجنحة الرئاسية، التكسيات الخشبية، والمجالس الملكية."
              : "Comprehensive manufacturing solutions tailored for corporate developments, luxury residences, and monumental boardrooms."}
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACTORY_SERVICES.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-border hover:border-primary-300 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-primary-950">
                <Image
                  src={service.coverImage}
                  alt={isAr ? service.titleAr : service.titleEn}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <WatermarkOverlay opacity={0.2} />

                <div className="absolute top-4 start-4 bg-primary-900/90 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-xs font-mono font-bold border border-white/10">
                  DIVISION 0{service.order}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors mb-2">
                  {isAr ? service.titleAr : service.titleEn}
                </h2>

                <p className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-4">
                  {isAr ? service.subtitleAr : service.subtitleEn}
                </p>

                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                  {isAr ? service.descriptionAr : service.descriptionEn}
                </p>

                {/* Technical Specs Preview */}
                <div className="mb-6 space-y-2 bg-surface-muted p-4 rounded-2xl border border-border">
                  <div className="text-[11px] font-bold text-text-primary uppercase tracking-wider">
                    {dict.common.specifications}
                  </div>
                  {(isAr ? service.technicalSpecsAr : service.technicalSpecsEn)?.slice(0, 2).map((spec, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/${validLocale}/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-accent"
                  >
                    <span>{dict.common.viewDetails}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/${validLocale}/request-quote?service=${service.slug}`}
                    className="text-xs font-bold text-brand-gold hover:underline"
                  >
                    {dict.common.requestQuote}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
