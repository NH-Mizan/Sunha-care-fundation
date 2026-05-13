import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/components/ui/cn";

const variants = {
  primary:
    "bg-slate-950 text-white shadow-lg shadow-slate-950/20 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
  secondary:
    "border border-slate-300 bg-white/80 text-slate-800 hover:border-slate-400 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
  ghost:
    "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10",
  gradient:
    "bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-105",
} as const;

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-6 text-base",
} as const;

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

type ButtonLinkProps = SharedProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps | ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-2xl font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-60 dark:focus-visible:ring-offset-slate-950",
    variants[variant],
    sizes[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, rel, target } = props;

    return (
      <Link className={classes} href={href} rel={rel} target={target}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
