import type { ButtonHTMLAttributes, ReactNode } from "react";

import { LoaderCircle } from "lucide-react";

import { cn } from "@/components/ui/cn";

type SocialButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  loading?: boolean;
};

export function SocialButton({
  icon,
  children,
  className,
  loading = false,
  disabled,
  ...props
}: SocialButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-13 w-full items-center justify-center gap-3 rounded-2xl border border-[#cfe9e2] bg-[#f8fcfb] px-4 text-sm font-semibold text-slate-800 transition hover:border-[#99f6e4] hover:bg-[#f0fdfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-60 dark:border-white/10 dark:bg-[#0b1a15] dark:text-white dark:hover:bg-white/6 dark:focus-visible:ring-offset-[#10201a]",
        className
      )}
      disabled={disabled || loading}
      type="button"
      {...props}
    >
      {loading ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <span className="text-lg">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
}
