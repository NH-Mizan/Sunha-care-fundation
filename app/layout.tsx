import type { ReactNode } from "react";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";

import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ToastProvider } from "@/components/ui/toast-provider";
import { siteConfig } from "@/constants/site";
import { defaultLocale, isValidLocale, localeCookieName } from "@/locales/routing";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  const acceptLanguage = headerStore.get("accept-language")?.toLowerCase() ?? "";
  const htmlLang = cookieLocale && isValidLocale(cookieLocale)
    ? cookieLocale
    : acceptLanguage.includes("en")
      ? "en"
    : defaultLocale;

  return (
    <html
      lang={htmlLang}
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <ToastProvider>
            <div className="flex min-h-full flex-col">{children}</div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
