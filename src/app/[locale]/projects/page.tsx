"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Locale } from "@/types";
import { FACTORY_PROJECTS } from "@/lib/data/projects";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Building2, MapPin, Calendar, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

export default function ProjectsPage() {
  const params = useParams();
  const locale = (params?.locale === "en" ? "en" : "ar") as Locale;
  const dict = getDictionary(locale);
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredProjects =
    activeTab === "all"
      ? FACTORY_PROJECTS
      : FACTORY_PROJECTS.filter((p) => p.category === activeTab);

  return (
    <div className="pt-28 pb-20 bg-surface-muted" dir={isAr ? "rtl" : "ltr"}>
      {/* Header Banner */}
      <section className="bg-primary-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-gold/30 text-silver-light text-xs font-semibold mb-6">
            <Building2 className="w-4 h-4 text-brand-gold" />
            <span>{isAr ? "سجل الأعمال والمنجزات" : "Proven Track Record"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? "أعمال ومشاريع مصنع المقرن المنجزة" : "Prestige Turnkey Projects Portfolio"}
          </h1>

          <p className="text-base sm:text-lg text-silver max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? "مشاريع وطنية كبرى تم تصنيعها وتنفيذها بأعلى معايير الجودة والإتقان للمقرات الحكومية، الأبراج الإدارية، والقصور الملكية."
              : "Iconic turnkey projects manufactured and installed for presidential suites, financial towers, and royal estates."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 no-scrollbar">
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
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-text-secondary hover:text-text-primary border border-border"
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

                <div className="absolute top-4 start-4">
                  <span className="bg-primary-900/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-semibold border border-white/10">
                    {isAr ? project.categoryLabelAr : project.categoryLabelEn}
                  </span>
                </div>
              </div>

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

                <h2 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 mb-3">
                  {isAr ? project.titleAr : project.titleEn}
                </h2>

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
      </section>
    </div>
  );
}
