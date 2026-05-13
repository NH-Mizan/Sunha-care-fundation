"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  HeartHandshake,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";

import type { Messages } from "@/lib/i18n";
import { AuthCard } from "@/components/auth/auth-card";
import { InputField } from "@/components/auth/input-field";
import { SocialButton } from "@/components/auth/social-button";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";

type AuthPortalPageProps = {
  mode: "login" | "register";
  messages: Messages;
};

export function AuthPortalPage({
  mode,
  messages,
}: AuthPortalPageProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    consent: false,
    remember: false,
  });
  const isLogin = mode === "login";
  const loginAuth = messages.auth.login;
  const registerAuth = messages.auth.register;
  const auth = isLogin ? loginAuth : registerAuth;

  const updateValue = (field: keyof typeof formValues, value: string | boolean) => {
    setFormError(null);
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  async function handleLogin() {
    const email = formValues.email.trim();
    const password = formValues.password;

    if (!email || !password) {
      setFormError("Email and password are required.");
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (!result || result.error) {
      setFormError("Invalid email or password.");
      showToast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        tone: "error",
      });
      return;
    }

    showToast({
      title: "Login successful",
      description: "Redirecting to your dashboard.",
      tone: "success",
    });

    startTransition(() => {
      router.push(result.url ?? "/dashboard");
      router.refresh();
    });
  }

  async function handleRegister() {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phone: formValues.phone,
        role: formValues.role,
        password: formValues.password,
        consent: formValues.consent,
      }),
    });

    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    if (!response.ok) {
      const message = payload?.message ?? "Registration failed.";
      setFormError(message);
      showToast({
        title: "Registration failed",
        description: message,
        tone: "error",
      });
      return;
    }

    const loginResult = await signIn("credentials", {
      email: formValues.email.trim(),
      password: formValues.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (!loginResult || loginResult.error) {
      setFormError("Account created, but automatic login failed.");
      showToast({
        title: "Account created",
        description: "Please sign in with your new credentials.",
        tone: "success",
      });
      router.push("/login");
      router.refresh();
      return;
    }

    showToast({
      title: "Account created",
      description: "Redirecting to your dashboard.",
      tone: "success",
    });

    startTransition(() => {
      router.push(loginResult.url ?? "/dashboard");
      router.refresh();
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    if (isLogin) {
      await handleLogin();
      return;
    }

    await handleRegister();
  }

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-background px-4 py-24 text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.12),transparent_22%)]" />
      <div className="absolute left-[10%] top-24 hidden h-40 w-40 rounded-full bg-[#14B8A6]/10 blur-3xl lg:block" />
      <div className="absolute bottom-16 right-[12%] hidden h-44 w-44 rounded-full bg-[#F59E0B]/10 blur-3xl lg:block" />

      <div className="relative grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_540px] lg:items-center">
        <div className="hidden lg:block">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0F766E]">
            {auth.eyebrow}
          </p>
          <h1 className="mt-5 font-[family:var(--font-display)] text-6xl font-semibold leading-tight text-foreground">
            {auth.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-muted)]">
            {auth.heroDescription}
          </p>

          {isLogin ? (
            <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
              {loginAuth.stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[28px] border border-[#d7ece7] bg-white/70 p-5 shadow-[0_18px_40px_rgba(15,118,110,0.08)] dark:border-white/10 dark:bg-[#10201a]/80"
                >
                  <p className="text-3xl font-semibold text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 space-y-4">
              {registerAuth.features.map((feature, index) => {
                const Icon =
                  index === 0 ? Users : index === 1 ? HeartHandshake : ShieldCheck;

                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4 rounded-[28px] border border-[#d7ece7] bg-white/72 p-5 shadow-[0_18px_40px_rgba(15,118,110,0.08)] dark:border-white/10 dark:bg-[#10201a]/80"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F766E] text-[#FDE7B4]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-lg font-semibold text-foreground">
                        {feature.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <AuthCard
          className="max-w-xl"
          description={auth.description}
          footer={
            <span>
              {auth.footerText}{" "}
              <Link
                className="font-semibold text-[#0F766E] transition hover:text-[#14B8A6]"
                href={isLogin ? "/register" : "/login"}
              >
                {auth.footerLink}
              </Link>
            </span>
          }
          title={auth.title}
        >
          <form
            className="space-y-5"
            onSubmit={handleSubmit}
          >
            {formError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
                {formError}
              </div>
            ) : null}

            {isLogin ? null : (
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  autoComplete="given-name"
                  id="first-name"
                  label={registerAuth.firstName}
                  onChange={(event) =>
                    updateValue("firstName", event.target.value)
                  }
                  placeholder={registerAuth.firstName}
                  type="text"
                  value={formValues.firstName}
                />
                <InputField
                  autoComplete="family-name"
                  id="last-name"
                  label={registerAuth.lastName}
                  onChange={(event) =>
                    updateValue("lastName", event.target.value)
                  }
                  placeholder={registerAuth.lastName}
                  type="text"
                  value={formValues.lastName}
                />
              </div>
            )}

            <InputField
              autoComplete="email"
              id={`${mode}-email`}
              label={auth.email}
              onChange={(event) => updateValue("email", event.target.value)}
              placeholder="you@example.com"
              type="email"
              value={formValues.email}
            />

            {isLogin ? null : (
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  autoComplete="tel"
                  id="phone"
                  label={registerAuth.phone}
                  onChange={(event) => updateValue("phone", event.target.value)}
                  placeholder="+880 1700-000000"
                  type="tel"
                  value={formValues.phone}
                />
                <InputField
                  id="role"
                  label={registerAuth.role}
                  onChange={(event) => updateValue("role", event.target.value)}
                  placeholder={registerAuth.role}
                  type="text"
                  value={formValues.role}
                />
              </div>
            )}

            <InputField
              autoComplete={isLogin ? "current-password" : "new-password"}
              id={`${mode}-password`}
              label={auth.password}
              onChange={(event) =>
                updateValue("password", event.target.value)
              }
              placeholder={auth.password}
              rightSlot={
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-slate-400 transition hover:text-slate-700 dark:hover:text-white"
                  onClick={() => setShowPassword((value) => !value)}
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
              type={showPassword ? "text" : "password"}
              value={formValues.password}
            />

            {isLogin ? (
              <div className="flex items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-2 text-slate-600 dark:text-white/62">
                  <input
                    checked={formValues.remember}
                    className="h-4 w-4 accent-[#0F766E]"
                    onChange={(event) =>
                      updateValue("remember", event.target.checked)
                    }
                    type="checkbox"
                  />
                  {loginAuth.remember}
                </label>
                <Link
                  className="font-semibold text-[#0F766E] transition hover:text-[#14B8A6]"
                  href="/#contact"
                >
                  {loginAuth.forgot}
                </Link>
              </div>
            ) : (
              <label className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-white/62">
                <input
                  checked={formValues.consent}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#0F766E]"
                  onChange={(event) =>
                    updateValue("consent", event.target.checked)
                  }
                  type="checkbox"
                />
                {registerAuth.consent}
              </label>
            )}

            <Button
              className="w-full rounded-full bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#F59E0B] text-white"
              disabled={isPending}
              size="lg"
              type="submit"
            >
              {isPending ? "Please wait..." : auth.submit}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              {auth.divider}
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <SocialButton icon={<FaGoogle />} onClick={() => {}}>
              {auth.google}
            </SocialButton>
            <SocialButton icon={<FaFacebookF />} onClick={() => {}}>
              {auth.facebook}
            </SocialButton>
          </div>

          {isLogin ? (
            <>
              <div className="mt-6 rounded-[26px] border border-[#d7ece7] bg-[#f8fcfb] p-5 dark:border-white/10 dark:bg-[#0b1a15]">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F766E] text-[#FDE7B4]">
                    <LockKeyhole className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">
                      {loginAuth.secureTitle}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                      {loginAuth.secureText}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <Button
                  className="rounded-full border border-[#bce8df] bg-[#f0fdfa] px-6 text-[#0F766E]"
                  href={`mailto:${loginAuth.contactEmail}`}
                  variant="secondary"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {loginAuth.contactEmail}
                </Button>
              </div>
            </>
          ) : null}
        </AuthCard>
      </div>
    </main>
  );
}
