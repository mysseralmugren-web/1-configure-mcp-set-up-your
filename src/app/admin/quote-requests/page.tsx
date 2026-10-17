"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Archive,
  Phone,
  Mail,
  Calendar,
  Building,
  Paperclip,
  X,
  ExternalLink,
} from "lucide-react";
import { QuoteRequest } from "@/types";
import { getQuoteRequests, updateQuoteStatus } from "@/lib/store/quoteRequestsStore";

export default function AdminQuoteRequestsPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [activeQuote, setActiveQuote] = useState<QuoteRequest | null>(null);

  useEffect(() => {
    setQuotes([...getQuoteRequests()]);
  }, []);

  const handleStatusUpdate = (id: string, newStatus: QuoteRequest["status"]) => {
    updateQuoteStatus(id, newStatus);
    const updated = [...getQuoteRequests()];
    setQuotes(updated);
    if (activeQuote && activeQuote.id === id) {
      setActiveQuote(updated.find((q) => q.id === id) || null);
    }
  };

  const filteredQuotes = quotes.filter((q) => {
    if (filterStatus !== "all" && q.status !== filterStatus) return false;
    if (search.trim()) {
      const qLower = search.toLowerCase();
      const matchName = q.customerName.toLowerCase().includes(qLower);
      const matchRef = q.referenceNo?.toLowerCase().includes(qLower);
      const matchPhone = q.phone.includes(qLower);
      const matchCompany = q.companyName?.toLowerCase().includes(qLower);
      return matchName || matchRef || matchPhone || matchCompany;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            إدارة ومراجعة طلبات عروض الأسعار (RFQ)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            سجل طلبات التسعير الواردة، تدقيق المخططات، وتحديث حالات التسعير.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث برقم المرجع، الاسم، الجوال، أو الشركة..."
            className="w-full ps-10 pe-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white outline-none focus:border-brand-gold"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: "all", label: "الكل" },
            { id: "new", label: "جديدة" },
            { id: "in_review", label: "قيد المراجعة" },
            { id: "quoted", label: "تم التسعير" },
            { id: "archived", label: "مؤرشفة" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filterStatus === tab.id
                  ? "bg-brand-gold text-primary-950 shadow-md shadow-brand-gold/20"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quotations List */}
      <div className="bg-slate-900 rounded-3xl border border-white/10 overflow-hidden">
        <table className="w-full text-xs text-start">
          <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[11px] border-b border-white/10">
            <tr>
              <th className="py-3.5 px-4 text-start">رقم المرجع</th>
              <th className="py-3.5 px-4 text-start">العميل / الجهة</th>
              <th className="py-3.5 px-4 text-start">الخدمة المطلوبة</th>
              <th className="py-3.5 px-4 text-start">المدينة</th>
              <th className="py-3.5 px-4 text-start">المرفقات</th>
              <th className="py-3.5 px-4 text-start">الحالة</th>
              <th className="py-3.5 px-4 text-start">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredQuotes.map((q) => (
              <tr key={q.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-mono font-bold text-brand-gold whitespace-nowrap">
                  {q.referenceNo}
                </td>
                <td className="py-4 px-4">
                  <div className="font-bold text-white text-sm">{q.customerName}</div>
                  {q.companyName && (
                    <div className="text-[11px] text-slate-400 mt-0.5">{q.companyName}</div>
                  )}
                </td>
                <td className="py-4 px-4 max-w-xs truncate text-slate-300">
                  {q.serviceType}
                </td>
                <td className="py-4 px-4 text-slate-400">{q.city}</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {q.attachments && q.attachments.length > 0 ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-md">
                      <Paperclip className="w-3 h-3" />
                      <span>{q.attachments.length} ملف</span>
                    </span>
                  ) : (
                    <span className="text-slate-500">-</span>
                  )}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      q.status === "new"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : q.status === "in_review"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : q.status === "quoted"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {q.status === "new"
                      ? "جديد"
                      : q.status === "in_review"
                      ? "قيد المراجعة"
                      : q.status === "quoted"
                      ? "تم التسعير"
                      : "مؤرشف"}
                  </span>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <button
                    onClick={() => setActiveQuote(q)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs"
                  >
                    تفاصيل ومراجعة
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {activeQuote && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveQuote(null)}
        >
          <div
            className="bg-slate-900 border border-white/10 max-w-2xl w-full rounded-3xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-brand-gold">{activeQuote.referenceNo}</span>
                <h2 className="text-xl font-bold text-white">{activeQuote.customerName}</h2>
              </div>
              <button
                onClick={() => setActiveQuote(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                <span className="text-slate-400 block mb-1">الجهة / الشركة</span>
                <span className="font-semibold text-white">{activeQuote.companyName || "عميل خاص"}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                <span className="text-slate-400 block mb-1">المدينة</span>
                <span className="font-semibold text-white">{activeQuote.city}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                <span className="text-slate-400 block mb-1">رقم الجوال</span>
                <a href={`tel:${activeQuote.phone}`} className="font-mono font-bold text-brand-gold hover:underline" dir="ltr">
                  {activeQuote.phone}
                </a>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                <span className="text-slate-400 block mb-1">البريد الإلكتروني</span>
                <span className="font-mono text-slate-300">{activeQuote.email || "غير محدد"}</span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
              <span className="text-xs text-slate-400 block mb-1">تفاصيل ومتطلبات المشروع:</span>
              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {activeQuote.projectDescription}
              </p>
            </div>

            {/* Attachments */}
            {activeQuote.attachments && activeQuote.attachments.length > 0 && (
              <div>
                <span className="text-xs text-slate-400 block mb-2">المرفقات والمخططات الهندسية:</span>
                <div className="space-y-2">
                  {activeQuote.attachments.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-white/5 text-xs">
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-brand-gold" />
                        <span className="font-mono text-slate-300">{file}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                        مشفر في مساحة التخزين الخاصة
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status change actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusUpdate(activeQuote.id!, "in_review")}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 text-xs font-semibold"
                >
                  نقل إلى قيد المراجعة
                </button>
                <button
                  onClick={() => handleStatusUpdate(activeQuote.id!, "quoted")}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 text-xs font-semibold"
                >
                  اعتماد كمسعّر
                </button>
                <button
                  onClick={() => handleStatusUpdate(activeQuote.id!, "archived")}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  أرشفة
                </button>
              </div>

              <a
                href={`https://wa.me/${activeQuote.phone.replace(/^0/, "966")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2"
              >
                <span>محادثة واتساب مباشرة</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
