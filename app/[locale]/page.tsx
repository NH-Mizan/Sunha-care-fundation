import { FoundationPage } from "@/sections/foundation-page";
import { getMessages } from "@/lib/i18n";
import { isValidLocale, locales } from "@/locales/routing";
import { siteConfig, type AppLocale } from "@/constants/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LocalePageProps
): Promise<Metadata> {
  const { locale } = await props.params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const messages = await getMessages(locale);

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: `${siteConfig.url}/`,
      locale,
      type: "website",
    },
  };
}

export default async function LocalePage(props: LocalePageProps) {
  const { locale } = await props.params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return <FoundationPage locale={locale as AppLocale} messages={messages} />;
}
