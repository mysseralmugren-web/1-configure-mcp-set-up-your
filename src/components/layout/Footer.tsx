import React from "react";
import Link from "next/link";
import { Locale } from "@/types";
import { FACTORY_SERVICES } from "@/lib/data/services";
import { FACTORY_STATS } from "@/lib/data/manufacturing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Logo } from "@/components/brand/Logo";
import { ShieldCheck, Award, Phone, Mail, MapPin } from "lucide-react";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const isAr = locale === "ar";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-950 text-white border-t border-white/10 pt-16 pb-12" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Logo locale={locale} variant="light" size="lg" showSubtitle={true} />
            </div>

            <p className="text-silver text-xs sm:text-sm leading-relaxed mb-6">
              {dict.footer.about}
            </p>

            {/* Certifications Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-silver-light">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>{FACTORY_STATS.isoCertified}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-silver-light">
                <Award className="w-4 h-4 text-brand-gold" />
                <span>SASO Certified Quality</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4 text-brand-gold">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-silver">
              <li>
                <Link href={`/${locale}`} className="hover:text-white transition-colors">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-white transition-colors">
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalog`} className="hover:text-white transition-colors">
                  {dict.nav.catalog}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/projects`} className="hover:text-white transition-colors">
                  {dict.nav.projects}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/manufacturing`} className="hover:text-white transition-colors">
                  {dict.nav.manufacturing}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/request-quote`} className="hover:text-white transition-colors">
                  {dict.nav.quote}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Manufacturing Services (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4 text-brand-gold">
              {dict.footer.ourServices}
            </h3>
            <ul className="space-y-2 text-xs text-silver">
              {FACTORY_SERVICES.slice(0, 7).map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/${locale}/services/${srv.slug}`}
                    className="hover:text-white transition-colors line-clamp-1"
                  >
                    {isAr ? srv.titleAr : srv.titleEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Factory Location (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4 text-brand-gold">
              {dict.footer.contactInfo}
            </h3>
            <ul className="space-y-3 text-xs text-silver">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? "الرياض - المدينة الصناعية الثانية - المملكة العربية السعودية"
                    : "Riyadh - 2nd Industrial City - Kingdom of Saudi Arabia"}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href={`tel:${FACTORY_STATS.contact.phone}`} className="hover:text-white font-mono" dir="ltr">
                  {FACTORY_STATS.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href={`mailto:${FACTORY_STATS.contact.email}`} className="hover:text-white font-mono">
                  {FACTORY_STATS.contact.email}
                </a>
              </li>
              <li className="pt-3">
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 text-xs transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{dict.common.adminPortal}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Commercial Info */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-silver/70">
          <div>
            {dict.footer.rights.replace("{year}", currentYear.toString())}
          </div>
          <div className="font-mono text-[11px]">
            {dict.footer.commercialReg}
          </div>
          <div className="text-brand-gold font-semibold">
            {dict.footer.craftedWith}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
