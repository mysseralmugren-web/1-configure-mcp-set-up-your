import React from "react";
import { Locale } from "@/types";
import { FACTORY_STATS } from "@/lib/data/manufacturing";

export function FactoryJsonLd({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";

  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ManufacturingBusiness"],
    name: isAr ? "مصنع المقرن للأثاث والديكور" : "AlMuqrin Furniture & Decor Factory",
    alternateName: "AlMuqrin Furniture Factory",
    url: "https://www.almuqrinfurniturefactory.com",
    logo: "https://www.almuqrinfurniturefactory.com/images/logo.svg",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    description: isAr
      ? "مصنع سعودي رائد بالرياض متخصص في تصميم وتصنيع وتنفيذ الأثاث المكتبي والتنفيذي والمنزلي الفاخر، التكسيات الخشبية، والمجالس الملكية."
      : "Premier Saudi industrial manufacturer in Riyadh specializing in executive office furniture, modular workstations, luxury residential joinery, and architectural millwork.",
    telephone: FACTORY_STATS.contact.phone,
    email: FACTORY_STATS.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2nd Industrial City",
      addressLocality: "Riyadh",
      addressRegion: "Riyadh Province",
      postalCode: "11564",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: FACTORY_STATS.location.coordinates.lat,
      longitude: FACTORY_STATS.location.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
