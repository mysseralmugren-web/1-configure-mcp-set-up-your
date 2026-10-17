import React from "react";
import Link from "next/link";
import { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { FileText, ArrowLeft, ArrowRight, ShieldCheck, Clock, Headphones } from "lucide-react";

interface QuoteCallToActionProps {
  locale: Locale;
}

export function QuoteCallToAction({ locale }: QuoteCallToActionProps) {
  const dict = getDictionary(locale);
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-24 bg-primary-950 text-white relative overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(197,164,103,0.12),rgba(255,255,255,0))]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-gold/30 text-silver-light text-xs font-semibold mb-6">
          <Clock className="w-4 h-4 text-brand-gold" />
          <span>{isAr ? "تسعير هندسي دقيق خلال 24 ساعة" : "Detailed Engineering Quote Within 24h"}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
          {isAr ? "جاهزون لتحويل رؤيتك المعمارية إلى واقع مصنّع بإتقان" : "Ready to Engineer Your Architectural Vision into Reality?"}
        </h2>

        <p className="text-silver text-base sm:text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          {isAr
            ? "أرسل مخططات مشروعك أو جداول الكميات وسيقوم فريق المهندسين بدراسة المواصفات وتقديم عرض سعر تفصيلي يشمل التصنيع، التوريد، والتركيب."
            : "Submit your architectural shop drawings or BOQ. Our engineering estimation team will review technical specs and deliver a comprehensive proposal covering manufacturing, delivery, and installation."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href={`/${locale}/request-quote`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold/90 text-primary-950 font-bold text-sm tracking-wide shadow-2xl shadow-brand-gold/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <FileText className="w-5 h-5" />
            <span>{dict.common.requestQuote}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>

          <a
            href="https://wa.me/966501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all"
          >
            <Headphones className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? "محادثة مهندس المشاريع واتساب" : "Chat with Project Engineer"}</span>
          </a>
        </div>

        {/* Reassurance items */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 text-xs text-silver">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>{isAr ? "سرية تامة للمخططات والتصاميم" : "Strict NDA & Blueprint Privacy"}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-brand-gold" />
            <span>{isAr ? "التزام صارم بجدول التسليم" : "Guaranteed Project Handover Schedules"}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>{isAr ? "ضمان مصنعي معتمد حتى 10 سنوات" : "Certified 10-Year Factory Warranty"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuoteCallToAction;
