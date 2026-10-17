"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Locale } from "@/types";
import { FURNITURE_PRODUCTS } from "@/lib/data/products";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { FurnitureViewerDynamic } from "@/components/3d/FurnitureViewerDynamic";
import { Box, Layers, Ruler, Sparkles, Check, ArrowLeft, ArrowRight } from "lucide-react";

interface ThreeDShowcaseProps {
  locale: Locale;
}

export function ThreeDShowcase({ locale }: ThreeDShowcaseProps) {
  const dict = getDictionary(locale);
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  // Choose from products that have 3D models (prod-001, prod-002)
  const [selectedProductId, setSelectedProductId] = useState<string>("prod-001");
  const currentProduct =
    FURNITURE_PRODUCTS.find((p) => p.id === selectedProductId) || FURNITURE_PRODUCTS[0];

  return (
    <section className="py-20 lg:py-28 bg-primary-950 text-white relative overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      {/* Decorative background glow */}
      <div className="absolute top-1/2 -start-48 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -end-48 w-96 h-96 bg-primary-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-gold/30 text-silver-light text-xs font-semibold mb-4">
            <Box className="w-4 h-4 text-brand-gold" />
            <span>{dict.threeD.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {dict.threeD.title}
          </h2>

          <p className="text-silver text-base sm:text-lg leading-relaxed">
            {dict.threeD.desc}
          </p>

          {/* Model Switcher Pills */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setSelectedProductId("prod-001")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedProductId === "prod-001"
                  ? "bg-brand-gold text-primary-950 shadow-lg shadow-brand-gold/20"
                  : "bg-white/10 text-silver hover:text-white border border-white/10"
              }`}
            >
              {isAr ? "مكتب المصمك التنفيذي الرئاسي" : "Al-Masmak Executive Desk"}
            </button>
            <button
              onClick={() => setSelectedProductId("prod-002")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedProductId === "prod-002"
                  ? "bg-brand-gold text-primary-950 shadow-lg shadow-brand-gold/20"
                  : "bg-white/10 text-silver hover:text-white border border-white/10"
              }`}
            >
              {isAr ? "طاولة اجتماعات طويق الكبرى" : "Tuwaiq Boardroom Table"}
            </button>
          </div>
        </div>

        {/* 3D Viewer & Technical Callouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Canvas Box */}
          <div className="lg:col-span-8">
            <FurnitureViewerDynamic
              product={currentProduct}
              locale={locale}
              height="h-[460px] sm:h-[540px] lg:h-[600px]"
            />
          </div>

          {/* Specification Details Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-primary-900/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
              <span className="text-brand-gold text-xs font-semibold uppercase tracking-wider block mb-1">
                {isAr ? currentProduct.categoryNameAr : currentProduct.categoryNameEn}
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">
                {isAr ? currentProduct.nameAr : currentProduct.nameEn}
              </h3>
              <p className="text-xs sm:text-sm text-silver leading-relaxed mb-6">
                {isAr ? currentProduct.descriptionAr : currentProduct.descriptionEn}
              </p>

              {/* Verified Dimensions */}
              {currentProduct.dimensions && (
                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-silver-light mb-2">
                    <Ruler className="w-4 h-4 text-brand-gold" />
                    <span>{dict.common.verifiedDimensions}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-white/10 font-mono text-sm">
                    <div>
                      <div className="text-[10px] text-silver font-sans">{isAr ? "العرض" : "Width"}</div>
                      <div className="font-bold text-white">{currentProduct.dimensions.width} cm</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-silver font-sans">{isAr ? "العمق" : "Depth"}</div>
                      <div className="font-bold text-white">{currentProduct.dimensions.depth} cm</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-silver font-sans">{isAr ? "الارتفاع" : "Height"}</div>
                      <div className="font-bold text-white">{currentProduct.dimensions.height} cm</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Materials summary */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-bold text-silver-light flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{dict.common.materials}</span>
                </div>
                {(isAr ? currentProduct.materials : currentProduct.materialsEn)?.slice(0, 3).map((mat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-silver">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{mat}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2.5">
                <Link
                  href={`/${locale}/request-quote?product=${currentProduct.slug}`}
                  className="w-full py-3 px-4 rounded-xl bg-brand-gold text-primary-950 font-bold text-xs text-center shadow-lg shadow-brand-gold/20 hover:brightness-110 transition-all"
                >
                  {dict.common.requestProductQuote}
                </Link>
                <Link
                  href={`/${locale}/catalog/${currentProduct.slug}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-silver hover:text-white font-semibold text-xs text-center border border-white/10 transition-all"
                >
                  {dict.common.viewDetails}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThreeDShowcase;
