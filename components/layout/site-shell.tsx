"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  Globe,
  Mail,
  MapPin,
  Menu,
  MoonStar,
  Phone,
  Send,
  SunMedium,
  UserRound,
  X,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import { type AppLocale } from "@/constants/site";
import { useLocaleSwitcher } from "@/hooks/use-locale-switcher";
import type { Messages } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { Container } from "@/components/ui/container";
import { useTheme } from "@/components/ui/theme-provider";

const socialIcons = [FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube];
const socialLabels = ["Facebook", "Instagram", "X", "LinkedIn", "YouTube"];

type SiteShellProps = {
  locale: AppLocale;
  messages: Messages;
  children: ReactNode;
};

export function SiteShell({ locale, messages, children }: SiteShellProps) {
  const { theme, toggleTheme } = useTheme();
  const { isPending, switchLocale } = useLocaleSwitcher();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const isDark = theme === "dark";
  const otherLocale = locale === "bn" ? "en" : "bn";
  const loginLabel = locale === "bn" ? "লগইন" : "Login";
  const staticLabels =
    locale === "bn"
      ? {
          whatsapp: "হোয়াটসঅ্যাপ",
        }
      : {
          whatsapp: "WhatsApp",
        };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={cn("min-h-screen overflow-x-hidden", isDark && "bg-[#071510] text-[#ecf4ef]")}>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[90] h-1 origin-left bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#F59E0B]"
        style={{ scaleX: progressScaleX }}
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled ? "py-3" : "py-5"
        )}
      >
        <Container>
          <div
            className={cn(
              "flex items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl transition-all md:px-6",
              isScrolled
                ? isDark
                  ? "border-white/10 bg-[#10201a]/90 shadow-[0_24px_60px_rgba(0,0,0,0.24)]"
                  : "border-white/60 bg-white/90 shadow-[0_24px_60px_rgba(15,118,110,0.14)]"
                : "border-white/12 bg-white/8"
            )}
          >
            <Link className="flex items-center" href="/#home">
              <span className="flex h-12 w-[168px] items-center justify-center overflow-hidden rounded-[10px] bg-white px-2 shadow-lg shadow-[#14B8A6]/20 sm:w-[184px]">
                <Image
                  alt={`${messages.common.brand} logo`}
                  className="h-full w-full object-contain"
                  height={48}
                  priority
                  src="/logo.png"
                  width={184}
                />
              </span>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {[
                ["home", "#home"],
                ["about", "#about"],
                ["services", "#services"],
                ["projects", "#projects"],
                ["volunteers", "#volunteers"],
                ["blog", "#blog"],
                ["contact", "#contact"],
              ].map(([key, hash]) => (
                <Link
                  key={key}
                  className={cn(
                    "text-sm font-semibold transition hover:text-[#F59E0B]",
                    isScrolled
                      ? isDark
                        ? "text-white/84"
                        : "text-slate-700"
                      : "text-white/90"
                  )}
                  href={`/${hash}`}
                >
                  {messages.nav[key as keyof typeof messages.nav]}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                aria-label={loginLabel}
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center rounded-full border transition hover:-translate-y-0.5",
                  isScrolled
                    ? isDark
                      ? "border-white/10 bg-[#0c1915] text-white"
                      : "border-slate-200 bg-white text-slate-700"
                    : "border-white/16 bg-white/10 text-white"
                )}
                href="/login"
              >
                <UserRound className="h-5 w-5" />
              </Link>
              <button
                aria-label={messages.common.languageLabel}
                className={cn(
                  "inline-flex h-12 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition",
                  isScrolled
                    ? isDark
                      ? "border-white/10 bg-[#0c1915] text-white"
                      : "border-slate-200 bg-white text-slate-700"
                    : "border-white/16 bg-white/10 text-white"
                )}
                disabled={isPending}
                onClick={() => switchLocale(otherLocale)}
                type="button"
              >
                <Globe className="h-4 w-4" />
                {otherLocale.toUpperCase()}
              </button>
              <button
                aria-label={messages.common.themeToggle}
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center rounded-full border transition",
                  isScrolled
                    ? isDark
                      ? "border-white/10 bg-[#0c1915] text-white"
                      : "border-slate-200 bg-white text-slate-700"
                    : "border-white/16 bg-white/10 text-white"
                )}
                onClick={toggleTheme}
                type="button"
              >
                {isDark ? <SunMedium className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
              </button>
              <Button
                className="rounded-full bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#F59E0B] px-6 text-white"
                href="/#projects"
              >
                {messages.nav.donate}
              </Button>
            </div>

            <button
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden",
                isScrolled
                  ? isDark
                    ? "border-white/10 bg-[#0c1915] text-white"
                    : "border-slate-200 bg-white text-slate-700"
                  : "border-white/20 bg-white/10 text-white"
              )}
              onClick={() => setMenuOpen((value) => !value)}
              type="button"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "mt-3 rounded-[28px] border p-4 shadow-[0_24px_60px_rgba(15,23,42,0.16)] lg:hidden",
                  isDark ? "border-white/10 bg-[#10201a]" : "border-slate-200 bg-white"
                )}
                exit={{ opacity: 0, y: -12 }}
                initial={{ opacity: 0, y: -12 }}
              >
                <div className="flex flex-col gap-2">
                  <Link
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                      isDark ? "text-white hover:bg-white/6" : "text-slate-700 hover:bg-slate-50"
                    )}
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                  >
                    {loginLabel}
                  </Link>
                  {[
                    ["home", "#home"],
                    ["about", "#about"],
                    ["services", "#services"],
                    ["projects", "#projects"],
                    ["volunteers", "#volunteers"],
                    ["blog", "#blog"],
                    ["contact", "#contact"],
                  ].map(([key, hash]) => (
                    <Link
                      key={key}
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                        isDark ? "text-white hover:bg-white/6" : "text-slate-700 hover:bg-slate-50"
                      )}
                      href={`/${hash}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {messages.nav[key as keyof typeof messages.nav]}
                    </Link>
                  ))}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      className={cn(
                        "rounded-full border px-4 py-3 text-sm font-semibold transition",
                        isDark ? "border-white/10 bg-[#0c1915] text-white" : "border-slate-200 bg-white text-slate-700"
                      )}
                      onClick={() => switchLocale(otherLocale)}
                      type="button"
                    >
                      {messages.common.languageLabel}: {otherLocale.toUpperCase()}
                    </button>
                    <button
                      className={cn(
                        "rounded-full border px-4 py-3 text-sm font-semibold transition",
                        isDark ? "border-white/10 bg-[#0c1915] text-white" : "border-slate-200 bg-white text-slate-700"
                      )}
                      onClick={toggleTheme}
                      type="button"
                    >
                      {isDark ? messages.common.lightMode : messages.common.darkMode}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Container>
      </header>

      {children}

      <footer className="relative overflow-hidden bg-[#042f2e] text-emerald-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.16),transparent_22%)]" />
        <Container className="relative py-18 sm:py-22">
          <div className="grid gap-10 rounded-[36px] border border-white/8 bg-white/4 p-8 backdrop-blur-sm lg:grid-cols-[1.05fr_0.72fr_0.9fr_0.9fr] lg:p-10">
            <div className="max-w-md">
              <div className="flex items-center">
                <span className="flex h-14 w-[196px] items-center justify-center overflow-hidden rounded-[10px] bg-white px-2">
                  <Image
                    alt={`${messages.common.brand} logo`}
                    className="h-full w-full object-contain"
                    height={56}
                    src="/logo.png"
                    width={196}
                  />
                </span>
              </div>
              <p className="mt-6 text-lg leading-8 text-emerald-50/74">{messages.footer.about}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {socialIcons.map((Icon, index) => (
                  <Link
                    key={socialLabels[index]}
                    aria-label={socialLabels[index]}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-emerald-100 transition hover:-translate-y-1 hover:border-[#FDE7B4] hover:text-white"
                    href="/#contact"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">{messages.footer.quickLinks}</h3>
              <div className="mt-5 flex flex-col gap-3">
                {[
                  [messages.nav.home, "#home"],
                  [messages.nav.about, "#about"],
                  [messages.nav.services, "#services"],
                  [messages.nav.projects, "#projects"],
                  [messages.nav.blog, "#blog"],
                  [messages.nav.contact, "#contact"],
                ].map(([label, hash]) => (
                  <Link key={hash} className="text-sm text-emerald-50/70 transition hover:text-white" href={`/${hash}`}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">{messages.footer.contact}</h3>
              <div className="mt-5 space-y-4 text-sm text-emerald-50/72">
                <p className="flex items-start gap-3 leading-7">
                  <Mail className="mt-1 h-4 w-4 text-[#FDE7B4]" />
                  hello@sunhacare.org
                </p>
                <p className="flex items-start gap-3 leading-7">
                  <Phone className="mt-1 h-4 w-4 text-[#FDE7B4]" />
                  +880 1700-000000
                </p>
                <p className="flex items-start gap-3 leading-7">
                  <MapPin className="mt-1 h-4 w-4 text-[#FDE7B4]" />
                  {messages.contact.addressValue}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">{messages.footer.newsletter}</h3>
              <p className="mt-5 text-sm leading-7 text-emerald-50/70">{messages.footer.newsletterText}</p>
              <form className="mt-5 space-y-3">
                <input className="h-12 w-full rounded-2xl border border-white/10 bg-white/6 px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[#FDE7B4]" placeholder={messages.footer.newsletterPlaceholder} type="email" />
                <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#F59E0B] px-5 text-sm font-semibold text-white transition hover:brightness-105" type="submit">
                  {messages.footer.newsletterButton}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-emerald-50/46 sm:flex-row sm:items-center sm:justify-between">
            <p>{messages.common.allRightsReserved}</p>
            <p>{messages.common.developedBy}</p>
          </div>
        </Container>
      </footer>

      <motion.a
        animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : 18 }}
        aria-label="WhatsApp"
        className={cn(
          "fixed bottom-5 right-5 z-[70] flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-[0_22px_50px_rgba(37,211,102,0.35)] transition sm:bottom-6 sm:right-6",
          isScrolled ? "pointer-events-auto" : "pointer-events-none"
        )}
        href={`https://wa.me/8801700000000?text=${encodeURIComponent(messages.common.brand)}`}
        rel="noreferrer"
        target="_blank"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/18 text-2xl">
          <FaWhatsapp />
        </span>
        <span className="hidden pr-1 text-sm font-semibold sm:block">{staticLabels.whatsapp}</span>
      </motion.a>
    </div>
  );
}
