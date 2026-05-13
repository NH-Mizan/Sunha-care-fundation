import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/components/ui/cn";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function Section({
  id,
  className,
  containerClassName,
  eyebrow,
  title,
  description,
  actions,
  children,
}: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)} id={id}>
      <Container className={containerClassName}>
        {(eyebrow || title || description || actions) && (
          <div className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              {eyebrow ? (
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                  {description}
                </p>
              ) : null}
            </div>
            {actions ? <div>{actions}</div> : null}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
