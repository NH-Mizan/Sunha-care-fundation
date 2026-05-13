import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import { siteConfig, type AppLocale } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { getMessages } from "@/lib/i18n";
import { isValidLocale, locales } from "@/locales/routing";

type BlogDetailsPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const entries = await Promise.all(
    locales.map(async (locale) => {
      const messages = await getMessages(locale);

      return getBlogPosts(locale, messages).map((post) => ({
        locale,
        slug: post.slug,
      }));
    })
  );

  return entries.flat();
}

export async function generateMetadata(
  props: BlogDetailsPageProps
): Promise<Metadata> {
  const { locale, slug } = await props.params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const messages = await getMessages(locale);
  const post = getBlogPostBySlug(locale as AppLocale, messages, slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.summary,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${siteConfig.url}/blog/${slug}`,
      locale,
      type: "article",
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogDetailsPage(props: BlogDetailsPageProps) {
  const { locale, slug } = await props.params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);
  const post = getBlogPostBySlug(locale as AppLocale, messages, slug);

  if (!post) {
    notFound();
  }

  const shareUrl = `${siteConfig.url}/blog/${post.slug}`;
  const relatedPosts = getBlogPosts(locale as AppLocale, messages)
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="bg-white text-slate-900">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${post.image}')` }}
        />
        <div className="absolute inset-0 bg-[#13241f]/78" />
        <Container className="relative py-24 sm:py-28">
          <div className="max-w-4xl text-white">
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/88 backdrop-blur hover:bg-white/14"
              href="/blog"
            >
              <ArrowLeft className="h-4 w-4" />
              {messages.blog.backToBlog}
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/74">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-emerald-200" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Tag className="h-4 w-4 text-emerald-200" />
                {post.category}
              </span>
            </div>
            <h1 className="mt-6 max-w-4xl font-[family:var(--font-display)] text-4xl font-semibold leading-tight sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
              {post.summary}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="min-w-0">
              <div className="space-y-6 text-base leading-8 text-slate-700">
                {post.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {post.gallery.slice(0, 2).map((image) => (
                  <div
                    key={image}
                    className="h-56 rounded-[24px] bg-cover bg-center shadow-[0_20px_55px_rgba(15,23,42,0.12)]"
                    style={{ backgroundImage: `url('${image}')` }}
                  />
                ))}
              </div>

              <div
                className="mt-4 h-[320px] rounded-[30px] bg-cover bg-center shadow-[0_20px_55px_rgba(15,23,42,0.12)] sm:h-[420px]"
                style={{ backgroundImage: `url('${post.gallery[2] ?? post.image}')` }}
              />

              <div className="mt-10 space-y-6 text-base leading-8 text-slate-700">
                <p>{post.excerpt}</p>
                <p>{post.summary}</p>
              </div>
            </article>

            <aside className="lg:sticky lg:top-8 lg:self-start">
              <div className="rounded-[28px] border border-slate-200 bg-[#EAF7F0] p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-700">
                    {messages.blog.shareLabel}
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      aria-label="Share on Facebook"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm transition hover:text-emerald-700"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                      )}`}
                      target="_blank"
                    >
                      <FaFacebookF className="h-4 w-4" />
                    </Link>
                    <Link
                      aria-label="Share on LinkedIn"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm transition hover:text-emerald-700"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        shareUrl
                      )}`}
                      target="_blank"
                    >
                      <FaLinkedinIn className="h-4 w-4" />
                    </Link>
                    <Link
                      aria-label="Share on X"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm transition hover:text-emerald-700"
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl
                      )}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                    >
                      <FaXTwitter className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="mt-5 rounded-[24px] bg-[#16A34A] p-5 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
                    {messages.blog.sidebarEyebrow}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight">
                    {messages.blog.sidebarTitle}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/82">
                    {messages.blog.sidebarDescription}
                  </p>
                  <Button
                    className="mt-6 w-full rounded-2xl bg-[#F4C95D] text-slate-950 hover:bg-[#EABF4E] dark:bg-[#F4C95D] dark:text-slate-950 dark:hover:bg-[#EABF4E]"
                    href="/#contact"
                  >
                    {messages.blog.sidebarPrimaryCta}
                  </Button>
                  <Button
                    className="mt-3 w-full rounded-2xl border border-white/30 bg-white text-[#166534] hover:bg-emerald-50 dark:bg-white dark:text-[#166534] dark:hover:bg-emerald-50"
                    href="/#contact"
                    variant="secondary"
                  >
                    {messages.blog.sidebarSecondaryCta}
                  </Button>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-16">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-3xl font-semibold text-slate-900">
                {messages.blog.eyebrow}
              </h2>
              <Link
                className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                href="/blog"
              >
                {messages.blog.backToBlog}
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((item) => (
                <article
                  key={item.slug}
                  className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
                >
                  <Link className="block" href={`/blog/${item.slug}`}>
                    <div
                      className="h-52 bg-cover bg-center"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    <div className="p-6">
                      <p className="text-sm text-slate-500">{item.date}</p>
                      <h3 className="mt-3 text-2xl font-semibold leading-8 text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {item.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
