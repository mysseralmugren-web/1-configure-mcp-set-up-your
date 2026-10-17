"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Camera, X, Maximize2 } from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

interface FactoryGalleryProps {
  locale: Locale;
}

const GALLERY_PHOTOS = [
  {
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    captionAr: "مركز ماكينات CNC الألمانية خماسية المحاور - قسم التشكيل الدقيق",
    captionEn: "5-Axis German CNC Machining Center - Precision Milling Division",
  },
  {
    url: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    captionAr: "خطوط القص الآلي الليزري وقص الأخشاب الصلبة",
    captionEn: "Precision Beam Saws & Laser Timber Cutting Line",
  },
  {
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    captionAr: "مستودع الأخشاب الصلبة الطبيعية وغرف التجفيف الحراري Kiln",
    captionEn: "Kiln-Seasoned Hardwood Lumber Storage Facility",
  },
  {
    url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    captionAr: "ورشة تنجيد المجالس الملكية وقص الجلود الطبيعية الإيطالية",
    captionEn: "Royal Majlis Upholstery & Italian Leather Tailoring Workshop",
  },
  {
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    captionAr: "غرف الدهان الآلي بالضغط الإيجابي الخالية تماماً من الغبار",
    captionEn: "Dust-Free Pressurized Polyurethane Spray Finishing Booths",
  },
  {
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    captionAr: "منطقة فحص الجودة النهائية والتغليف الخشبي المقاوم للشحن",
    captionEn: "SASO Final Quality Inspection & Protective Wooden Crating Bay",
  },
];

export function FactoryGallery({ locale }: FactoryGalleryProps) {
  const dict = getDictionary(locale);
  const isAr = locale === "ar";
  const [activePhoto, setActivePhoto] = useState<(typeof GALLERY_PHOTOS)[0] | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-surface relative" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-bold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>{isAr ? "جولة مصورة حقيقية" : "Verified Factory Gallery"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">
            {isAr ? "داخل مصنع المقرن بالرياض" : "Inside Our Riyadh Manufacturing Works"}
          </h2>
          <p className="mt-3 text-text-secondary text-base">
            {isAr
              ? "لقطات حقيقية من صالات التصنيع، خطوط التشكيل الآلي، وقسم التجميع الحرفي بالمدينة الصناعية الثانية."
              : "Genuine editorial photography from our 12,500 m² industrial facility in Riyadh 2nd Industrial City."}
          </p>
        </div>

        {/* Responsive Gallery Mosaic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_PHOTOS.map((photo, i) => (
            <div
              key={i}
              onClick={() => setActivePhoto(photo)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer bg-primary-950 border border-border shadow-sm hover:shadow-2xl transition-all"
            >
              <Image
                src={photo.url}
                alt={isAr ? photo.captionAr : photo.captionEn}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <WatermarkOverlay opacity={0.2} />

              {/* Caption and expand button */}
              <div className="absolute bottom-4 inset-x-4 flex items-end justify-between gap-3 text-white">
                <p className="text-xs sm:text-sm font-semibold line-clamp-2 drop-shadow-sm">
                  {isAr ? photo.captionAr : photo.captionEn}
                </p>
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md flex-shrink-0 group-hover:bg-brand-gold group-hover:text-primary-950 transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-primary-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="relative max-w-5xl w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 end-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={activePhoto.url}
                  alt={isAr ? activePhoto.captionAr : activePhoto.captionEn}
                  fill
                  className="object-contain"
                />
                <WatermarkOverlay opacity={0.3} />
              </div>

              <div className="p-4 sm:p-6 bg-primary-900 text-white text-center sm:text-start border-t border-white/10">
                <div className="text-sm sm:text-base font-bold">
                  {isAr ? activePhoto.captionAr : activePhoto.captionEn}
                </div>
                <div className="text-xs text-silver mt-1">
                  مصنع المقرن للأثاث والديكور • المدينة الصناعية الثانية - الرياض
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FactoryGallery;
