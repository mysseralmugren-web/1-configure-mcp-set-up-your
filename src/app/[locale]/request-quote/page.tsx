import React, { Suspense } from "react";
import { Locale } from "@/types";
import { QuoteRequestForm } from "@/components/quote/QuoteRequestForm";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { FileText, ShieldCheck, Clock, CheckCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "طلب عرض سعر رسمي | مصنع المقرن" : "Request an Official Quotation | AlMuqrin Factory",
    description: isAr
      ? "أرسل تفاصيل مشروعك أو الموديلات المطلوبة لدراسة المخططات وتقديم تسعير رسمي خلال 24 ساعة."
      : "Submit your project requirements or furniture models for an official quotation within 24 hours.",
  };
}

export default async function RequestQuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === "en" ? "en" : "ar") as Locale;
  const dict = getDictionary(validLocale);
  const isAr = validLocale === "ar";

  return (
    <div className="pt-28 pb-20 bg-surface-muted" dir={isAr ? "rtl" : "ltr"}>
      {/* Header Banner */}
      <section className="bg-primary-950 text-white py-14 sm:py-20 relative overflow-hidden mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-gold/30 text-silver-light text-xs font-semibold mb-6">
            <FileText className="w-4 h-4 text-brand-gold" />
            <span>{dict.quoteForm.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {dict.quoteForm.title}
          </h1>

          <p className="text-base sm:text-lg text-silver max-w-2xl mx-auto leading-relaxed">
            {dict.quoteForm.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-silver">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-gold" />
              <span>{isAr ? "تسعير خلال 24 ساعة عمل" : "Quotation within 24 business hours"}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>{isAr ? "سرية تامة للمخططات (NDA)" : "Strict NDA Protection"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-brand-gold" />
              <span>{isAr ? "ضمان مصنعي حتى 10 سنوات" : "Up to 10-Year Warranty"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Container with Suspense for useSearchParams */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-12 text-center border border-border">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <span className="text-xs text-text-secondary">
                {isAr ? "تحميل نموذج التسعير..." : "Loading Quotation Form..."}
              </span>
            </div>
          }
        >
          <QuoteRequestForm locale={validLocale} />
        </Suspense>
      </section>
    </div>
  );
}
