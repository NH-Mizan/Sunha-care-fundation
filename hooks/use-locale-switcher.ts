"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import {
  localeCookieName,
  normalizePublicPath,
} from "@/locales/routing";
import type { AppLocale } from "@/constants/site";

export function useLocaleSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (nextLocale: AppLocale) => {
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    const query = searchParams.toString();
    const nextPath = `${normalizePublicPath(pathname)}${query ? `?${query}` : ""}`;

    startTransition(() => {
      router.replace(nextPath);
      router.refresh();
    });
  };

  return {
    isPending,
    switchLocale,
  };
}
