"use client";

import dynamic from "next/dynamic";
import React from "react";
import { FurnitureProduct, Locale } from "@/types";
import { Box } from "lucide-react";

const DynamicViewer = dynamic(
  () => import("./FurnitureViewer3D").then((mod) => mod.FurnitureViewer3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] md:h-[550px] rounded-2xl bg-primary-950 flex flex-col items-center justify-center gap-3 border border-border/20 text-silver">
        <div className="w-10 h-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <div className="flex items-center gap-2 text-xs">
          <Box className="w-4 h-4 text-brand-gold" />
          <span>تهيئة المحرك ثلاثي الأبعاد • Initializing 3D Canvas</span>
        </div>
      </div>
    ),
  }
);

export function FurnitureViewerDynamic(props: {
  product: FurnitureProduct;
  locale?: Locale;
  className?: string;
  height?: string;
}) {
  return <DynamicViewer {...props} />;
}
