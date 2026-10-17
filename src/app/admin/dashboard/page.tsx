"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Box,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  Plus,
} from "lucide-react";
import { QuoteRequest } from "@/types";
import { getQuoteRequests, updateQuoteStatus } from "@/lib/store/quoteRequestsStore";
import { FURNITURE_PRODUCTS } from "@/lib/data/products";
import { FACTORY_PROJECTS } from "@/lib/data/projects";
import { FACTORY_STATS } from "@/lib/data/manufacturing";

export default function AdminDashboardPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);

  useEffect(() => {
    setQuotes([...getQuoteRequests()]);
  }, []);

  const handleStatusChange = (id: string, newStatus: QuoteRequest["status"]) => {
    updateQuoteStatus(id, newStatus);
    setQuotes([...getQuoteRequests()]);
  };

  const newQuotesCount = quotes.filter((q) => q.status === "new").length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            لوحة الإدارة والتحكم المصنعية
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            متابعة طلبات التسعير، تحديث المنتجات ثلاثية الأبعاد، وإدارة سجل الإنجاز.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/quote-requests"
            className="px-4 py-2 rounded-xl bg-brand-gold text-primary-950 font-bold text-xs flex items-center gap-2 hover:scale-[1.02] transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>مراجعة طلبات التسعير ({quotes.length})</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">طلبات التسعير الجديدة</span>
            <FileText className="w-4 h-4 text-brand-gold" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{newQuotesCount}</div>
          <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>تتطلب دراسة هندسية خلال 24h</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">الموديلات في الكتالوج</span>
            <Box className="w-4 h-4 text-brand-gold" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{FURNITURE_PRODUCTS.length}</div>
          <div className="text-[11px] text-slate-400 mt-2">
            منها 4 موديلات مجهزة بنماذج 3D
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">المشاريع المنجزة المسجلة</span>
            <Building2 className="w-4 h-4 text-brand-gold" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{FACTORY_PROJECTS.length}</div>
          <div className="text-[11px] text-slate-400 mt-2">
            كافد، الدرعية، والحي الدبلوماسي
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">الطاقة الاستيعابية الشهرية</span>
            <TrendingUp className="w-4 h-4 text-brand-gold" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">1,800</div>
          <div className="text-[11px] text-emerald-400 mt-2">
            محطة عمل ومكتب تنفيذي
          </div>
        </div>
      </div>

      {/* Inbound Quotations Table */}
      <div className="bg-slate-900 rounded-3xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-gold" />
              <span>أحدث طلبات عروض الأسعار الواردة</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              محدثة لحظياً من نموذج التسعير العام.
            </p>
          </div>

          <Link
            href="/admin/quote-requests"
            className="text-xs font-bold text-brand-gold hover:underline"
          >
            عرض الكل
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[11px] border-b border-white/10">
              <tr>
                <th className="py-3 px-4 text-start">رقم المرجع</th>
                <th className="py-3 px-4 text-start">العميل والجهة</th>
                <th className="py-3 px-4 text-start">الجوال والمدينة</th>
                <th className="py-3 px-4 text-start">الخدمة المطلوبة</th>
                <th className="py-3 px-4 text-start">الحالة</th>
                <th className="py-3 px-4 text-start">الإجراء السريع</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand-gold whitespace-nowrap">
                    {quote.referenceNo}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{quote.customerName}</div>
                    {quote.companyName && (
                      <div className="text-[11px] text-slate-400">{quote.companyName}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-300" dir="ltr">{quote.phone}</div>
                    <div className="text-[11px] text-slate-400">{quote.city}</div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-300">
                    {quote.serviceType}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        quote.status === "new"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : quote.status === "in_review"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : quote.status === "quoted"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {quote.status === "new"
                        ? "جديد"
                        : quote.status === "in_review"
                        ? "قيد المراجعة"
                        : quote.status === "quoted"
                        ? "تم التسعير"
                        : "مؤرشف"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {quote.status === "new" && (
                        <button
                          onClick={() => handleStatusChange(quote.id!, "in_review")}
                          className="px-2 py-1 rounded-lg bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 text-[11px] font-semibold"
                        >
                          بدء المراجعة
                        </button>
                      )}
                      {quote.status === "in_review" && (
                        <button
                          onClick={() => handleStatusChange(quote.id!, "quoted")}
                          className="px-2 py-1 rounded-lg bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 text-[11px] font-semibold"
                        >
                          تم التسعير
                        </button>
                      )}
                      <a
                        href={`https://wa.me/${quote.phone.replace(/^0/, "966")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 rounded-lg bg-emerald-700/40 text-emerald-200 hover:bg-emerald-700/60 text-[11px] font-semibold"
                      >
                        واتساب
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
