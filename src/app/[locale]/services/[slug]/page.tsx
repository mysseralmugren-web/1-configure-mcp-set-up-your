import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale } from "@/types";
import { FACTORY_SERVICES } from "@/lib/data/services";
import { FURNITURE_PRODUCTS } from "@/lib/data/products";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  Layers,
  CheckCircle2,
  Cpu,
  FileText,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Box,
} from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

interface ServiceDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["ar", "en"]) {
    for (const service of FACTORY_SERVICES) {
      params.push({ locale, slug: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: ServiceDetailProps) {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const service = FACTORY_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: isAr ? service.titleAr : service.titleEn,
    description: isAr ? service.descriptionAr : service.descriptionEn,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { locale, slug } = await params;
  const validLocale = (locale === "en" ? "en" : "ar") as Locale;
  const dict = getDictionary(validLocale);
  const isAr = validLocale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const service = FACTORY_SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  // Related products
  const relatedProducts = FURNITURE_PRODUCTS.filter(
    (p) => service.relatedCategoryIds?.includes(p.categoryId)
  ).slice(0, 4);

  return (
    <div className="pt-28 pb-20 bg-surface-muted" dir={isAr ? "rtl" : "ltr"}>
      {/* Header Banner */}
      <section className="bg-primary-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src={service.coverImage}
            alt={isAr ? service.titleAr : service.titleEn}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-950/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-gold/30 text-silver-light text-xs font-semibold mb-6">
              <Layers className="w-4 h-4 text-brand-gold" />
              <span>DIVISION 0{service.order}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              {isAr ? service.titleAr : service.titleEn}
            </h1>

            <p className="text-xl sm:text-2xl text-brand-gold font-medium mb-6">
              {isAr ? service.subtitleAr : service.subtitleEn}
            </p>

            <p className="text-silver text-base leading-relaxed mb-8">
              {isAr ? service.descriptionAr : service.descriptionEn}
            </p>

            <Link
              href={`/${validLocale}/request-quote?service=${service.slug}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-gold text-primary-950 font-bold text-xs tracking-wide shadow-xl shadow-brand-gold/20 hover:scale-[1.02] transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>{dict.common.requestQuote}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content & Specs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details, Capabilities, and Specs */}
          <div className="lg:col-span-8 space-y-10">
            {/* Gallery Images with Watermark */}
            {service.galleryImages.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-4">
                  {isAr ? "معرض أعمال ولقطات التنفيذ" : "Execution & Facility Gallery"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {service.galleryImages.map((imgUrl, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-primary-950 border border-border shadow-sm">
                      <Image
                        src={imgUrl}
                        alt="Service gallery photo"
                        fill
                        className="object-cover"
                      />
                      <WatermarkOverlay opacity={0.2} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-brand-gold" />
                <span>{isAr ? "المواصفات الفنية والمعيارية" : "Technical & Engineering Specifications"}</span>
              </h2>
              <div className="space-y-3.5">
                {(isAr ? service.technicalSpecsAr : service.technicalSpecsEn)?.map((spec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-muted border border-border">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary leading-relaxed font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industrial Capabilities */}
            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-brand-gold" />
                <span>{isAr ? "القدرات الصناعية والتخصيص" : "Industrial Capabilities & Customization"}</span>
              </h2>
              <div className="space-y-3.5">
                {(isAr ? service.capabilitiesAr : service.capabilitiesEn)?.map((cap, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-muted border border-border">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <span className="text-sm text-text-secondary leading-relaxed font-medium">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: RFQ Quick Card & Related Models */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-border shadow-sm sticky top-28">
              <h3 className="text-lg font-bold text-text-primary mb-2">
                {isAr ? "طلب تسعير لهذه الخدمة" : "Request RFQ for this Service"}
              </h3>
              <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                {isAr
                  ? "أرسل تفاصيل مشروعك وسيقوم مهندس القسم بدراسة المخططات وتقديم عرض فني ومالي."
                  : "Submit your drawings and our division engineer will prepare an itemized commercial proposal."}
              </p>
              <Link
                href={`/${validLocale}/request-quote?service=${service.slug}`}
                className="w-full py-3.5 px-4 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>{dict.common.requestQuote}</span>
              </Link>

              {/* Related Catalog Products */}
              {relatedProducts.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">
                    {dict.common.relatedProducts}
                  </h4>
                  <div className="space-y-3">
                    {relatedProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/${validLocale}/catalog/${p.slug}`}
                        className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-muted transition-colors border border-transparent hover:border-border"
                      >
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-primary-950 flex-shrink-0">
                          <Image
                            src={p.images[0]}
                            alt={isAr ? p.nameAr : p.nameEn}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-grow">
                          <div className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                            {isAr ? p.nameAr : p.nameEn}
                          </div>
                          <div className="text-[10px] text-text-muted font-mono">{p.sku}</div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-primary flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
