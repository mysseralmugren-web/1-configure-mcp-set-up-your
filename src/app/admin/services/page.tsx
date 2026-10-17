"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Layers, Eye, CheckCircle2 } from "lucide-react";
import { FACTORY_SERVICES } from "@/lib/data/services";

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            إدارة خطوط وخدمات التصنيع (10 أقسام)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            متابعة المواصفات الفنية، صور خطوط الإنتاج والقدرات الاستيعابية.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FACTORY_SERVICES.map((srv) => (
          <div
            key={srv.id}
            className="p-5 rounded-2xl bg-slate-900 border border-white/10 flex items-start gap-4"
          >
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-950 border border-white/10 flex-shrink-0">
              <Image
                src={srv.coverImage}
                alt={srv.titleAr}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-mono text-brand-gold font-bold">
                  DIVISION 0{srv.order}
                </span>
                <Link
                  href={`/ar/services/${srv.slug}`}
                  target="_blank"
                  className="text-slate-400 hover:text-white"
                >
                  <Eye className="w-3.5 h-3.5" />
                </Link>
              </div>

              <h2 className="text-sm font-bold text-white truncate mb-1">{srv.titleAr}</h2>
              <div className="text-[11px] text-slate-400 truncate mb-2">{srv.titleEn}</div>

              <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono">
                <span>{srv.technicalSpecsAr.length} مواصفة فنية</span>
                <span>•</span>
                <span>{srv.galleryImages.length} صور</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
