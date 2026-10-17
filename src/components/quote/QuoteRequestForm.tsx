"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Locale } from "@/types";
import { FACTORY_SERVICES } from "@/lib/data/services";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  Calendar,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Layers,
  Copy,
  Check,
} from "lucide-react";

interface QuoteRequestFormProps {
  locale: Locale;
}

const SAUDI_CITIES = [
  { ar: "الرياض", en: "Riyadh" },
  { ar: "جدة", en: "Jeddah" },
  { ar: "الدمام والخبر", en: "Dammam & Khobar" },
  { ar: "مكة المكرمة", en: "Makkah" },
  { ar: "المدينة المنورة", en: "Madinah" },
  { ar: "القصيم والرس", en: "Qassim" },
  { ar: "الجبيل الصناعية", en: "Jubail Industrial" },
  { ar: "تبوك ونيوم", en: "Tabuk & NEOM" },
  { ar: "أبها وعسير", en: "Abha & Asir" },
  { ar: "مدينة أخرى بالمملكة", en: "Other City in KSA" },
];

export function QuoteRequestForm({ locale }: QuoteRequestFormProps) {
  const dict = getDictionary(locale);
  const isAr = locale === "ar";
  const searchParams = useSearchParams();

  const prefilledProduct = searchParams.get("product") || "";
  const prefilledService = searchParams.get("service") || "";
  const prefilledProject = searchParams.get("projectRef") || "";

  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    phone: "",
    email: "",
    city: "الرياض",
    serviceType: "",
    projectDescription: "",
    quantity: "1",
    preferredDate: "",
    websiteUrlHoneypot: "", // hidden spam field
  });

  const [attachments, setAttachments] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{ referenceNo: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let initialDesc = "";
    let initialService = "";

    if (prefilledProduct) {
      initialDesc = isAr
        ? `طلب تسعير خاص للموديل: ${prefilledProduct}`
        : `Quotation request for model: ${prefilledProduct}`;
      initialService = "المكاتب التنفيذية والقيادية";
    } else if (prefilledService) {
      initialDesc = isAr
        ? `طلب تسعير لخدمة: ${prefilledService}`
        : `Quotation request for service: ${prefilledService}`;
    } else if (prefilledProject) {
      initialDesc = isAr
        ? `طلب تنفيذ مماثل لمشروع: ${prefilledProject}`
        : `Quotation request similar to completed project: ${prefilledProject}`;
    }

    if (initialDesc) {
      setFormData((prev) => ({
        ...prev,
        projectDescription: initialDesc,
        serviceType: initialService || prev.serviceType,
      }));
    }
  }, [prefilledProduct, prefilledService, prefilledProject, isAr]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileNames: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Max 25MB check
      if (file.size > 25 * 1024 * 1024) {
        alert(isAr ? "حجم الملف يتجاوز 25 ميجابايت" : "File size exceeds 25 MB");
        continue;
      }
      fileNames.push(file.name);
    }
    setAttachments((prev) => [...prev, ...fileNames]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.customerName,
          companyName: formData.companyName || undefined,
          phone: formData.phone,
          email: formData.email || undefined,
          city: formData.city,
          serviceType: formData.serviceType || (isAr ? "مشاريع وأثاث عام" : "General Furniture"),
          projectDescription: formData.projectDescription,
          quantity: formData.quantity ? parseInt(formData.quantity) : 1,
          preferredDate: formData.preferredDate || undefined,
          attachments,
          websiteUrlHoneypot: formData.websiteUrlHoneypot,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Submission failed");
      }

      setSuccessResult({ referenceNo: resData.referenceNo });
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          (isAr
            ? "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى أو الاتصال المباشر."
            : "An error occurred while submitting. Please try again or contact us directly.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  const copyRefToClipboard = () => {
    if (successResult?.referenceNo) {
      navigator.clipboard.writeText(successResult.referenceNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (successResult) {
    return (
      <div
        className="max-w-2xl mx-auto p-8 sm:p-12 bg-white rounded-3xl shadow-xl border border-border text-center animate-in zoom-in-95"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-3">
          {dict.quoteForm.successTitle}
        </h3>

        <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
          {dict.quoteForm.successDesc}
        </p>

        {/* Reference Number Box */}
        <div className="p-6 rounded-2xl bg-primary-50 border border-primary-200 mb-8 inline-flex flex-col items-center">
          <span className="text-xs font-semibold text-text-secondary mb-1">
            {dict.quoteForm.successMessage}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-black font-mono text-primary tracking-wider">
              {successResult.referenceNo}
            </span>
            <button
              onClick={copyRefToClipboard}
              className="p-2 rounded-lg bg-white border border-primary-300 text-primary hover:bg-primary-50 transition-colors"
              title="Copy Reference Number"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setSuccessResult(null);
              setFormData({
                customerName: "",
                companyName: "",
                phone: "",
                email: "",
                city: "الرياض",
                serviceType: "",
                projectDescription: "",
                quantity: "1",
                preferredDate: "",
                websiteUrlHoneypot: "",
              });
              setAttachments([]);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-white font-bold text-xs"
          >
            {isAr ? "إرسال طلب تسعير آخر" : "Submit Another RFQ"}
          </button>

          <a
            href="https://wa.me/966501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2"
          >
            <span>{isAr ? "متابعة الطلب عبر الواتساب" : "Follow up on WhatsApp"}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-border p-6 sm:p-10"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-bold mb-2">
          <FileText className="w-3.5 h-3.5" />
          <span>{dict.quoteForm.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
          {dict.quoteForm.title}
        </h2>
        <p className="mt-2 text-text-secondary text-sm leading-relaxed">
          {dict.quoteForm.subtitle}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Anti-spam honeypot (visually hidden) */}
        <input
          type="text"
          name="websiteUrlHoneypot"
          value={formData.websiteUrlHoneypot}
          onChange={(e) => setFormData({ ...formData, websiteUrlHoneypot: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        {/* Row 1: Name and Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-bold text-text-primary mb-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-brand-gold" />
              <span>{dict.quoteForm.customerName} *</span>
            </label>
            <input
              type="text"
              required
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder={dict.quoteForm.customerNamePlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-muted focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-2 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-brand-gold" />
              <span>{dict.quoteForm.companyName}</span>
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder={dict.quoteForm.companyNamePlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-muted focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 2: Phone and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-bold text-text-primary mb-2 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>{dict.quoteForm.phone} *</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder={dict.quoteForm.phonePlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-muted focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all font-mono"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-2 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-gold" />
              <span>{dict.quoteForm.email}</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={dict.quoteForm.emailPlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-muted focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all font-mono"
              dir="ltr"
            />
          </div>
        </div>

        {/* Row 3: City and Service Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-bold text-text-primary mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>{dict.quoteForm.city} *</span>
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-muted focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
            >
              {SAUDI_CITIES.map((c) => (
                <option key={c.en} value={isAr ? c.ar : c.en}>
                  {isAr ? c.ar : c.en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-brand-gold" />
              <span>{dict.quoteForm.serviceType} *</span>
            </label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-muted focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
            >
              <option value="">
                {isAr ? "-- اختر خط التصنيع أو الخدمة --" : "-- Select Manufacturing Division --"}
              </option>
              {FACTORY_SERVICES.map((srv) => (
                <option key={srv.id} value={isAr ? srv.titleAr : srv.titleEn}>
                  {isAr ? srv.titleAr : srv.titleEn}
                </option>
              ))}
              <option value="تصنيع أثاث مخصص خاص">
                {isAr ? "تصنيع أثاث مخصص خاص (Custom Joinery)" : "Custom Bespoke Joinery"}
              </option>
            </select>
          </div>
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-xs font-bold text-text-primary mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-brand-gold" />
            <span>{dict.quoteForm.projectDescription} *</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.projectDescription}
            onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
            placeholder={dict.quoteForm.projectDescriptionPlaceholder}
            className="w-full px-4 py-3 rounded-xl border border-border bg-surface-muted focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all resize-y"
          />
        </div>

        {/* Quantity and Target Handover Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-bold text-text-primary mb-2">
              {dict.quoteForm.quantity}
            </label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-muted focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-gold" />
              <span>{dict.quoteForm.preferredDate}</span>
            </label>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-muted focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all font-mono"
            />
          </div>
        </div>

        {/* Attachments Section */}
        <div>
          <label className="block text-xs font-bold text-text-primary mb-2">
            {dict.quoteForm.attachments}
          </label>
          <div className="border-2 border-dashed border-border hover:border-primary-300 rounded-2xl p-6 text-center bg-surface-muted/50 transition-colors">
            <UploadCloud className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-xs text-text-secondary font-medium mb-1">
              {isAr ? "اسحب وأفلت المخططات هنا أو" : "Drag and drop shop drawings here or"}
            </p>
            <label className="inline-block cursor-pointer px-4 py-1.5 rounded-lg bg-primary-100 text-primary hover:bg-primary-200 text-xs font-bold transition-colors">
              <span>{isAr ? "استعراض الملفات من جهازك" : "Browse Files"}</span>
              <input
                type="file"
                multiple
                accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.xlsx,.zip"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <p className="text-[11px] text-text-muted mt-2">
              {dict.quoteForm.attachmentsHelp}
            </p>
          </div>

          {/* Attached Files List */}
          {attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {attachments.map((fileName, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface-muted border border-border text-xs"
                >
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-mono text-text-primary">{fileName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                    className="text-rose-500 hover:text-rose-700 text-xs font-semibold"
                  >
                    {isAr ? "حذف" : "Remove"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Privacy Note */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-primary-50/60 border border-primary-100 text-xs text-text-secondary">
          <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
          <span>{dict.quoteForm.privacyNote}</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold/90 text-primary-950 font-bold text-sm tracking-wide shadow-xl shadow-brand-gold/25 hover:shadow-brand-gold/35 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-950 border-t-transparent rounded-full animate-spin" />
              <span>{dict.quoteForm.submitting}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{dict.quoteForm.submit}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default QuoteRequestForm;
