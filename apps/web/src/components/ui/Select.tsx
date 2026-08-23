import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn.ts";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          "min-h-11 w-full border border-line bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent",
          className,
        )}
        {...props}
      />
    );
  },
);

Select.displayName = "Select";
