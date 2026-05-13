import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/components/ui/cn";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  rightSlot?: ReactNode;
  containerClassName?: string;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      label,
      error,
      rightSlot,
      className,
      containerClassName,
      id,
      ...props
    },
    ref
  ) {
    return (
      <div className={cn("space-y-2", containerClassName)}>
        <label
          className="block text-sm font-semibold text-slate-800 dark:text-white"
          htmlFor={id}
        >
          {label}
        </label>

        <div className="relative">
          <input
            className={cn(
              "h-13 w-full rounded-2xl border bg-[#f8fcfb] px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 dark:bg-[#0b1a15] dark:text-white dark:placeholder:text-white/34",
              rightSlot ? "pr-12" : "",
              error
                ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                : "border-[#cfe9e2] focus:border-[#14B8A6] focus:ring-[#ccfbf1] dark:border-white/10 dark:focus:border-[#2dd4bf] dark:focus:ring-[#134e4a]",
              className
            )}
            id={id}
            ref={ref}
            {...props}
          />

          {rightSlot ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              {rightSlot}
            </div>
          ) : null}
        </div>

        {error ? <p className="text-sm text-rose-500">{error}</p> : null}
      </div>
    );
  }
);
