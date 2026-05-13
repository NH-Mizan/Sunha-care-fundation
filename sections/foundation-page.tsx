"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Droplets,
  Eye,
  HandHeart,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Play,
  Quote,
  Send,
  ShieldPlus,
  Sparkles,
  Stethoscope,
  Tag,
  X,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import type { AppLocale } from "@/constants/site";
import { getBlogPosts } from "@/lib/blog";
import type { Messages } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { Container } from "@/components/ui/container";
import { useTheme } from "@/components/ui/theme-provider";

const serviceIcons = [
  HandHeart,
  Stethoscope,
  BookOpen,
  ShieldPlus,
  Sparkles,
  Droplets,
];

const teamImages = [
  "https://images.unsplash.com/photo-1593113598332-cd59a93e9c98?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&q=80",
];

const socialIcons = [FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube];

const socialLabels = ["Facebook", "Instagram", "X", "LinkedIn", "YouTube"];

const storyImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
];

const galleryImages = [
  {
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    height: "h-[360px]",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469571486292-b53601020f60?auto=format&fit=crop&w=1200&q=80",
    height: "h-[260px]",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
    height: "h-[420px]",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    height: "h-[300px]",
  },
  {
    image:
      "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=1200&q=80",
    height: "h-[340px]",
  },
  {
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
    height: "h-[280px]",
  },
];

function AnimatedCount({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const numeric = Number.parseInt(value.replace(/[^\d]/g, ""), 10);
  const [displayValue, setDisplayValue] = useState(() =>
    Number.isNaN(numeric) ? value : "0"
  );

  useEffect(() => {
    if (!isInView || Number.isNaN(numeric)) {
      return;
    }

    let frame = 0;
    const totalFrames = 36;
    const timer = window.setInterval(() => {
      frame += 1;
      const nextValue = Math.round((numeric * frame) / totalFrames);
      const suffix = value.replace(/[\d,]/g, "");
      setDisplayValue(`${nextValue.toLocaleString()}${suffix}`);

      if (frame >= totalFrames) {
        window.clearInterval(timer);
        setDisplayValue(value);
      }
    }, 35);

    return () => window.clearInterval(timer);
  }, [isInView, numeric, value]);

  return (
    <span ref={ref}>{displayValue}</span>
  );
}

type FoundationPageProps = {
  locale: AppLocale;
  messages: Messages;
};

export function FoundationPage({ locale, messages }: FoundationPageProps) {
  const { theme } = useTheme();
  const blogPosts = getBlogPosts(locale, messages).slice(0, 3);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeStory, setActiveStory] = useState(0);

  const isDark = theme === "dark";
  const staticLabels = locale === "bn"
    ? {
        trustedSince: "বিশ্বস্ততা",
        learnMore: "আরও জানুন",
        view: "দেখুন",
        preview: "প্রিভিউ",
      }
    : {
        trustedSince: "Trusted Since",
        learnMore: "Learn more",
        view: "View",
        preview: "Preview",
      };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStory((current) => (current + 1) % messages.stories.items.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [messages.stories.items.length]);

  const currentStory = messages.stories.items[activeStory];

  return (
    <>
      <section
        className="relative flex min-h-screen items-center overflow-hidden bg-[#042f2e] pt-28 text-white"
        id="home"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(4,47,46,0.72), rgba(4,47,46,0.82)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.24),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_22%)]" />

        <Container className="relative z-10 grid items-center gap-16 py-16 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm text-white/88 backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Sparkles className="h-4 w-4 text-[#F59E0B]" />
              {messages.hero.eyebrow}
            </motion.div>

            <motion.h1
              className="mt-7 max-w-4xl font-[family:var(--font-display)] text-5xl font-semibold leading-[1.02] sm:text-6xl xl:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {messages.hero.title}
            </motion.h1>

            <motion.p
              className="mt-6 max-w-2xl text-lg leading-8 text-white/78"
              initial={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {messages.hero.description}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Button
                className="rounded-full bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#F59E0B] px-7 text-white"
                href="/#projects"
                size="lg"
              >
                {messages.hero.primaryCta}
              </Button>
              <Button
                className="rounded-full border border-white/16 bg-white/10 px-7 text-white hover:bg-white/16"
                href="/#volunteers"
                size="lg"
                variant="secondary"
              >
                {messages.hero.secondaryCta}
              </Button>
            </motion.div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {messages.hero.stats.map((item) => (
                <motion.div
                  key={item.label}
                  className="rounded-[28px] border border-white/12 bg-white/10 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-md"
                  initial={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.55 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <p className="text-4xl font-semibold text-white">
                    <AnimatedCount value={item.value} />
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/72">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 26 }}
            transition={{ duration: 0.7 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="rounded-[34px] border border-white/12 bg-white/10 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
              <div className="rounded-[30px] bg-white/95 p-7 text-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.26em] text-slate-500">
                      {messages.hero.impactCard.label}
                    </p>
                    <h3 className="mt-2 font-[family:var(--font-display)] text-4xl font-semibold">
                      {messages.hero.impactCard.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white">
                    {messages.hero.impactCard.tag}
                  </span>
                </div>

                <div className="mt-8 space-y-5">
                  <div className="rounded-[24px] bg-slate-50 p-5">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{messages.hero.impactCard.progressLabel}</span>
                      <span>76%</span>
                    </div>
                    <div className="mt-3 h-3 rounded-full bg-slate-200">
                      <div className="h-3 w-[76%] rounded-full bg-gradient-to-r from-[#0F766E] to-[#F59E0B]" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] bg-[#0F766E] p-5 text-white">
                      <p className="text-sm text-white/70">{messages.hero.impactCard.children}</p>
                      <p className="mt-2 text-3xl font-semibold">480</p>
                    </div>
                    <div className="rounded-[24px] bg-[#FDE7B4] p-5 text-slate-900">
                      <p className="text-sm text-slate-500">{messages.hero.impactCard.camp}</p>
                      <p className="mt-2 text-3xl font-semibold">2,140</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              className="absolute -left-2 top-8 hidden rounded-full border border-white/14 bg-white/10 px-5 py-3 text-sm text-white/88 backdrop-blur md:flex"
              transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
            >
              {messages.hero.floatingLabel}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className={cn("py-24", isDark ? "bg-[#071510]" : "bg-[#F8FAFC]")} id="about">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.7 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="absolute -left-4 top-8 h-28 w-28 rounded-full bg-[#F59E0B]/30 blur-3xl" />
              <div
                className={cn(
                  "relative overflow-hidden rounded-[36px] border p-4 shadow-[0_30px_70px_rgba(15,23,42,0.08)]",
                  isDark ? "border-white/10 bg-[#10201a]" : "border-slate-200 bg-white"
                )}
              >
                <div
                  className="h-[520px] rounded-[28px] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(15,118,110,0.08), rgba(15,118,110,0.18)), url('https://images.unsplash.com/photo-1469571486292-b53601020f60?auto=format&fit=crop&w=1200&q=80')",
                  }}
                />
                <div className="absolute bottom-10 left-10 rounded-[24px] bg-white/90 p-5 shadow-lg backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{staticLabels.trustedSince}</p>
                  <p className="mt-2 font-[family:var(--font-display)] text-4xl font-semibold text-slate-900">2014</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.7 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0F766E]">
                {messages.about.eyebrow}
              </p>
              <h2 className={cn("mt-5 font-[family:var(--font-display)] text-5xl font-semibold leading-tight sm:text-6xl", isDark ? "text-white" : "text-slate-900")}>
                {messages.about.title}
              </h2>
              <p className={cn("mt-6 max-w-2xl text-lg leading-8", isDark ? "text-white/68" : "text-slate-600")}>
                {messages.about.description}
              </p>

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <div className={cn("rounded-[28px] border p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]", isDark ? "border-white/10 bg-[#10201a]" : "border-slate-200 bg-white")}>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
                    {messages.about.missionTitle}
                  </p>
                  <p className={cn("mt-3 leading-7", isDark ? "text-white/68" : "text-slate-600")}>
                    {messages.about.mission}
                  </p>
                </div>
                <div className="rounded-[28px] bg-[#0F766E] p-6 shadow-[0_18px_40px_rgba(15,118,110,0.16)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#FDE7B4]">
                    {messages.about.visionTitle}
                  </p>
                  <p className="mt-3 leading-7 text-white/80">{messages.about.vision}</p>
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {messages.about.stats.map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      "rounded-[24px] p-5",
                      isDark ? "bg-[#10201a]" : "bg-[#E7F8F5]"
                    )}
                  >
                    <p className={cn("text-3xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
                      {item.value}
                    </p>
                    <p className={cn("mt-2 text-sm leading-6", isDark ? "text-white/65" : "text-slate-600")}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className={cn("py-24", isDark ? "bg-[#0b1a15]" : "bg-[#ECFEFF]")} id="services">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0F766E]">
              {messages.services.eyebrow}
            </p>
            <h2 className={cn("mt-5 font-[family:var(--font-display)] text-5xl font-semibold sm:text-6xl", isDark ? "text-white" : "text-slate-900")}>
              {messages.services.title}
            </h2>
            <p className={cn("mt-5 text-lg leading-8", isDark ? "text-white/68" : "text-slate-600")}>
              {messages.services.description}
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {messages.services.items.map((item, index) => {
              const Icon = serviceIcons[index];

              return (
                <motion.div
                  key={item.title}
                  className={cn(
                    "group rounded-[30px] border p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#14B8A6]/60 hover:shadow-[0_28px_65px_rgba(15,118,110,0.12)]",
                    isDark ? "border-white/10 bg-[#10201a]" : "border-slate-200 bg-white"
                  )}
                  initial={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E] text-[#FDE7B4] transition group-hover:bg-gradient-to-br group-hover:from-[#0F766E] group-hover:to-[#14B8A6] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className={cn("mt-6 text-2xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
                    {item.title}
                  </h3>
                  <p className={cn("mt-4 leading-7", isDark ? "text-white/68" : "text-slate-600")}>
                    {item.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#0F766E]">
                    {staticLabels.learnMore}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={cn("py-24", isDark ? "bg-[#071510]" : "bg-[#F8FAFC]")} id="projects">
        <Container>
          <div className={cn("rounded-[40px] border p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10 lg:p-14", isDark ? "border-white/10 bg-[#10201a]" : "border-slate-200 bg-white")}>
            <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0F766E]">
                  {messages.donation.eyebrow}
                </p>
                <h2 className={cn("mt-5 font-[family:var(--font-display)] text-5xl font-semibold leading-tight", isDark ? "text-white" : "text-slate-900")}>
                  {messages.donation.title}
                </h2>
                <p className={cn("mt-5 text-lg leading-8", isDark ? "text-white/68" : "text-slate-600")}>
                  {messages.donation.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button
                    className="rounded-full bg-gradient-to-r from-[#0F766E] to-[#14B8A6] px-7 text-white"
                    href="/#contact"
                    size="lg"
                  >
                    {messages.donation.primaryCta}
                  </Button>
                  <Button
                    className="rounded-full border border-[#99F6E4] bg-[#F0FDFA] px-7 text-[#0F766E]"
                    href="/#volunteers"
                    size="lg"
                    variant="secondary"
                  >
                    {messages.donation.secondaryCta}
                  </Button>
                </div>
              </div>

              <div className="rounded-[32px] bg-[linear-gradient(135deg,#0F766E_0%,#14B8A6_58%,#F59E0B_170%)] p-7 text-white sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-white/68">
                      {messages.donation.progressLabel}
                    </p>
                    <p className="mt-3 font-[family:var(--font-display)] text-4xl font-semibold">
                      {messages.donation.progressTitle}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
                    {messages.donation.progressTag}
                  </span>
                </div>

                <div className="mt-8 rounded-full bg-white/14 p-1">
                  <motion.div
                    className="h-4 rounded-full bg-gradient-to-r from-[#FDE7B4] via-[#F59E0B] to-white"
                    initial={{ width: 0 }}
                    transition={{ duration: 1.1 }}
                    whileInView={{ width: "72%" }}
                  />
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] bg-white/10 p-5 backdrop-blur">
                    <p className="text-sm text-white/72">{messages.donation.raised}</p>
                    <p className="mt-3 text-4xl font-semibold">$36,000</p>
                  </div>
                  <div className="rounded-[24px] bg-white/10 p-5 backdrop-blur">
                    <p className="text-sm text-white/72">{messages.donation.goal}</p>
                    <p className="mt-3 text-4xl font-semibold">$50,000</p>
                  </div>
                </div>

                <div className="mt-6 rounded-[26px] bg-white/92 p-6 text-slate-900">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
                    {messages.donation.whyTitle}
                  </p>
                  <p className="mt-3 leading-7 text-slate-600">{messages.donation.whyText}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className={cn("py-24 text-white", isDark ? "bg-[#0a1d18]" : "bg-[#0F766E]")} id="volunteers">
        <Container className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FDE7B4]">
              {messages.volunteer.eyebrow}
            </p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl font-semibold leading-tight sm:text-6xl">
              {messages.volunteer.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/74">
              {messages.volunteer.description}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {messages.volunteer.benefits.map((benefit) => (
                <div key={benefit} className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-[#F59E0B]/16 text-[#FDE7B4]">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <p className="text-sm leading-7 text-white/82">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {messages.volunteer.highlights.map((item) => (
                <div key={item.label} className="rounded-[26px] border border-white/12 bg-white/8 p-5">
                  <p className="text-3xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-white/65">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[30px] border border-[#F59E0B]/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(245,158,11,0.12))] p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-[#FDE7B4]">
                {messages.volunteer.ctaTitle}
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">
                {messages.volunteer.ctaText}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button
                  className="rounded-full bg-gradient-to-r from-[#14B8A6] to-[#F59E0B] px-7 text-white"
                  href="/#contact"
                  size="lg"
                >
                  {messages.volunteer.primaryCta}
                </Button>
                <Button
                  className="rounded-full border border-white/14 bg-white/8 px-7 text-white"
                  href="/#stories"
                  size="lg"
                  variant="secondary"
                >
                  {messages.volunteer.secondaryCta}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {teamImages.map((image, index) => (
                <div
                  key={image}
                  className={cn(
                    "group relative overflow-hidden rounded-[28px] border border-white/12 bg-[#234236] shadow-[0_20px_60px_rgba(5,14,11,0.24)]",
                    index === 1 ? "sm:translate-y-8" : ""
                  )}
                >
                  <div
                    className="h-56 bg-cover bg-center transition duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${image}')` }}
                  />
                </div>
              ))}
            </div>

            <div className="rounded-[34px] bg-white p-6 text-slate-900 shadow-[0_26px_60px_rgba(8,20,16,0.28)] sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F766E] text-[#FDE7B4]">
                  <HeartHandshake className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-500">
                    {messages.volunteer.formSubtitle}
                  </p>
                  <p className="text-xl font-semibold">{messages.volunteer.formTitle}</p>
                </div>
              </div>

              <form className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#14B8A6]" placeholder={messages.volunteer.fields.name} />
                  <input className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#14B8A6]" placeholder={messages.volunteer.fields.email} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#14B8A6]" placeholder={messages.volunteer.fields.phone} />
                  <input className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#14B8A6]" placeholder={messages.volunteer.fields.interest} />
                </div>
                <textarea className="min-h-32 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none focus:border-[#14B8A6]" placeholder={messages.volunteer.fields.message} />
                <Button className="rounded-full bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white" size="lg" type="submit">
                  {messages.volunteer.fields.submit}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      <section className={cn("py-24", isDark ? "bg-[#0b1a15]" : "bg-[#ECFEFF]")} id="stories">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0F766E]">
              {messages.stories.eyebrow}
            </p>
            <h2 className={cn("mt-5 font-[family:var(--font-display)] text-5xl font-semibold sm:text-6xl", isDark ? "text-white" : "text-slate-900")}>
              {messages.stories.title}
            </h2>
            <p className={cn("mt-5 text-lg leading-8", isDark ? "text-white/68" : "text-slate-600")}>
              {messages.stories.description}
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
            <div className={cn("rounded-[34px] border p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8", isDark ? "border-white/10 bg-[#10201a]" : "border-slate-200 bg-white")}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[#0F766E]">
                    {messages.stories.spotlight}
                  </p>
                  <h3 className={cn("mt-3 font-[family:var(--font-display)] text-4xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
                    {messages.stories.voices}
                  </h3>
                </div>
                <div className="hidden gap-3 sm:flex">
                  <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50" onClick={() => setActiveStory((activeStory - 1 + messages.stories.items.length) % messages.stories.items.length)} type="button">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50" onClick={() => setActiveStory((activeStory + 1) % messages.stories.items.length)} type="button">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-[30px] bg-[#0F766E] text-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStory.name}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid gap-6 p-6 sm:p-8"
                    exit={{ opacity: 0, y: -16 }}
                    initial={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.45 }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="h-18 w-18 rounded-[24px] bg-cover bg-center"
                        style={{ backgroundImage: `url('${storyImages[activeStory]}')` }}
                      />
                      <div>
                        <p className="text-xl font-semibold">{currentStory.name}</p>
                        <p className="text-sm text-white/68">{currentStory.role}</p>
                      </div>
                    </div>
                    <Quote className="h-10 w-10 text-[#FDE7B4]" />
                    <p className="text-2xl leading-10 text-white/88">{currentStory.quote}</p>
                    <div className="rounded-[24px] bg-white/8 p-5">
                      <p className="text-sm uppercase tracking-[0.22em] text-[#FDE7B4]">
                        {messages.stories.impactLabel}
                      </p>
                      <p className="mt-3 text-base leading-7 text-white/78">{currentStory.impact}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="grid gap-6">
              {messages.stories.items.map((story, index) => (
                <div
                  key={story.name}
                  className={cn(
                    "rounded-[30px] border p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] transition",
                    activeStory === index
                      ? "border-[#14B8A6] bg-[#F0FDFA]"
                      : isDark
                        ? "border-white/10 bg-[#10201a]"
                        : "border-slate-200 bg-white"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-[22px] bg-cover bg-center" style={{ backgroundImage: `url('${storyImages[index]}')` }} />
                    <div className="flex-1">
                      <p className={cn("text-lg font-semibold", isDark ? "text-white" : "text-slate-900")}>
                        {story.name}
                      </p>
                      <p className={cn("text-sm", isDark ? "text-white/62" : "text-slate-500")}>
                        {story.role}
                      </p>
                    </div>
                    <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" onClick={() => setActiveStory(index)} type="button">
                      {staticLabels.view}
                    </button>
                  </div>
                  <p className={cn("mt-4 text-base leading-7", isDark ? "text-white/68" : "text-slate-600")}>
                    {story.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className={cn("py-24", isDark ? "bg-[#071510]" : "bg-[#F8FAFC]")} id="gallery">
        <Container>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0F766E]">
              {messages.gallery.eyebrow}
            </p>
            <h2 className={cn("mt-5 font-[family:var(--font-display)] text-5xl font-semibold sm:text-6xl", isDark ? "text-white" : "text-slate-900")}>
              {messages.gallery.title}
            </h2>
            <p className={cn("mx-auto mt-5 max-w-3xl text-lg leading-8", isDark ? "text-white/68" : "text-slate-600")}>
              {messages.gallery.description}
            </p>
          </div>

          <div className="mt-14 columns-1 gap-6 md:columns-2 xl:columns-3">
            {messages.gallery.items.map((item, index) => (
              <button
                key={item.title}
                className={cn(
                  "group relative mb-6 block w-full overflow-hidden rounded-[30px] border text-left shadow-[0_18px_45px_rgba(15,23,42,0.08)]",
                  isDark ? "border-white/10 bg-[#10201a]" : "border-slate-200 bg-white"
                )}
                onClick={() => setLightboxIndex(index)}
                type="button"
              >
                <div className={cn("overflow-hidden", galleryImages[index].height)}>
                  <div className="h-full w-full bg-cover bg-center transition duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${galleryImages[index].image}')` }} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#042f2e]/82 via-[#042f2e]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-[#FDE7B4]">{item.category}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{item.title}</p>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/16 bg-white/10 text-white backdrop-blur">
                    <Eye className="h-5 w-5" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className={cn("py-24", isDark ? "bg-[#0b1a15]" : "bg-[#ECFEFF]")} id="blog">
        <Container>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0F766E]">
              {messages.blog.eyebrow}
            </p>
            <h2 className={cn("mt-5 font-[family:var(--font-display)] text-5xl font-semibold sm:text-6xl", isDark ? "text-white" : "text-slate-900")}>
              {messages.blog.title}
            </h2>
            <p className={cn("mx-auto mt-5 max-w-3xl text-lg leading-8", isDark ? "text-white/68" : "text-slate-600")}>
              {messages.blog.description}
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className={cn(
                  "overflow-hidden rounded-[8px] border shadow-[0_20px_55px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]",
                  isDark ? "border-white/10 bg-[#10201a]" : "border-slate-200 bg-white"
                )}
              >
                <Link className="block" href={`/blog/${post.slug}`}>
                  <div className="overflow-hidden">
                    <div className="h-64 bg-cover bg-center transition duration-700 hover:scale-105" style={{ backgroundImage: `url('${post.image}')` }} />
                  </div>
                  <div className="p-6">
                    <div className={cn("flex flex-wrap items-center gap-4 text-sm", isDark ? "text-white/62" : "text-slate-500")}>
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-[#0F766E]" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Tag className="h-4 w-4 text-[#0F766E]" />
                        {post.category}
                      </span>
                    </div>
                    <h3 className={cn("mt-5 text-2xl font-semibold leading-8", isDark ? "text-white" : "text-slate-900")}>
                      {post.title}
                    </h3>
                    <p className={cn("mt-4 min-h-[84px] text-base leading-7", isDark ? "text-white/70" : "text-slate-600")}>
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button className="rounded-full bg-[#16A34A] px-8 text-white hover:bg-[#15803D] dark:bg-[#16A34A] dark:text-white dark:hover:bg-[#15803D]" href="/blog">
              {messages.blog.seeMore}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      <section className={cn("py-24", isDark ? "bg-[#071510]" : "bg-[#F8FAFC]")} id="contact">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="rounded-[36px] bg-[#0F766E] p-7 text-white shadow-[0_30px_70px_rgba(15,118,110,0.24)] sm:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FDE7B4]">
                {messages.contact.eyebrow}
              </p>
              <h2 className="mt-5 font-[family:var(--font-display)] text-5xl font-semibold leading-tight">
                {messages.contact.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/72">{messages.contact.description}</p>

              <div className="mt-10 space-y-4">
                <div className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/6 p-5">
                  <Mail className="mt-1 h-5 w-5 text-[#FDE7B4]" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/55">{messages.contact.email}</p>
                    <p className="mt-2 text-lg font-semibold">hello@sunhacare.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/6 p-5">
                  <Phone className="mt-1 h-5 w-5 text-[#FDE7B4]" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/55">{messages.contact.phone}</p>
                    <p className="mt-2 text-lg font-semibold">+880 1700-000000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/6 p-5">
                  <MapPin className="mt-1 h-5 w-5 text-[#FDE7B4]" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/55">{messages.contact.address}</p>
                    <p className="mt-2 text-lg font-semibold">{messages.contact.addressValue}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {socialIcons.map((Icon, index) => (
                  <Link
                    key={socialLabels[index]}
                    aria-label={socialLabels[index]}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-white transition hover:-translate-y-1 hover:border-[#FDE7B4] hover:text-[#FDE7B4]"
                    href="/#contact"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className={cn("rounded-[36px] border p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8", isDark ? "border-white/10 bg-[#10201a]" : "border-slate-200 bg-white")}>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F766E] text-[#FDE7B4]">
                    <Send className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-[#0F766E]">{messages.contact.formSubtitle}</p>
                    <p className={cn("text-xl font-semibold", isDark ? "text-white" : "text-slate-900")}>{messages.contact.formTitle}</p>
                  </div>
                </div>

                <form className="mt-6 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input className={cn("h-12 rounded-2xl border px-4 text-sm outline-none transition focus:border-[#14B8A6]", isDark ? "border-white/10 bg-[#0b1a15] text-white" : "border-slate-200 bg-slate-50 text-slate-900")} placeholder={messages.contact.fields.name} />
                    <input className={cn("h-12 rounded-2xl border px-4 text-sm outline-none transition focus:border-[#14B8A6]", isDark ? "border-white/10 bg-[#0b1a15] text-white" : "border-slate-200 bg-slate-50 text-slate-900")} placeholder={messages.contact.fields.email} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input className={cn("h-12 rounded-2xl border px-4 text-sm outline-none transition focus:border-[#14B8A6]", isDark ? "border-white/10 bg-[#0b1a15] text-white" : "border-slate-200 bg-slate-50 text-slate-900")} placeholder={messages.contact.fields.phone} />
                    <input className={cn("h-12 rounded-2xl border px-4 text-sm outline-none transition focus:border-[#14B8A6]", isDark ? "border-white/10 bg-[#0b1a15] text-white" : "border-slate-200 bg-slate-50 text-slate-900")} placeholder={messages.contact.fields.topic} />
                  </div>
                  <textarea className={cn("min-h-40 rounded-[24px] border px-4 py-4 text-sm outline-none transition focus:border-[#14B8A6]", isDark ? "border-white/10 bg-[#0b1a15] text-white" : "border-slate-200 bg-slate-50 text-slate-900")} placeholder={messages.contact.fields.message} />
                  <Button className="rounded-full bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white" size="lg" type="submit">
                    {messages.contact.fields.submit}
                  </Button>
                </form>
              </div>

              <div className={cn("overflow-hidden rounded-[36px] border p-3 shadow-[0_24px_70px_rgba(15,23,42,0.08)]", isDark ? "border-white/10 bg-[#10201a]" : "border-slate-200 bg-white")}>
                <div className="flex items-center justify-between px-4 pb-3 pt-2">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-[#0F766E]">{messages.contact.visitTitle}</p>
                    <p className={cn("mt-1 font-semibold", isDark ? "text-white" : "text-slate-900")}>{messages.contact.visitOffice}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#F0FDFA] px-4 py-2 text-sm font-semibold text-[#0F766E]">
                    <Clock3 className="h-4 w-4" />
                    {messages.contact.hours}
                  </div>
                </div>
                <iframe
                  className="h-[320px] w-full rounded-[28px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Dhanmondi%2C%20Dhaka&z=13&output=embed"
                  title="Sunha Care Foundation map"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#041311]/90 p-4 backdrop-blur-md"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <button
              aria-label="Close gallery preview"
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white"
              onClick={() => setLightboxIndex(null)}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              aria-label="Previous image"
              className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white md:flex"
              onClick={() => setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)}
              type="button"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="w-full max-w-5xl overflow-hidden rounded-[34px] border border-white/10 bg-[#112a22] shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="h-[70vh] min-h-[320px] w-full bg-cover bg-center" style={{ backgroundImage: `url('${galleryImages[lightboxIndex].image}')` }} />
              <div className="flex flex-col gap-2 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[#FDE7B4]">{messages.gallery.items[lightboxIndex].category}</p>
                  <p className="mt-2 font-[family:var(--font-display)] text-3xl font-semibold">{messages.gallery.items[lightboxIndex].title}</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/76">
                  <Play className="h-4 w-4 text-[#FDE7B4]" />
                  {staticLabels.preview}
                </div>
              </div>
            </div>
            <button
              aria-label="Next image"
              className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white md:flex"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryImages.length)}
              type="button"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
