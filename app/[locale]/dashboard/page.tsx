import { HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { notFound, redirect } from "next/navigation";

import { LogoutButton } from "@/components/auth/logout-button";
import { Card } from "@/components/ui/card";
import { isValidLocale } from "@/locales/routing";
import { getAuthSession } from "@/lib/auth";

type LocaleDashboardPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const dashboardCopy = {
  en: {
    eyebrow: "Sunha Care Dashboard",
    title: "Welcome back",
    description:
      "You are signed in and can now manage your volunteer and donor activities.",
    cards: [
      {
        title: "Active role",
        description: "Your current involvement with the foundation.",
      },
      {
        title: "Secure access",
        description: "Your account is protected with session-based sign-in.",
      },
      {
        title: "Community status",
        description: "You are ready to receive updates and campaign notices.",
      },
    ],
  },
  bn: {
    eyebrow: "সুন্হা কেয়ার ড্যাশবোর্ড",
    title: "আবার স্বাগতম",
    description:
      "আপনি সফলভাবে লগইন করেছেন। এখন আপনার স্বেচ্ছাসেবী ও ডোনার কার্যক্রম পরিচালনা করতে পারবেন।",
    cards: [
      {
        title: "বর্তমান ভূমিকা",
        description: "ফাউন্ডেশনের সাথে আপনার বর্তমান সম্পৃক্ততা।",
      },
      {
        title: "নিরাপদ প্রবেশ",
        description: "আপনার অ্যাকাউন্ট session-based sign-in দিয়ে সুরক্ষিত আছে।",
      },
      {
        title: "কমিউনিটি স্ট্যাটাস",
        description: "আপনি এখন আপডেট ও ক্যাম্পেইন নোটিস পাওয়ার জন্য প্রস্তুত।",
      },
    ],
  },
} as const;

export default async function LocaleDashboardPage(
  props: LocaleDashboardPageProps
) {
  const { locale } = await props.params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  const copy = dashboardCopy[locale];
  const cardIcons = [Users, ShieldCheck, HeartHandshake];

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-[#d9ece7] bg-white/90 p-8 shadow-[0_30px_80px_-32px_rgba(15,118,110,0.22)] dark:border-white/10 dark:bg-[#10201a]/92">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0F766E]">
                {copy.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {copy.title}, {session.user.name ?? session.user.email}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-white/62">
                {copy.description}
              </p>
            </div>

            <LogoutButton />
          </div>

          <div className="mt-8 grid gap-4 rounded-[1.5rem] bg-[#f7fbfa] p-5 dark:bg-[#0b1a15] sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-white/46">
                Email
              </p>
              <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                {session.user.email}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-white/46">
                Role
              </p>
              <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                {session.user.role}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-white/46">
                Session
              </p>
              <p className="mt-2 font-semibold text-emerald-600 dark:text-emerald-300">
                Active
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.cards.map((card, index) => {
              const Icon = cardIcons[index];

              return (
                <Card
                  className="rounded-[1.5rem] border-[#d9ece7] bg-white/88 p-5 dark:border-white/10 dark:bg-[#0f1f19]"
                  key={card.title}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F766E] via-[#14B8A6] to-[#F59E0B] text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
                    {card.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/62">
                    {card.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
