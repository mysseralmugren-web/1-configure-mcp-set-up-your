"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/types";
import { FURNITURE_PRODUCTS } from "@/lib/data/products";
import { FURNITURE_CATEGORIES } from "@/lib/data/categories";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ArrowLeft, ArrowRight, Box, Sparkles, Layers, ArrowUpRight } from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

interface FeaturedFurnitureProps {
  locale: Locale;
}

export function FeaturedFurniture({ locale }: FeaturedFurnitureProps) {
  const dict = getDictionary(locale);
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts =
    selectedCategory === "all"
      ? FURNITURE_PRODUCTS
      : FURNITURE_PRODUCTS.filter((p) => p.categoryId === selectedCategory);

  return (
    <section className="py-20 lg:py-28 bg-surface-muted relative" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>{isAr ? "كتالوج الموديلات المصنعية" : "Digital Furniture Collection"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">
              {isAr ? "موديلات ومجموعات مصنع المقرن" : "Bespoke Furniture Collections"}
            </h2>
            <p className="mt-3 text-text-secondary text-base max-w-2xl">
              {isAr
                ? "نماذج وتصاميم هندسية حصرية مصنعة بأعلى درجات الإتقان والمطابقة للمواصفات الفنية."
                : "Engineered collections crafted with architectural precision, premium hardwoods, and verified dimensions."}
            </p>
          </div>

          <Link
            href={`/${locale}/catalog`}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-accent group transition-colors"
          >
            <span>{dict.common.browseCatalog}</span>
            <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-surface text-text-secondary hover:text-text-primary border border-border"
            }`}
          >
            {dict.common.allCategories}
          </button>
          {FURNITURE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-surface text-text-secondary hover:text-text-primary border border-border"
              }`}
            >
              {isAr ? cat.nameAr : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-border hover:border-primary-300 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Product Photo with Watermark */}
              <div className="relative aspect-square overflow-hidden bg-primary-950">
                <Image
                  src={product.images[0]}
                  alt={isAr ? product.nameAr : product.nameEn}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <WatermarkOverlay opacity={0.2} />

                {/* Badges Overlay */}
                <div className="absolute top-3 start-3 flex flex-col gap-1.5 z-20">
                  <span className="bg-primary-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-white text-[10px] font-mono font-semibold border border-white/10">
                    {product.sku}
                  </span>
                  {product.model3dUrl && (
                    <span className="inline-flex items-center gap-1 bg-brand-gold text-primary-950 px-2 py-0.5 rounded-md text-[10px] font-bold">
                      <Box className="w-3 h-3" />
                      <span>3D Ready</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-[11px] font-semibold text-brand-gold uppercase tracking-wider mb-1">
                  {isAr ? product.categoryNameAr : product.categoryNameEn}
                </div>

                <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1 mb-2">
                  {isAr ? product.nameAr : product.nameEn}
                </h3>

                <p className="text-xs text-text-secondary line-clamp-2 mb-4 flex-grow leading-relaxed">
                  {isAr ? product.descriptionAr : product.descriptionEn}
                </p>

                {/* Dimensions Snippet */}
                {product.dimensions && (
                  <div className="text-[11px] font-mono text-text-muted bg-surface-muted px-2.5 py-1.5 rounded-lg mb-4 flex items-center justify-between border border-border">
                    <span className="text-[10px] font-sans font-semibold text-text-secondary">
                      {dict.common.dimensions}:
                    </span>
                    <span>
                      {product.dimensions.width}×{product.dimensions.depth}×{product.dimensions.height} {product.dimensions.unit}
                    </span>
                  </div>
                )}

                {/* Footer action */}
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/${locale}/catalog/${product.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-primary-accent"
                  >
                    <span>{dict.common.viewDetails}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/${locale}/request-quote?product=${product.slug}`}
                    className="text-xs font-semibold text-brand-gold hover:underline"
                  >
                    {dict.common.requestQuote}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedFurniture;
