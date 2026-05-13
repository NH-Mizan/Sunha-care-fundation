import { cache } from "react";

import enMessages from "@/messages/en.json";
import bnMessages from "@/messages/bn.json";
import { defaultLocale, isValidLocale } from "@/locales/routing";
import type { AppLocale } from "@/constants/site";

export type Messages = typeof enMessages;

const messageMap: Record<AppLocale, Messages> = {
  bn: bnMessages,
  en: enMessages,
};

export const getMessages = cache(async (locale: string): Promise<Messages> => {
  const resolvedLocale = isValidLocale(locale) ? locale : defaultLocale;
  return messageMap[resolvedLocale];
});

export function getLocalePath(locale: AppLocale) {
  return `/${locale}`;
}
