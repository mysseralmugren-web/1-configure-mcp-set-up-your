import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | مصنع المقرن للأثاث والديكور | AlMuqrin Furniture Factory",
    default: "مصنع المقرن للأثاث والديكور | AlMuqrin Furniture & Decor Factory",
  },
  description:
    "مصنع سعودي رائد بالرياض متخصص في تصميم وتصنيع وتنفيذ الأثاث المكتبي، التنفيذي، والمنزلي الفاخر، التكسيات الخشبية، والمجالس الملكية وفق أعلى معايير الجودة SASO و ISO.",
  keywords: [
    "مصنع المقرن",
    "أثاث مكاتب الرياض",
    "مصنع أثاث الرياض",
    "AlMuqrin Furniture Factory",
    "مكاتب تنفيذية",
    "محطات عمل",
    "تكسيات خشبية",
    "مجالس ملكية",
    "أثاث فاخر السعودية",
  ],
  authors: [{ name: "AlMuqrin Furniture & Decor Factory" }],
  creator: "AlMuqrin Furniture & Decor Factory",
  publisher: "AlMuqrin Furniture & Decor Factory",
  metadataBase: new URL("https://www.almuqrinfurniturefactory.com"),
  alternates: {
    canonical: "/",
    languages: {
      ar: "/ar",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: ["en_US"],
    url: "https://www.almuqrinfurniturefactory.com",
    siteName: "مصنع المقرن للأثاث والديكور",
    title: "مصنع المقرن للأثاث والديكور | AlMuqrin Furniture & Decor Factory",
    description:
      "من التصميم إلى التصنيع… نصنع التفاصيل بإتقان. مصنع سعودي رائد في الرياض لإنتاج الأثاث المكتبي والسكني الفاخر.",
    images: [
      {
        url: "/images/logo.svg",
        width: 1200,
        height: 630,
        alt: "مصنع المقرن للأثاث والديكور",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#101d35" />
      </head>
      <body className="min-h-screen bg-surface-muted antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
