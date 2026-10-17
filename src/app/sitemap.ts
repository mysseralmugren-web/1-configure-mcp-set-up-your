import { MetadataRoute } from "next";
import { FACTORY_SERVICES } from "@/lib/data/services";
import { FURNITURE_PRODUCTS } from "@/lib/data/products";
import { FACTORY_PROJECTS } from "@/lib/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.almuqrinfurniturefactory.com";
  const now = new Date();

  const locales = ["ar", "en"];
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/catalog",
    "/projects",
    "/manufacturing",
    "/request-quote",
    "/contact",
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static routes for each locale
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : route === "/request-quote" ? 0.9 : 0.8,
      });
    }

    // Dynamic services
    for (const srv of FACTORY_SERVICES) {
      entries.push({
        url: `${baseUrl}/${locale}/services/${srv.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Dynamic products
    for (const prod of FURNITURE_PRODUCTS) {
      entries.push({
        url: `${baseUrl}/${locale}/catalog/${prod.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }

    // Dynamic projects
    for (const proj of FACTORY_PROJECTS) {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${proj.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
  }

  return entries;
}
