import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn.ts";

type ButtonVariant = "primary" | "secondary" | "quiet" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const buttonStyles = ({
  variant = "primary",
  size = "md",
  className,
}: Pick<ButtonProps, "variant" | "size" | "className"> = {}): string =>
  cn(
    "inline-flex items-center justify-center gap-2 border font-mono text-[0.72rem] uppercase tracking-[0.08em] transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    {
      "border-accent bg-accent text-white hover:bg-[#1f46bf]": variant === "primary",
      "border-line bg-surface text-ink hover:border-accent hover:text-accent":
        variant === "secondary",
      "border-transparent bg-transparent text-muted hover:text-ink": variant === "quiet",
      "border-[#d4a8a8] bg-[#fff7f7] text-[#9e3a3a] hover:bg-[#fce8e8]": variant === "danger",
      "min-h-8 px-3": size === "sm",
      "min-h-10 px-4": size === "md",
      "min-h-12 px-5": size === "lg",
    },
    className,
  );

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
});

Button.displayName = "Button";
