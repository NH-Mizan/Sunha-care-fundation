import Image from "next/image";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/components/ui/cn";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function AuthCard({
  title,
  description,
  children,
  footer,
  className,
}: AuthCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-md rounded-[2rem] border-[#d9ece7] bg-white/92 p-6 shadow-[0_30px_80px_-32px_rgba(15,118,110,0.25)] sm:p-8 dark:border-white/10 dark:bg-[#10201a]/92 dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.65)]",
        className
      )}
    >
      <div className="mb-8">
        <div className="flex items-center">
          <span className="flex h-14 w-[196px] items-center justify-center overflow-hidden rounded-[10px] bg-white px-2 shadow-[0_18px_40px_rgba(20,184,166,0.24)]">
            <Image
              alt="Sunha Care logo"
              className="h-full w-full object-contain"
              height={56}
              priority
              src="/logo.png"
              width={196}
            />
          </span>
        </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-white/62">
          {description}
        </p>
      </div>

      {children}

      {footer ? (
        <div className="mt-8 border-t border-slate-200/70 pt-5 text-center text-sm text-slate-600 dark:border-white/10 dark:text-white/62">
          {footer}
        </div>
      ) : null}
    </Card>
  );
}
