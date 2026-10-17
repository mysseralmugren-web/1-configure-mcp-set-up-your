"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, Search, Plus, Eye, MapPin, Calendar } from "lucide-react";
import { FACTORY_PROJECTS } from "@/lib/data/projects";
import { ProjectPortfolio } from "@/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectPortfolio[]>([...FACTORY_PROJECTS]);
  const [search, setSearch] = useState("");

  const filtered = projects.filter(
    (p) =>
      p.titleAr.toLowerCase().includes(search.toLowerCase()) ||
      p.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      p.locationAr.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            إدارة سجل المشاريع والأعمال المنجزة
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            إضافة وتعديل صور المشاريع الكبرى، بيانات العملاء ونطاق التصنيع.
          </p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-slate-900 rounded-3xl border border-white/10 overflow-hidden">
        <table className="w-full text-xs text-start">
          <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[11px] border-b border-white/10">
            <tr>
              <th className="py-3.5 px-4 text-start">المشروع</th>
              <th className="py-3.5 px-4 text-start">العميل / الجهة</th>
              <th className="py-3.5 px-4 text-start">الموقع والسنة</th>
              <th className="py-3.5 px-4 text-start">المساحة</th>
              <th className="py-3.5 px-4 text-start">التصنيف</th>
              <th className="py-3.5 px-4 text-start">معاينة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((proj) => (
              <tr key={proj.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-10 rounded-xl overflow-hidden bg-slate-950 border border-white/10 flex-shrink-0">
                      <Image
                        src={proj.coverImage}
                        alt={proj.titleAr}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm line-clamp-1">{proj.titleAr}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{proj.titleEn}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-300 font-medium">
                  {proj.clientAr}
                </td>
                <td className="py-3.5 px-4 text-slate-400 font-mono">
                  {proj.locationAr} • {proj.completionDate}
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-400">
                  {proj.areaM2 ? `${proj.areaM2} m²` : "-"}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary-800 text-silver border border-white/10">
                    {proj.categoryLabelAr}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <Link
                    href={`/ar/projects/${proj.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white inline-flex items-center"
                    title="معاينة"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
