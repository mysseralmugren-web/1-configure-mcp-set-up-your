import React from "react";
import { Locale } from "@/types";
import { ContactSection } from "@/components/home/ContactSection";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { MapPin, PhoneCall } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "اتصل بنا ومقر المصنع بالرياض" : "Contact Us & Riyadh Factory Location",
    description: isAr
      ? "تواصل مع مصنع المقرن للأثاث والديكور بالمدينة الصناعية الثانية بالرياض."
      : "Contact AlMuqrin Furniture Factory in 2nd Industrial City, Riyadh, Saudi Arabia.",
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === "en" ? "en" : "ar") as Locale;
  const dict = getDictionary(validLocale);
  const isAr = validLocale === "ar";

  return (
    <div className="pt-28 pb-10 bg-surface-muted" dir={isAr ? "rtl" : "ltr"}>
      {/* Header Banner */}
      <section className="bg-primary-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-gold/30 text-silver-light text-xs font-semibold mb-6">
            <PhoneCall className="w-4 h-4 text-brand-gold" />
            <span>{isAr ? "خدمة العملاء والمشاريع" : "Customer & Project Services"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {dict.common.contactUs}
          </h1>

          <p className="text-base sm:text-lg text-silver max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? "فريق المهندسين والمستشارين الفنيين جاهز للإجابة على استفساراتكم وترتيب زيارات المعرض والمصنع بالرياض."
              : "Our team of engineers and technical consultants is ready to assist with project inquiries and showroom visits."}
          </p>
        </div>
      </section>

      {/* Contact Section Embed */}
      <ContactSection locale={validLocale} />
    </div>
  );
}
