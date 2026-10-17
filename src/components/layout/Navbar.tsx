"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/types";
import { Logo } from "@/components/brand/Logo";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  Menu,
  X,
  Globe,
  PhoneCall,
  FileText,
  ChevronDown,
  Shield,
  Layers,
} from "lucide-react";

interface NavbarProps {
  locale: Locale;
}

export function Navbar({ locale }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname() || "";
  const dict = getDictionary(locale);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute alternative locale URL for the language switcher
  const targetLocale: Locale = locale === "ar" ? "en" : "ar";
  const switchLocaleHref = pathname.replace(`/${locale}`, `/${targetLocale}`) || `/${targetLocale}`;

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/catalog`, label: dict.nav.catalog },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/manufacturing`, label: dict.nav.manufacturing },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-primary-900/95 backdrop-blur-md shadow-xl py-3 border-b border-white/10"
            : "bg-gradient-to-b from-primary-950/80 via-primary-950/40 to-transparent py-5"
        }`}
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo
                locale={locale}
                variant="light"
                size="md"
                showSubtitle={true}
              />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 rtl:space-x-reverse">
              {navLinks.map((link) => {
                const isActive =
                  link.href === `/${locale}`
                    ? pathname === `/${locale}`
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-brand-gold bg-white/10 font-bold"
                        : "text-white/85 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Header Actions */}
            <div className="hidden lg:flex items-center space-x-3 rtl:space-x-reverse">
              {/* Language Switcher */}
              <Link
                href={switchLocaleHref}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 text-white/90 hover:text-white hover:border-brand-gold/60 hover:bg-white/5 text-xs font-semibold transition-all"
                title={locale === "ar" ? "Switch to English" : "التحويل للغة العربية"}
              >
                <Globe className="w-3.5 h-3.5 text-brand-gold" />
                <span>{dict.common.switchLang}</span>
              </Link>

              {/* Admin Portal Quick Link */}
              <Link
                href="/admin/dashboard"
                className="text-silver/60 hover:text-silver p-2 transition-colors"
                title={dict.common.adminPortal}
              >
                <Shield className="w-4 h-4" />
              </Link>

              {/* Request a Quote CTA */}
              <Link
                href={`/${locale}/request-quote`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-gold to-brand-gold/90 text-primary-950 hover:to-brand-gold px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>{dict.common.requestQuote}</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href={switchLocaleHref}
                className="p-2 rounded-lg text-white border border-white/20 text-xs font-semibold"
              >
                {targetLocale.toUpperCase()}
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-primary-950/95 backdrop-blur-xl pt-24 px-6 pb-8 overflow-y-auto animate-in fade-in duration-200"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive =
                link.href === `/${locale}`
                  ? pathname === `/${locale}`
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-brand-gold/20 text-brand-gold font-bold"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="border-t border-white/10 my-3 pt-3 flex flex-col gap-3">
              <Link
                href={`/${locale}/request-quote`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-brand-gold text-primary-950 font-bold py-3.5 px-4 rounded-xl text-center shadow-lg shadow-brand-gold/25"
              >
                <FileText className="w-5 h-5" />
                <span>{dict.common.requestQuote}</span>
              </Link>

              <div className="flex items-center justify-between text-silver text-xs px-2 pt-2">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 hover:text-white"
                >
                  <Shield className="w-4 h-4 text-brand-gold" />
                  <span>{dict.common.adminPortal}</span>
                </Link>

                <a
                  href="tel:+966114987000"
                  className="flex items-center gap-1.5 hover:text-white"
                >
                  <PhoneCall className="w-4 h-4 text-brand-gold" />
                  <span>011 498 7000</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
