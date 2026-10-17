"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Sliders, ShieldCheck, Check, UploadCloud } from "lucide-react";
import { WatermarkOverlay } from "@/components/brand/Logo";

const FACTORY_MEDIA_ASSETS = [
  {
    id: "m-01",
    title: "ماكينات CNC الألمانية - قسم التشكيل الدقيق",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    resolution: "1920 × 1280",
    size: "1.2 MB",
    format: "WebP / JPEG",
  },
  {
    id: "m-02",
    title: "مستودع أخشاب الجوز الطبيعي المجففة",
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    resolution: "2048 × 1365",
    size: "1.6 MB",
    format: "WebP / JPEG",
  },
  {
    id: "m-03",
    title: "مكتب المصمك التنفيذي الرئاسي",
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    resolution: "2400 × 1600",
    size: "2.1 MB",
    format: "WebP / JPEG",
  },
  {
    id: "m-04",
    title: "قاعات المؤتمرات والتكسيات الجدارية - كافد",
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
    resolution: "1920 × 1200",
    size: "1.4 MB",
    format: "WebP / JPEG",
  },
];

export default function AdminMediaPage() {
  const [selectedAsset, setSelectedAsset] = useState(FACTORY_MEDIA_ASSETS[0]);
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.25);
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            مكتبة الوسائط وضبط العلامة المائية المصنعية
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            معاينة العلامة المائية الرسمية وحماية الصور الفوتوغرافية للمصنع من النسخ.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Watermark Tester */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-gold" />
              <span>المعاينة الحية للعلامة المائية (Live Watermark Preview)</span>
            </h2>

            <button
              onClick={() => setWatermarkEnabled(!watermarkEnabled)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                watermarkEnabled
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {watermarkEnabled ? "العلامة مفعلة" : "معطلة"}
            </button>
          </div>

          {/* Interactive Image Frame */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
            <Image
              src={selectedAsset.url}
              alt={selectedAsset.title}
              fill
              className="object-cover"
            />
            {watermarkEnabled && <WatermarkOverlay opacity={watermarkOpacity} />}
          </div>

          {/* Opacity Control Slider */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-300">درجة شفافية العلامة المائية (Opacity):</span>
              <span className="font-mono text-brand-gold font-bold">
                {Math.round(watermarkOpacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={watermarkOpacity}
              onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
              className="w-full accent-brand-gold cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>خفيفة (10%)</span>
              <span>مثالية (25%)</span>
              <span>بارزة للحماية القصوى (60%)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Media Assets List */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
            <ImageIcon className="w-4 h-4 text-brand-gold" />
            <span>الصور المعتمدة في النظام</span>
          </h2>

          <div className="space-y-3">
            {FACTORY_MEDIA_ASSETS.map((asset) => {
              const isSelected = selectedAsset.id === asset.id;
              return (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-slate-950 border-brand-gold shadow-md"
                      : "bg-slate-950/60 border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-black flex-shrink-0">
                    <Image
                      src={asset.url}
                      alt={asset.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-grow">
                    <div className="text-xs font-bold text-white truncate">{asset.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {asset.resolution} • {asset.size}
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
