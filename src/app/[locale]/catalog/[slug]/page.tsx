import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale } from "@/types";
import { FURNITURE_PRODUCTS } from "@/lib/data/products";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { FurnitureViewerDynamic } from "@/components/3d/FurnitureViewerDynamic";
import {
  Box,
  Ruler,
  Layers,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2,
  FileText,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

interface ProductDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["ar", "en"]) {
    for (const product of FURNITURE_PRODUCTS) {
      params.push({ locale, slug: product.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: ProductDetailProps) {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const product = FURNITURE_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${isAr ? product.nameAr : product.nameEn} | ${product.sku}`,
    description: isAr ? product.descriptionAr : product.descriptionEn,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { locale, slug } = await params;
  const validLocale = (locale === "en" ? "en" : "ar") as Locale;
  const dict = getDictionary(validLocale);
  const isAr = validLocale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const product = FURNITURE_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  // Related products from the same category
  const relatedProducts = FURNITURE_PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 3);

  const has3D = product.model3dUrl || product.modelType === "procedural" || product.dimensions;

  return (
    <div className="pt-28 pb-20 bg-surface-muted" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-8 font-medium">
          <Link href={`/${validLocale}`} className="hover:text-primary">
            {dict.nav.home}
          </Link>
          <span>/</span>
          <Link href={`/${validLocale}/catalog`} className="hover:text-primary">
            {dict.nav.catalog}
          </Link>
          <span>/</span>
          <span className="text-text-primary font-bold">
            {isAr ? product.nameAr : product.nameEn}
          </span>
        </div>

        {/* Top Product Section: 3D / Gallery + Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Visual Showcase (3D Viewer or High-Res Photography) */}
          <div className="lg:col-span-7 space-y-4">
            {has3D ? (
              <FurnitureViewerDynamic
                product={product}
                locale={validLocale}
                height="h-[460px] sm:h-[540px] lg:h-[580px]"
              />
            ) : (
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-primary-950 border border-border shadow-2xl">
                <Image
                  src={product.images[0]}
                  alt={isAr ? product.nameAr : product.nameEn}
                  fill
                  className="object-cover"
                />
                <WatermarkOverlay opacity={0.25} />
                <div className="absolute top-4 start-4 bg-primary-900/90 text-silver px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 border border-white/10">
                  <AlertCircle className="w-4 h-4 text-brand-gold" />
                  <span>{dict.common.modelUnavailable}</span>
                </div>
              </div>
            )}

            {/* Photo Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-[16/10] rounded-xl overflow-hidden bg-primary-950 border border-border shadow-sm"
                  >
                    <Image
                      src={img}
                      alt="Product variant"
                      fill
                      className="object-cover"
                    />
                    <WatermarkOverlay opacity={0.2} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info & Action Box */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  {isAr ? product.categoryNameAr : product.categoryNameEn}
                </span>
                <span className="text-xs font-mono font-bold bg-surface-muted px-2.5 py-1 rounded-md text-text-primary border border-border">
                  {product.sku}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mb-4">
                {isAr ? product.nameAr : product.nameEn}
              </h1>

              <p className="text-text-secondary text-sm leading-relaxed">
                {isAr ? product.descriptionAr : product.descriptionEn}
              </p>
            </div>

            {/* Verified Dimensions Card */}
            {product.dimensions && (
              <div className="p-4 rounded-2xl bg-surface-muted border border-border">
                <div className="flex items-center gap-2 text-xs font-bold text-text-primary mb-3">
                  <Ruler className="w-4 h-4 text-brand-gold" />
                  <span>{dict.common.dimensions}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="bg-white p-2 rounded-xl border border-border">
                    <div className="text-[10px] font-sans text-text-secondary">{isAr ? "العرض" : "Width"}</div>
                    <div className="text-sm font-bold text-primary">{product.dimensions.width} cm</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-border">
                    <div className="text-[10px] font-sans text-text-secondary">{isAr ? "العمق" : "Depth"}</div>
                    <div className="text-sm font-bold text-primary">{product.dimensions.depth} cm</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-border">
                    <div className="text-[10px] font-sans text-text-secondary">{isAr ? "الارتفاع" : "Height"}</div>
                    <div className="text-sm font-bold text-primary">{product.dimensions.height} cm</div>
                  </div>
                </div>
              </div>
            )}

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-muted border border-border flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-text-muted">{dict.common.leadTime}</div>
                  <div className="font-bold text-text-primary">
                    {dict.common.leadTimeVal.replace("{weeks}", (product.leadTimeWeeks || 4).toString())}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-muted border border-border flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-text-muted">{isAr ? "الضمان" : "Warranty"}</div>
                  <div className="font-bold text-text-primary">{isAr ? "10 سنوات مصنعية" : "10-Year Factory"}</div>
                </div>
              </div>
            </div>

            {/* Request a Quote CTA */}
            <div className="pt-2">
              <Link
                href={`/${validLocale}/request-quote?product=${product.slug}`}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold/90 text-primary-950 font-bold text-sm text-center shadow-xl shadow-brand-gold/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>{dict.common.requestProductQuote}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications & Materials Detailed Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Materials */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-sm">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-gold" />
              <span>{dict.common.materials}</span>
            </h2>
            <div className="space-y-2.5">
              {(isAr ? product.materials : product.materialsEn)?.map((mat, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-muted border border-border text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary font-medium">{mat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-sm">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-gold" />
              <span>{dict.common.features}</span>
            </h2>
            <div className="space-y-2.5">
              {(isAr ? product.featuresAr : product.featuresEn)?.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-muted border border-border text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              {dict.common.relatedProducts}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="group rounded-2xl overflow-hidden bg-white border border-border hover:border-primary-300 shadow-sm transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-primary-950">
                    <Image
                      src={rel.images[0]}
                      alt={isAr ? rel.nameAr : rel.nameEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <WatermarkOverlay opacity={0.2} />
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-mono text-text-muted mb-1">{rel.sku}</div>
                    <h3 className="text-sm font-bold text-text-primary line-clamp-1 mb-2">
                      {isAr ? rel.nameAr : rel.nameEn}
                    </h3>
                    <Link
                      href={`/${validLocale}/catalog/${rel.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                      <span>{dict.common.viewDetails}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
