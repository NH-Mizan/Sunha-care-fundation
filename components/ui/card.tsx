import type { HTMLAttributes } from "react";

import { cn } from "@/components/ui/cn";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white/85 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.25)] backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/70 dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]",
        className
      )}
      {...props}
    />
  );
}
