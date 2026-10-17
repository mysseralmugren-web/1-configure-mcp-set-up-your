import React from "react";
import { Locale } from "@/types";
import { FACTORY_STATS } from "@/lib/data/manufacturing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink } from "lucide-react";

interface ContactSectionProps {
  locale: Locale;
}

export function ContactSection({ locale }: ContactSectionProps) {
  const dict = getDictionary(locale);
  const isAr = locale === "ar";

  return (
    <section className="py-20 lg:py-28 bg-surface relative" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Factory Contact Info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-bold mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isAr ? "مقر المصنع الرئيسي" : "Factory Headquarters"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-4">
              {isAr ? "زيارة مصنع المقرن والتواصل" : "Visit Our Factory & Connect"}
            </h2>

            <p className="text-text-secondary text-base leading-relaxed mb-8">
              {isAr
                ? "يسعدنا استقبال الاستشاريين والمطورين والعملاء في صالة العرض والمصنع بالمدينة الصناعية الثانية بالرياض للاطلاع على خطوط الإنتاج وعينات الأخشاب والرخام."
                : "We welcome project developers, architects, and corporate clients to our Riyadh factory and showroom to inspect production lines and material samples."}
            </p>

            <div className="space-y-4">
              {/* Address */}
              <div className="p-4 rounded-2xl bg-surface-muted border border-border flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-primary-50 text-primary flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-secondary uppercase">{dict.common.address}</div>
                  <div className="text-sm font-semibold text-text-primary mt-0.5">
                    {isAr
                      ? "المملكة العربية السعودية، الرياض، المدينة الصناعية الثانية، شارع المصانع"
                      : "2nd Industrial City, Factory Street, Riyadh, Kingdom of Saudi Arabia"}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-2xl bg-surface-muted border border-border flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-primary-50 text-primary flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-secondary uppercase">{dict.common.phone}</div>
                  <a
                    href={`tel:${FACTORY_STATS.contact.phone.replace(/\s+/g, "")}`}
                    className="text-sm font-semibold text-text-primary hover:text-primary mt-0.5 block font-mono"
                    dir="ltr"
                  >
                    {FACTORY_STATS.contact.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="p-4 rounded-2xl bg-surface-muted border border-border flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-secondary uppercase">{dict.common.whatsapp}</div>
                  <a
                    href="https://wa.me/966501234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-emerald-700 hover:underline mt-0.5 block font-mono"
                    dir="ltr"
                  >
                    {FACTORY_STATS.contact.whatsapp}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-surface-muted border border-border flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-primary-50 text-primary flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-secondary uppercase">{dict.common.email}</div>
                  <a
                    href={`mailto:${FACTORY_STATS.contact.email}`}
                    className="text-sm font-semibold text-text-primary hover:text-primary mt-0.5 block font-mono"
                  >
                    {FACTORY_STATS.contact.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-4 rounded-2xl bg-surface-muted border border-border flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-primary-50 text-primary flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-secondary uppercase">{dict.common.workingHours}</div>
                  <div className="text-sm font-semibold text-text-primary mt-0.5">
                    {isAr ? FACTORY_STATS.contact.workingHoursAr : FACTORY_STATS.contact.workingHoursEn}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps & Showroom Tour Card */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl h-[400px] sm:h-[480px] bg-primary-950">
              <iframe
                title="AlMuqrin Factory Riyadh Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116035.78768023192!2d46.7844!3d24.5826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f073d8495a439%3A0x6b09930f36f6d2b!2s2nd%20Industrial%20City%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1710000000000!5m2!1sen!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
              />

              {/* Overlay Location Chip */}
              <div className="absolute top-4 start-4 bg-primary-900/95 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10 shadow-2xl max-w-xs">
                <div className="font-bold text-sm text-brand-gold">
                  {dict.common.factoryName}
                </div>
                <div className="text-xs text-silver mt-1">
                  {dict.common.riyadhFactory}
                </div>
                <a
                  href={FACTORY_STATS.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-brand-gold font-bold hover:underline"
                >
                  <span>{isAr ? "فتح في خرائط Google" : "Open in Google Maps"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
