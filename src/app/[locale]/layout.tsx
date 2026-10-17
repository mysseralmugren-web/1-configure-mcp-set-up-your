import React from "react";
import { notFound } from "next/navigation";
import { Locale } from "@/types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (locale !== "ar" && locale !== "en") {
    notFound();
  }

  const validLocale = locale as Locale;
  const isAr = validLocale === "ar";

  return (
    <div
      lang={validLocale}
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen flex flex-col ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <Navbar locale={validLocale} />
      <main className="flex-grow">{children}</main>
      <Footer locale={validLocale} />
    </div>
  );
}
