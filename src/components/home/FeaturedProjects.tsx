"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/types";
import { FACTORY_PROJECTS } from "@/lib/data/projects";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ArrowLeft, ArrowRight, Building2, MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

interface FeaturedProjectsProps {
  locale: Locale;
}

export function FeaturedProjects({ locale }: FeaturedProjectsProps) {
  const dict = getDictionary(locale);
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredProjects =
    activeTab === "all"
      ? FACTORY_PROJECTS
      : FACTORY_PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 lg:py-28 bg-surface relative" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-bold mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>{isAr ? "سجل الإنجاز والمشاريع" : "Completed Project Portfolio"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">
              {isAr ? "أعمالنا ومشاريعنا الكبرى المنجزة" : "Prestige Completed Projects"}
            </h2>
            <p className="mt-3 text-text-secondary text-base max-w-2xl">
              {isAr
                ? "مشاريع حقيقية تم تصنيعها وتنفيذها وفق أعلى المعايير للمقرات الحكومية، الأبراج الإدارية، والقصور الملكية."
                : "Real turnkey projects manufactured and delivered for diplomatic venues, executive towers, and royal residences."}
            </p>
          </div>

          <Link
            href={`/${locale}/projects`}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-accent group transition-colors"
          >
            <span>{dict.common.exploreProjects}</span>
            <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: "all", labelAr: "كافة المشاريع", labelEn: "All Projects" },
            { id: "executive", labelAr: "مقرات وأجنحة تنفيذية", labelEn: "Executive Suites" },
            { id: "residential", labelAr: "قصور ومساكن ملكية", labelEn: "Royal Residences" },
            { id: "hospitality", labelAr: "ضيافة وفنادق", labelEn: "Hospitality" },
            { id: "commercial", labelAr: "مشاريع تجارية", labelEn: "Commercial" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-surface-muted text-text-secondary hover:text-text-primary border border-border"
              }`}
            >
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-border hover:border-primary-300 shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* Cover Photo with Watermark */}
              <div className="relative aspect-[16/11] overflow-hidden bg-primary-950">
                <Image
                  src={project.coverImage}
                  alt={isAr ? project.titleAr : project.titleEn}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <WatermarkOverlay opacity={0.2} />

                {/* Location and Category badges */}
                <div className="absolute top-4 start-4 flex items-center gap-2">
                  <span className="bg-primary-900/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-semibold border border-white/10">
                    {isAr ? project.categoryLabelAr : project.categoryLabelEn}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-text-muted mb-2 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{isAr ? project.locationAr : project.locationEn}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{project.completionDate}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 mb-3">
                  {isAr ? project.titleAr : project.titleEn}
                </h3>

                <p className="text-text-secondary text-xs sm:text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {isAr ? project.descriptionAr : project.descriptionEn}
                </p>

                {/* Scope Preview */}
                <div className="space-y-1.5 mb-6 bg-surface-muted p-3.5 rounded-xl border border-border">
                  <div className="text-[10px] uppercase font-bold text-brand-gold tracking-wider">
                    {dict.common.scopeOfWork}
                  </div>
                  {(isAr ? project.scopeAr : project.scopeEn)?.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="text-xs text-text-secondary line-clamp-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Footer link */}
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-primary-accent"
                  >
                    <span>{dict.common.viewDetails}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/${locale}/request-quote?projectRef=${project.slug}`}
                    className="text-xs font-semibold text-brand-gold hover:underline"
                  >
                    {dict.common.requestSimilarQuote}
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

export default FeaturedProjects;
