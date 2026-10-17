import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale } from "@/types";
import { FACTORY_PROJECTS } from "@/lib/data/projects";
import { FACTORY_SERVICES } from "@/lib/data/services";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  Building2,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  FileText,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Wrench,
  Sparkles,
} from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

interface ProjectDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["ar", "en"]) {
    for (const project of FACTORY_PROJECTS) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: ProjectDetailProps) {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const project = FACTORY_PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${isAr ? project.titleAr : project.titleEn} | مصنع المقرن`,
    description: isAr ? project.descriptionAr : project.descriptionEn,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { locale, slug } = await params;
  const validLocale = (locale === "en" ? "en" : "ar") as Locale;
  const dict = getDictionary(validLocale);
  const isAr = validLocale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const project = FACTORY_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const relatedServices = FACTORY_SERVICES.filter((s) =>
    project.relatedServiceSlugs?.includes(s.slug)
  );

  return (
    <div className="pt-28 pb-20 bg-surface-muted" dir={isAr ? "rtl" : "ltr"}>
      {/* Header Banner */}
      <section className="bg-primary-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={project.coverImage}
            alt={isAr ? project.titleAr : project.titleEn}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-950/85" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-gold/30 text-silver-light text-xs font-semibold mb-6">
              <Building2 className="w-4 h-4 text-brand-gold" />
              <span>{isAr ? project.categoryLabelAr : project.categoryLabelEn}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              {isAr ? project.titleAr : project.titleEn}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-silver mb-8 font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>{isAr ? project.locationAr : project.locationEn}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-gold" />
                <span>{project.completionDate}</span>
              </span>
              {project.areaM2 && (
                <>
                  <span>•</span>
                  <span>{project.areaM2} m²</span>
                </>
              )}
            </div>

            <Link
              href={`/${validLocale}/request-quote?projectRef=${project.slug}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-gold text-primary-950 font-bold text-xs tracking-wide shadow-xl shadow-brand-gold/20 hover:scale-[1.02] transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>{dict.common.requestSimilarQuote}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Gallery and Breakdown */}
          <div className="lg:col-span-8 space-y-12">
            {/* Project Overview */}
            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                {isAr ? "نبذة عن المشروع والتنفيذ" : "Project Overview & Execution"}
              </h2>
              <p className="text-text-secondary text-base leading-relaxed">
                {isAr ? project.descriptionAr : project.descriptionEn}
              </p>
            </div>

            {/* Scope of Work */}
            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-gold" />
                <span>{dict.common.scopeOfWork}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(isAr ? project.scopeAr : project.scopeEn)?.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-surface-muted border border-border">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Project Photography Gallery with Watermark */}
            {project.galleryImages.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-4">
                  {isAr ? "صور المشروع المنفذ" : "Completed Project Photography"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.galleryImages.map((img, i) => (
                    <div key={i} className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-primary-950 border border-border shadow-sm">
                      <Image
                        src={img}
                        alt="Project gallery photo"
                        fill
                        className="object-cover"
                      />
                      <WatermarkOverlay opacity={0.2} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Manufacturing & Installation Photos */}
            {project.manufacturingImages && project.manufacturingImages.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-brand-gold" />
                  <span>{isAr ? "لقطات من صالات التصنيع والتركيب" : "Factory Manufacturing & Site Installation"}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.manufacturingImages.map((img, i) => (
                    <div key={i} className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-primary-950 border border-border shadow-sm">
                      <Image
                        src={img}
                        alt="Manufacturing photo"
                        fill
                        className="object-cover"
                      />
                      <WatermarkOverlay opacity={0.2} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Key Project Metadata & CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-border shadow-sm sticky top-28 space-y-6">
              <h3 className="text-lg font-bold text-text-primary border-b border-border pb-3">
                {isAr ? "بيانات المشروع" : "Project Summary"}
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-text-muted mb-0.5">{dict.common.client}</div>
                  <div className="font-bold text-text-primary text-sm">
                    {isAr ? project.clientAr : project.clientEn}
                  </div>
                </div>

                <div>
                  <div className="text-text-muted mb-0.5">{dict.common.location}</div>
                  <div className="font-bold text-text-primary text-sm">
                    {isAr ? project.locationAr : project.locationEn}
                  </div>
                </div>

                <div>
                  <div className="text-text-muted mb-0.5">{dict.common.completionYear}</div>
                  <div className="font-bold text-text-primary text-sm font-mono">
                    {project.completionDate}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Link
                  href={`/${validLocale}/request-quote?projectRef=${project.slug}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>{dict.common.requestSimilarQuote}</span>
                </Link>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <div className="text-xs font-bold text-text-secondary uppercase mb-3">
                    {dict.common.relatedServices}
                  </div>
                  <div className="space-y-2">
                    {relatedServices.map((srv) => (
                      <Link
                        key={srv.id}
                        href={`/${validLocale}/services/${srv.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-muted text-xs font-semibold text-text-primary group transition-colors"
                      >
                        <span className="line-clamp-1 group-hover:text-primary">
                          {isAr ? srv.titleAr : srv.titleEn}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-primary flex-shrink-0" />
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
