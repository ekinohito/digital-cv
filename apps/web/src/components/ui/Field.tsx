import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "../../lib/cn.ts";

type FieldProps = PropsWithChildren<{
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  className?: string;
}>;

export function Field({ label, htmlFor, hint, error, className, children }: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="font-mono text-[0.68rem] uppercase tracking-widest text-muted"
        >
          {label}
        </label>
        {hint ? <span className="text-xs text-muted">{hint}</span> : null}
      </div>
      {children}
      {error ? <p className="text-xs text-[#9e3a3a]">{error}</p> : null}
    </div>
  );
}

export function FormError({ children }: { children: ReactNode }) {
  return <p className="text-sm text-[#9e3a3a]">{children}</p>;
}
