import { NextResponse, type NextRequest } from "next/server";

import {
  defaultLocale,
  getInternalPathname,
  isValidLocale,
  localeCookieName,
  normalizePublicPath,
} from "@/locales/routing";

function getPreferredLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";

  if (acceptLanguage.includes("bn")) {
    return "bn";
  }

  if (acceptLanguage.includes("en")) {
    return "en";
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = normalizePublicPath(pathname);

    const response = NextResponse.redirect(url);
    response.cookies.set(localeCookieName, firstSegment, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = getInternalPathname(pathname, locale);

  const response = NextResponse.rewrite(url);
  response.cookies.set(localeCookieName, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
