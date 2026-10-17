import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/types";
import { FACTORY_SERVICES } from "@/lib/data/services";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ArrowLeft, ArrowRight, Layers, ArrowUpRight } from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

interface ServicesGridProps {
  locale: Locale;
}

export function ServicesGrid({ locale }: ServicesGridProps) {
  const dict = getDictionary(locale);
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-28 bg-surface relative" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-bold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>{isAr ? "خدمات التصنيع والحلول المتكاملة" : "Manufacturing Solutions & Services"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">
              {isAr ? "مجالات التصنيع في مصنع المقرن" : "Our Specialized Manufacturing Capabilities"}
            </h2>
            <p className="mt-4 text-text-secondary text-base sm:text-lg">
              {isAr
                ? "نقدم 10 خطوط تصنيع متخصصة تلبي كافة احتياجات المشاريع التجارية، الأبراج الإدارية، والقصور السكنية."
                : "Offering 10 specialized manufacturing divisions tailored for commercial developments, corporate towers, and luxury estates."}
            </p>
          </div>

          <Link
            href={`/${locale}/services`}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-accent group transition-colors"
          >
            <span>{dict.common.viewAll}</span>
            <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FACTORY_SERVICES.map((service, index) => {
            const isFeatured = index === 0 || index === 1;
            return (
              <div
                key={service.id}
                className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-border hover:border-primary-300 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image Aspect Box with Watermark */}
                <div className="relative aspect-[16/10] overflow-hidden bg-primary-950">
                  <Image
                    src={service.coverImage}
                    alt={isAr ? service.titleAr : service.titleEn}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <WatermarkOverlay opacity={0.2} />

                  {/* Order Number Badge */}
                  <div className="absolute top-4 start-4 bg-primary-900/85 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-mono font-bold border border-white/10">
                    0{service.order}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1 mb-2">
                    {isAr ? service.titleAr : service.titleEn}
                  </h3>

                  <p className="text-xs font-semibold text-brand-gold uppercase tracking-wider mb-3">
                    {isAr ? service.subtitleAr : service.subtitleEn}
                  </p>

                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {isAr ? service.descriptionAr : service.descriptionEn}
                  </p>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-semibold text-text-secondary">
                      {isAr ? "مواصفات فندقية ومعيارية" : "SASO & High-Spec Standard"}
                    </span>
                    <Link
                      href={`/${locale}/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-accent"
                    >
                      <span>{dict.common.viewDetails}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;
