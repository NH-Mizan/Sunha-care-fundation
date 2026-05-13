import { siteConfig, type AppLocale } from "@/constants/site";

export const locales = siteConfig.locales;
export const defaultLocale = siteConfig.defaultLocale;
export const localeCookieName = "sunha-locale";

export function isValidLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}

export function normalizePublicPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isValidLocale(segments[0])) {
    segments.shift();
  }

  return segments.length ? `/${segments.join("/")}` : "/";
}

export function getInternalPathname(pathname: string, locale: AppLocale) {
  const publicPath = normalizePublicPath(pathname);

  return publicPath === "/" ? `/${locale}` : `/${locale}${publicPath}`;
}
