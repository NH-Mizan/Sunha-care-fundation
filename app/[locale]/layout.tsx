import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { type AppLocale } from "@/constants/site";
import { SiteShell } from "@/components/layout/site-shell";
import { getMessages } from "@/lib/i18n";
import { isValidLocale } from "@/locales/routing";

type LocaleLayoutProps = {
  params: Promise<{
    locale: string;
  }>;
  children: ReactNode;
};

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { locale } = await props.params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <div
      className={
        locale === "bn"
          ? "font-[family:'Hind_Siliguri','Hind Siliguri','Trebuchet MS','Segoe UI',sans-serif]"
          : "font-[family:'Trebuchet_MS','Trebuchet MS','Segoe UI',sans-serif]"
      }
      lang={locale}
    >
      <SiteShell locale={locale as AppLocale} messages={messages}>
        {props.children}
      </SiteShell>
    </div>
  );
}
