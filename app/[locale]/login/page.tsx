import { notFound } from "next/navigation";
import { redirect } from "next/navigation";

import { AuthPortalPage } from "@/components/auth/auth-portal-page";
import { getAuthSession } from "@/lib/auth";
import { getMessages } from "@/lib/i18n";
import { isValidLocale } from "@/locales/routing";

type LocaleLoginPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLoginPage(props: LocaleLoginPageProps) {
  const { locale } = await props.params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const session = await getAuthSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  const messages = await getMessages(locale);

  return (
    <AuthPortalPage
      messages={messages}
      mode="login"
    />
  );
}
