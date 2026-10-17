import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/types";
import { MANUFACTURING_STEPS, FACTORY_STATS } from "@/lib/data/manufacturing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  Cog,
  CheckCircle2,
  ShieldCheck,
  Award,
  Factory,
  Cpu,
  ArrowLeft,
  ArrowRight,
  FileText,
} from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "تقنيات ومراحل التصنيع" : "Manufacturing Technologies & Process",
    description: isAr
      ? "تعرف على مراحل التصنيع الهندسية بماكينات CNC الألمانية خماسية المحاور بمصنع المقرن بالرياض."
      : "Discover our 8-stage manufacturing process powered by 5-axis German CNC centers in Riyadh.",
  };
}

export default async function ManufacturingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === "en" ? "en" : "ar") as Locale;
  const dict = getDictionary(validLocale);
  const isAr = validLocale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-28 pb-20 bg-surface-muted" dir={isAr ? "rtl" : "ltr"}>
      {/* Header Banner */}
      <section className="bg-primary-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-gold/30 text-silver-light text-xs font-semibold mb-6">
            <Cog className="w-4 h-4 text-brand-gold" />
            <span>{isAr ? "الصناعة الذكية والدقة الرقمية" : "Smart Manufacturing & Digital Precision"}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
            {isAr ? "تقنيات ومراحل التصنيع بمصنع المقرن" : "Our Advanced Manufacturing Process"}
          </h1>

          <p className="text-lg sm:text-xl text-silver max-w-3xl mx-auto leading-relaxed">
            {isAr
              ? "نعتمد أحدث التقنيات الصناعية الألمانية خماسية المحاور والبرمجيات الهندسية المتقدمة لضمان دقة تصل إلى 0.1 ملم في كافة تفاصيل الخشب والجلد والمعادن."
              : "State-of-the-art German 5-axis CNC machining centers and parametric CAD/CAM engineering delivering sub-millimeter precision across every wood, leather, and metal component."}
          </p>
        </div>
      </section>

      {/* Industrial Key Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl border border-border shadow-xl">
          <div className="p-4 text-center border-e border-border last:border-none">
            <div className="text-3xl font-extrabold text-primary font-mono">{FACTORY_STATS.facilityAreaM2.toLocaleString()} م²</div>
            <div className="text-xs text-text-secondary mt-1">{isAr ? "المساحة التشغيلية" : "Operational Facility"}</div>
          </div>
          <div className="p-4 text-center border-e border-border last:border-none">
            <div className="text-3xl font-extrabold text-primary font-mono">{FACTORY_STATS.activeEngineersCraftsmen}+</div>
            <div className="text-xs text-text-secondary mt-1">{isAr ? "مهندس وحرفي متخصص" : "Engineers & Artisans"}</div>
          </div>
          <div className="p-4 text-center border-e border-border last:border-none">
            <div className="text-3xl font-extrabold text-primary font-mono">{FACTORY_STATS.monthlyCapacityWorkstations}</div>
            <div className="text-xs text-text-secondary mt-1">{isAr ? "محطة عمل شهرياً" : "Workstations / Month"}</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-3xl font-extrabold text-brand-gold font-mono">{FACTORY_STATS.warrantyYears} {isAr ? "سنوات" : "Years"}</div>
            <div className="text-xs text-text-secondary mt-1">{isAr ? "ضمان مصنعي معتمد" : "Comprehensive Warranty"}</div>
          </div>
        </div>
      </section>

      {/* The 8 Detailed Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-16">
          {MANUFACTURING_STEPS.map((step, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={step.step}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Photo Column */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-primary-950 border border-border shadow-xl">
                    <Image
                      src={step.image}
                      alt={isAr ? step.titleAr : step.titleEn}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <WatermarkOverlay opacity={0.25} />
                    <div className="absolute top-4 start-4 w-10 h-10 rounded-2xl bg-brand-gold text-primary-950 font-black text-base flex items-center justify-center shadow-lg">
                      0{step.step}
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-2">
                    {isAr ? `المرحلة 0${step.step}` : `STAGE 0${step.step}`}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-4 leading-tight">
                    {isAr ? step.titleAr : step.titleEn}
                  </h2>

                  <p className="text-text-secondary text-base leading-relaxed mb-6">
                    {isAr ? step.descriptionAr : step.descriptionEn}
                  </p>

                  <div className="p-4 rounded-2xl bg-white border border-border flex items-start gap-3 shadow-sm">
                    <Cpu className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-text-primary uppercase">
                        {isAr ? "الآلات والتقنيات المستخدمة:" : "Machinery & Equipment:"}
                      </div>
                      <div className="text-xs sm:text-sm text-text-secondary mt-0.5 font-medium">
                        {isAr ? step.machineryAr : step.machineryEn}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center">
        <div className="p-10 rounded-3xl bg-primary-950 text-white shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            {isAr ? "ترغب في تصنيع مواصفات خاصة لمشروعك؟" : "Have Custom Architectural Specifications?"}
          </h2>
          <p className="text-silver text-sm max-w-xl mx-auto mb-8">
            {isAr
              ? "فريق المهندسين جاهز لدراسة المخططات الهندسية ونماذج CAD وتقديم المشورة الفنية."
              : "Our engineering department is ready to examine your CAD models and shop drawings."}
          </p>
          <Link
            href={`/${validLocale}/request-quote`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-gold text-primary-950 font-bold text-xs"
          >
            <FileText className="w-4 h-4" />
            <span>{dict.common.requestQuote}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
