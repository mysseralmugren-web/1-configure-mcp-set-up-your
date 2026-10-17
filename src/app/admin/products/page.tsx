"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Edit3,
  X,
  UploadCloud,
} from "lucide-react";
import { FURNITURE_PRODUCTS } from "@/lib/data/products";
import { FURNITURE_CATEGORIES } from "@/lib/data/categories";
import { FurnitureProduct } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<FurnitureProduct[]>([...FURNITURE_PRODUCTS]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    nameAr: "",
    nameEn: "",
    sku: "AMQ-EX-" + Math.floor(100 + Math.random() * 900),
    categoryId: "cat-executive",
    dimensions: "240×100×76 cm",
    materials: "خشب جوز أمريكي، جلد طبيعي، ستانلس ستيل 304",
  });

  const handleTogglePublish = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  };

  const handleToggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: FurnitureProduct = {
      id: `prod-${Date.now()}`,
      slug: newProduct.nameEn.toLowerCase().replace(/\s+/g, "-") || "new-model",
      sku: newProduct.sku,
      nameAr: newProduct.nameAr || "موديل جديد",
      nameEn: newProduct.nameEn || "New Model",
      descriptionAr: "تصميم هندسي حديث مصنع من أجود الأخشاب المعالجة.",
      descriptionEn: "Contemporary engineered furniture crafted from certified hardwood.",
      categoryId: newProduct.categoryId,
      categoryNameAr: "المكاتب التنفيذية والقيادية",
      categoryNameEn: "Executive Suites",
      images: [
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      ],
      modelType: "procedural",
      dimensions: { width: 240, height: 76, depth: 100, unit: "cm" },
      featured: true,
      published: true,
    };
    setProducts([created, ...products]);
    setShowAddModal(false);
  };

  const filtered = products.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.nameAr.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            إدارة كتالوج المنتجات والموديلات
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            إضافة موديلات جديدة، ربط مجسمات GLB/GLTF ثلاثية الأبعاد، وتحديث حالة النشر.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-brand-gold text-primary-950 font-bold text-xs flex items-center gap-2 hover:scale-[1.02] transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة موديل جديد للكتالوج</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم، رمز SKU..."
            className="w-full ps-10 pe-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white outline-none focus:border-brand-gold"
          />
        </div>

        <div className="text-xs text-slate-400 font-mono">
          إجمالي الموديلات: {products.length}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 rounded-3xl border border-white/10 overflow-hidden">
        <table className="w-full text-xs text-start">
          <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[11px] border-b border-white/10">
            <tr>
              <th className="py-3.5 px-4 text-start">الموديل والصورة</th>
              <th className="py-3.5 px-4 text-start">رمز SKU</th>
              <th className="py-3.5 px-4 text-start">القسم</th>
              <th className="py-3.5 px-4 text-start">الأبعاد (سم)</th>
              <th className="py-3.5 px-4 text-start">المجسم 3D</th>
              <th className="py-3.5 px-4 text-start">مميز</th>
              <th className="py-3.5 px-4 text-start">حالة النشر</th>
              <th className="py-3.5 px-4 text-start">معاينة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((prod) => (
              <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-950 border border-white/10 flex-shrink-0">
                      <Image
                        src={prod.images[0]}
                        alt={prod.nameAr}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{prod.nameAr}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{prod.nameEn}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono text-brand-gold font-bold">
                  {prod.sku}
                </td>
                <td className="py-3.5 px-4 text-slate-300">
                  {prod.categoryNameAr || prod.categoryId}
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-400">
                  {prod.dimensions
                    ? `${prod.dimensions.width}×${prod.dimensions.depth}×${prod.dimensions.height}`
                    : "-"}
                </td>
                <td className="py-3.5 px-4">
                  {prod.model3dUrl || prod.modelType === "procedural" ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      <Box className="w-3 h-3" />
                      <span>3D جاهز</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded-md">
                      قيد التحقق
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => handleToggleFeatured(prod.id)}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors ${
                      prod.featured
                        ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/30"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {prod.featured ? "نعم" : "لا"}
                  </button>
                </td>
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => handleTogglePublish(prod.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                      prod.published
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {prod.published ? "منشور" : "مسودة"}
                  </button>
                </td>
                <td className="py-3.5 px-4">
                  <Link
                    href={`/ar/catalog/${prod.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white inline-flex items-center"
                    title="معاينة في الموقع"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-slate-900 border border-white/10 max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">إضافة موديل جديد للكتالوج</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">اسم الموديل بالعربية *</label>
                <input
                  type="text"
                  required
                  value={newProduct.nameAr}
                  onChange={(e) => setNewProduct({ ...newProduct, nameAr: e.target.value })}
                  placeholder="مثال: مكتب طويق الرئاسي"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Name in English *</label>
                <input
                  type="text"
                  required
                  value={newProduct.nameEn}
                  onChange={(e) => setNewProduct({ ...newProduct, nameEn: e.target.value })}
                  placeholder="e.g., Tuwaiq Presidential Desk"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white outline-none focus:border-brand-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">رمز SKU</label>
                  <input
                    type="text"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">القسم</label>
                  <select
                    value={newProduct.categoryId}
                    onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white outline-none"
                  >
                    {FURNITURE_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nameAr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-dashed border-white/20 text-center">
                <UploadCloud className="w-6 h-6 text-brand-gold mx-auto mb-1" />
                <span className="text-[11px] text-slate-400 block">
                  رفع ملف ثلاثي الأبعاد GLB / GLTF للموديل
                </span>
                <span className="text-[10px] text-slate-500">
                  (يتم توليد المحاكاة الهندسية آلياً في حال عدم التوفر)
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-gold text-primary-950 font-bold text-xs"
              >
                حفظ وإدراج الموديل
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
