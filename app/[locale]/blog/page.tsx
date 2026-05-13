import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Search, Tag } from "lucide-react";

import { siteConfig, type AppLocale } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { Container } from "@/components/ui/container";
import { getBlogCategories, getBlogPosts } from "@/lib/blog";
import { getMessages } from "@/lib/i18n";
import { isValidLocale, locales } from "@/locales/routing";

const POSTS_PER_PAGE = 6;

type BlogPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
  }>;
};

function buildQueryString(params: {
  page?: number;
  q?: string;
  category?: string;
}) {
  const searchParams = new URLSearchParams();

  if (params.page && params.page > 1) {
    searchParams.set("page", String(params.page));
  }

  if (params.q) {
    searchParams.set("q", params.q);
  }

  if (params.category) {
    searchParams.set("category", params.category);
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: BlogPageProps
): Promise<Metadata> {
  const { locale } = await props.params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const messages = await getMessages(locale);

  return {
    title: `${messages.blog.eyebrow} | ${siteConfig.name}`,
    description: messages.blog.allPostsDescription,
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title: `${messages.blog.eyebrow} | ${siteConfig.name}`,
      description: messages.blog.allPostsDescription,
      url: `${siteConfig.url}/blog`,
      locale,
      type: "website",
    },
  };
}

export default async function BlogPage(props: BlogPageProps) {
  const { locale } = await props.params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);
  const searchParams = await props.searchParams;
  const allPosts = getBlogPosts(locale as AppLocale, messages);
  const categories = getBlogCategories(allPosts);
  const query = searchParams.q?.trim() ?? "";
  const activeCategory =
    searchParams.category && categories.includes(searchParams.category)
      ? searchParams.category
      : "";

  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory =
      !activeCategory || post.category === activeCategory;
    const haystack = `${post.title} ${post.excerpt} ${post.summary} ${post.category}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  const rawPage = Number.parseInt(searchParams.page ?? "1", 10);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage =
    Number.isNaN(rawPage) || rawPage < 1 ? 1 : Math.min(rawPage, totalPages);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const featuredPost = filteredPosts[0] ?? allPosts[0];
  const featuredHref = `/blog/${featuredPost.slug}`;

  return (
    <main className="bg-white text-slate-900">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${featuredPost.image}')` }}
        />
        <div className="absolute inset-0 bg-[#0f2a24]/78" />
        <Container className="relative py-24 sm:py-28">
          <div className="mx-auto max-w-3xl text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">
              {messages.blog.eyebrow}
            </p>
            <h1 className="mt-6 font-[family:var(--font-display)] text-4xl font-semibold leading-tight sm:text-6xl">
              {messages.blog.allPostsTitle}
            </h1>
            <p className="mt-5 text-base leading-8 text-white/78 sm:text-lg">
              {messages.blog.allPostsDescription}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-5 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-7">
            <form action="/blog" className="grid gap-4 lg:grid-cols-[1fr_auto]" method="get">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                  defaultValue={query}
                  name="q"
                  placeholder={messages.blog.searchPlaceholder}
                  type="search"
                />
              </div>
              <Button
                className="rounded-2xl bg-[#16A34A] px-7 text-white hover:bg-[#15803D] dark:bg-[#16A34A] dark:text-white dark:hover:bg-[#15803D]"
                size="md"
                type="submit"
              >
                {messages.blog.searchButton}
              </Button>
              {activeCategory ? (
                <input name="category" type="hidden" value={activeCategory} />
              ) : null}
            </form>

            <div className="flex flex-wrap gap-3">
              <Link
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  !activeCategory
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-700"
                )}
                href={`/blog${buildQueryString({ q: query })}`}
              >
                {messages.blog.allCategories}
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition",
                    activeCategory === category
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-700"
                  )}
                  href={`/blog${buildQueryString({ category, q: query })}`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[34px] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-5">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div
                className="min-h-[320px] rounded-[26px] bg-cover bg-center"
                style={{ backgroundImage: `url('${featuredPost.image}')` }}
              />
              <div className="flex flex-col justify-center p-2 sm:p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">
                  {messages.blog.featuredLabel}
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-900">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  {featuredPost.summary}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-emerald-600" />
                    {featuredPost.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Tag className="h-4 w-4 text-emerald-600" />
                    {featuredPost.category}
                  </span>
                </div>
                <Button
                  className="mt-8 w-fit rounded-full bg-[#16A34A] px-7 text-white hover:bg-[#15803D] dark:bg-[#16A34A] dark:text-white dark:hover:bg-[#15803D]"
                  href={featuredHref}
                >
                  {messages.blog.readMore}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              {messages.blog.showingResults} {filteredPosts.length}
              {query ? ` ${messages.blog.resultsFor} "${query}"` : ""}
            </p>
          </div>

          {paginatedPosts.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {paginatedPosts.map((post) => (
                <article
                  key={post.slug}
                  className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]"
                >
                  <Link className="block" href={`/blog/${post.slug}`}>
                    <div
                      className="h-56 bg-cover bg-center"
                      style={{ backgroundImage: `url('${post.image}')` }}
                    />
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-emerald-600" />
                          {post.date}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Tag className="h-4 w-4 text-emerald-600" />
                          {post.category}
                        </span>
                      </div>
                      <h3 className="mt-4 text-2xl font-semibold leading-8 text-slate-900">
                        {post.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[8px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
              <h2 className="text-2xl font-semibold text-slate-900">
                {messages.blog.emptyTitle}
              </h2>
              <p className="mt-3 text-slate-600">{messages.blog.emptyDescription}</p>
            </div>
          )}

          {totalPages > 1 ? (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link
                aria-disabled={currentPage === 1}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:text-emerald-700",
                  currentPage === 1
                    ? "pointer-events-none text-slate-300"
                    : "text-slate-700 hover:text-emerald-700"
                )}
                href={`/blog${buildQueryString({
                  page: currentPage - 1,
                  q: query,
                  category: activeCategory,
                })}`}
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <Link
                    key={page}
                    className={cn(
                      "inline-flex h-12 min-w-12 items-center justify-center rounded-full px-3 text-2xl font-medium transition",
                      currentPage === page
                        ? "bg-[#16A34A] text-white"
                        : "text-slate-900 hover:text-emerald-700"
                    )}
                    href={`/blog${buildQueryString({
                      page,
                      q: query,
                      category: activeCategory,
                    })}`}
                  >
                    {page}
                  </Link>
                );
              })}
              <Link
                aria-disabled={currentPage === totalPages}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:text-emerald-700",
                  currentPage === totalPages
                    ? "pointer-events-none text-slate-300"
                    : "text-slate-700 hover:text-emerald-700"
                )}
                href={`/blog${buildQueryString({
                  page: currentPage + 1,
                  q: query,
                  category: activeCategory,
                })}`}
              >
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          ) : null}
        </Container>
      </section>
    </main>
  );
}
