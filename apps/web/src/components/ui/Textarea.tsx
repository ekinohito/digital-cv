import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn.ts";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-32 w-full resize-y border border-line bg-surface px-3 py-2 text-sm leading-6 text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
