"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Box,
  Building2,
  Layers,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  ExternalLink,
  Menu,
  X,
  LogOut,
  UserCheck,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminNavItems = [
    { href: "/admin/dashboard", labelAr: "لوحة التحكم الرئيسية", labelEn: "Overview Dashboard", icon: LayoutDashboard },
    { href: "/admin/quote-requests", labelAr: "طلبات التسعير (RFQ)", labelEn: "Quote Requests", icon: FileText, badge: "3 New" },
    { href: "/admin/products", labelAr: "إدارة الكتالوج والموديلات", labelEn: "Product Catalog", icon: Box },
    { href: "/admin/projects", labelAr: "إدارة المشاريع المنجزة", labelEn: "Projects Portfolio", icon: Building2 },
    { href: "/admin/services", labelAr: "خطوط وخدمات التصنيع", labelEn: "Factory Services", icon: Layers },
    { href: "/admin/media", labelAr: "مكتبة الوسائط والعلامة المائية", labelEn: "Media & Watermark", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans" dir="rtl">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-primary-950 border-b border-white/10 sticky top-0 z-40">
        <Logo locale="ar" variant="light" size="sm" asLink={false} />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white/10 text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 start-0 z-50 w-72 bg-primary-950 border-e border-white/10 flex flex-col transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10">
          <Logo locale="ar" variant="light" size="md" asLink={false} />
          <div className="mt-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-brand-gold font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>نظام الإدارة الآمن • Portal v2.0</span>
          </div>
        </div>

        {/* Admin Navigation */}
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-brand-gold text-primary-950 font-bold shadow-md shadow-brand-gold/20"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.labelAr}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-primary-950 text-white" : "bg-emerald-500/20 text-emerald-300"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Session & Back to Site */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-9 h-9 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center font-bold text-xs">
              AM
            </div>
            <div className="min-w-0 flex-grow">
              <div className="text-xs font-bold text-white truncate">م. سلطان المقرن</div>
              <div className="text-[10px] text-slate-400">Super Administrator</div>
            </div>
          </div>

          <Link
            href="/ar"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>العودة إلى الموقع العام</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
