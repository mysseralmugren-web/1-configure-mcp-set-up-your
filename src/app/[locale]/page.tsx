import React from "react";
import { Locale } from "@/types";
import { HeroSection } from "@/components/home/HeroSection";
import { FactoryIntroduction } from "@/components/home/FactoryIntroduction";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FeaturedFurniture } from "@/components/home/FeaturedFurniture";
import { ThreeDShowcase } from "@/components/home/ThreeDShowcase";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ManufacturingProcess } from "@/components/home/ManufacturingProcess";
import { FactoryGallery } from "@/components/home/FactoryGallery";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { QuoteCallToAction } from "@/components/home/QuoteCallToAction";
import { ContactSection } from "@/components/home/ContactSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === "en" ? "en" : "ar") as Locale;

  return (
    <>
      <HeroSection locale={validLocale} />
      <FactoryIntroduction locale={validLocale} />
      <ServicesGrid locale={validLocale} />
      <FeaturedFurniture locale={validLocale} />
      <ThreeDShowcase locale={validLocale} />
      <FeaturedProjects locale={validLocale} />
      <ManufacturingProcess locale={validLocale} />
      <FactoryGallery locale={validLocale} />
      <WhyChooseUs locale={validLocale} />
      <QuoteCallToAction locale={validLocale} />
      <ContactSection locale={validLocale} />
    </>
  );
}
