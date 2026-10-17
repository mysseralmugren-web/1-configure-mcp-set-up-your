"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Locale } from "@/types";
import { FURNITURE_PRODUCTS } from "@/lib/data/products";
import { FURNITURE_CATEGORIES } from "@/lib/data/categories";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Search, Box, Filter, ArrowUpRight, Sparkles } from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

export default function CatalogPage() {
  const params = useParams();
  const locale = (params?.locale === "en" ? "en" : "ar") as Locale;
  const dict = getDictionary(locale);
  const isAr = locale === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [only3D, setOnly3D] = useState(false);

  const filteredProducts = useMemo(() => {
    return FURNITURE_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.categoryId !== selectedCategory) {
        return false;
      }
      // 3D filter
      if (only3D && !product.model3dUrl && product.modelType !== "procedural") {
        return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName =
          product.nameAr.toLowerCase().includes(query) ||
          product.nameEn.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesDesc =
          product.descriptionAr.toLowerCase().includes(query) ||
          product.descriptionEn.toLowerCase().includes(query);
        return matchesName || matchesSku || matchesDesc;
      }
      return true;
    });
  }, [selectedCategory, only3D, searchQuery]);

  return (
    <div className="pt-28 pb-20 bg-surface-muted" dir={isAr ? "rtl" : "ltr"}>
      {/* Header Banner */}
      <section className="bg-primary-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-gold/30 text-silver-light text-xs font-semibold mb-6">
            <Box className="w-4 h-4 text-brand-gold" />
            <span>{isAr ? "الكتالوج الرقمي للموديلات" : "Digital Furniture Catalog"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? "كتالوج موديلات وتصاميم مصنع المقرن" : "Bespoke Furniture Collections"}
          </h1>

          <p className="text-base sm:text-lg text-silver max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? "استكشف مجموعاتنا الحصرية من المكاتب الرئاسية، محطات العمل، طاولات المؤتمرات، والأجنحة السكنية المصممة بأعلى معايير الإتقان."
              : "Discover our exclusive presidential executive suites, collaborative workstations, conference tables, and architectural joinery."}
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Live Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-text-muted absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.common.search}
              className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-border bg-surface-muted focus:bg-white focus:border-primary text-xs outline-none transition-all"
            />
          </div>

          {/* 3D toggle filter */}
          <button
            onClick={() => setOnly3D(!only3D)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
              only3D
                ? "bg-brand-gold text-primary-950 border-brand-gold shadow-md shadow-brand-gold/20"
                : "bg-surface-muted text-text-secondary border-border hover:bg-white"
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>{isAr ? "الموديلات ثلاثية الأبعاد 3D فقط" : "3D Models Only"}</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-text-secondary hover:text-text-primary border border-border"
            }`}
          >
            {dict.common.allCategories} ({FURNITURE_PRODUCTS.length})
          </button>
          {FURNITURE_CATEGORIES.map((cat) => {
            const count = FURNITURE_PRODUCTS.filter((p) => p.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white text-text-secondary hover:text-text-primary border border-border"
                }`}
              >
                {isAr ? cat.nameAr : cat.nameEn} ({count})
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl border border-border text-center my-8">
            <Box className="w-12 h-12 text-silver mx-auto mb-4" />
            <h3 className="text-lg font-bold text-text-primary mb-2">
              {isAr ? "لم يتم العثور على موديلات مطابقة" : "No Matching Products Found"}
            </h3>
            <p className="text-xs text-text-secondary mb-6">
              {isAr ? "جرب تعديل كلمات البحث أو تصفية الأقسام." : "Try adjusting your search query or filters."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setOnly3D(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold"
            >
              {isAr ? "إعادة ضبط التصفية" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
            {filteredProducts.map((product) => (
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

                {/* Details */}
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
        )}
      </section>
    </div>
  );
}
