import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/types";
import { FACTORY_STATS } from "@/lib/data/manufacturing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  ShieldCheck,
  Award,
  Factory,
  Cpu,
  CheckCircle2,
  Users,
  Compass,
  ArrowLeft,
  ArrowRight,
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
    title: isAr ? "عن مصنع المقرن للأثاث والديكور" : "About AlMuqrin Furniture Factory",
    description: isAr
      ? "تاريخ عريق منذ عام 1998 في تصنيع الأثاث المكتبي والتنفيذي والتكسيات المعمارية بالرياض."
      : "A legacy of artisanal joinery and precision engineering since 1998 in Riyadh, Saudi Arabia.",
  };
}

export default async function AboutPage({
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
      {/* Hero Header Banner */}
      <section className="bg-primary-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80"
            alt="AlMuqrin Factory Industrial Works"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-950/85" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-gold/30 text-silver-light text-xs font-semibold mb-6">
            <Factory className="w-4 h-4 text-brand-gold" />
            <span>{isAr ? "الصرح الصناعي الوطني بالرياض" : "Riyadh Industrial Landmark"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            {isAr ? "مصنع المقرن للأثاث والديكور" : "AlMuqrin Furniture & Decor Factory"}
          </h1>

          <p className="text-xl sm:text-2xl text-brand-gold font-medium max-w-3xl mx-auto mb-6">
            {isAr
              ? "أكثر من 26 عاماً من الإتقان الهندسي والحرفية الفاخرة في قلب العاصمة الرياض"
              : "Over 26 Years of Engineering Mastery & Luxury Craftsmanship in Riyadh"}
          </p>

          <p className="text-silver text-base max-w-3xl mx-auto leading-relaxed">
            {dict.intro.p1}
          </p>
        </div>
      </section>

      {/* Narrative & History */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-bold">
              <span>{isAr ? "نشأة المصنع وتطوره" : "Heritage & Evolution"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              {isAr
                ? "من ورشة نجارة تقليدية إلى أحد أكبر مصانع الأثاث الذكي بالمملكة"
                : "From Artisanal Woodcraft to an Advanced Smart Manufacturing Facility"}
            </h2>

            <p className="text-text-secondary leading-relaxed">
              {isAr
                ? "تأسس مصنع المقرن في عام 1998 بالمدينة الصناعية الثانية بالرياض، وواكب منذ انطلاقته النهضة العمرانية الشاملة في المملكة العربية السعودية. على مدى أكثر من عقدين ونصف، طور المصنع خطوط إنتاجه لتصبح منظومة صناعية رقمية متكاملة تضم أحدث ماكينات CNC خماسية المحاور الألمانية والإيطالية."
                : "Founded in 1998 in Riyadh's 2nd Industrial City, AlMuqrin Factory has grown alongside Saudi Arabia's immense architectural renaissance. Over two and a half decades, the facility transformed into a fully automated digital joinery complex utilizing state-of-the-art German and Italian 5-axis CNC machining centers."}
            </p>

            <p className="text-text-secondary leading-relaxed">
              {isAr
                ? "نفخر اليوم بثقة كبرى الجهات الحكومية، المطورين العقاريين، والبنوك الاستثمارية التي اعتمدت على مصنع المقرن لتنفيذ مقراتها الرئيسية، قاعات المؤتمرات الكبرى، والمشاريع الفندقية والسكنية الفاخرة."
                : "Today, we are honored by the trust of government authorities, sovereign developers, and leading corporations who rely on AlMuqrin Factory to engineer their flagship headquarters, monumental boardrooms, and luxury residences."}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-border">
                <div className="text-3xl font-extrabold text-primary font-mono">+450</div>
                <div className="text-xs text-text-secondary mt-1">{isAr ? "مشروع منجز بالمملكة" : "Projects Delivered"}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-border">
                <div className="text-3xl font-extrabold text-primary font-mono">12,500 م²</div>
                <div className="text-xs text-text-secondary mt-1">{isAr ? "مساحة منشآت المصنع" : "Factory Footprint"}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border border-border">
              <Image
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                alt="Factory Craftsmanship"
                fill
                className="object-cover"
              />
              <WatermarkOverlay opacity={0.25} />
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="bg-white py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-surface-muted border border-border">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mb-6">
                <Compass className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {isAr ? "رؤيتنا" : "Our Vision"}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {isAr
                  ? "أن نكون الخيار الهندسي الأول في المملكة العربية السعودية والشرق الأوسط لتصنيع وتنفيذ الأثاث المكتبي والتنفيذي الفاخر والتكسيات الخشبية المعمارية."
                  : "To be the premier engineering choice across Saudi Arabia and the Middle East for luxury commercial joinery, presidential furniture, and architectural woodworking."}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surface-muted border border-border">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {isAr ? "رسالتنا" : "Our Mission"}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {isAr
                  ? "تحويل التصاميم والمخططات المعمارية إلى واقع مصنع بأعلى درجات الدقة والمتانة، باستخدام أرقى المواد العالمية والمطابقة لمعايير الجودة والاستدامة السعودية."
                  : "Translating architectural blueprints into precision-manufactured reality with certified materials and uncompromising SASO and ISO quality compliance."}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surface-muted border border-border">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {isAr ? "قيمنا الجوهرية" : "Our Core Values"}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {isAr
                  ? "الإتقان الهندسي، الشفافية المطلقة، الالتزام بالجدول الزمني للتسليم، والمسؤولية الكاملة عن كل قطعة تحمل علامة مصنع المقرن بضمان حقيقي يصل إلى 10 سنوات."
                  : "Engineering integrity, punctuality, artisanal pride, and full accountability backed by our authentic 10-year factory warranty."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-4">
          {isAr ? "هل ترغب في جولة ميدانية لمصنعنا بالرياض؟" : "Interested in a Tour of Our Riyadh Facility?"}
        </h2>
        <p className="text-text-secondary text-base max-w-2xl mx-auto mb-8">
          {isAr
            ? "نرحب بالمهندسين والاستشاريين للاطلاع على خطوط الإنتاج وعينات الأخشاب والرخام في المدينة الصناعية الثانية."
            : "We welcome developers, consultants, and architects to inspect our manufacturing floor and material library."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${validLocale}/request-quote`}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-white font-bold text-xs"
          >
            {dict.common.requestQuote}
          </Link>
          <Link
            href={`/${validLocale}/contact`}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-border text-text-primary font-bold text-xs"
          >
            {dict.common.contactUs}
          </Link>
        </div>
      </section>
    </div>
  );
}
