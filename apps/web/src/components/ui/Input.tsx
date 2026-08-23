import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn.ts";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "min-h-11 w-full border border-line bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
