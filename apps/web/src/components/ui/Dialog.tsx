import { useEffect, type PropsWithChildren } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn.ts";

type DialogProps = PropsWithChildren<{
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  className?: string;
}>;

export function Dialog({ open, title, description, onClose, className, children }: DialogProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
    >
      <section
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby={description ? "dialog-description" : undefined}
        className={cn(
          "w-full max-w-lg border border-line bg-surface p-6 shadow-[0_24px_80px_rgba(18,22,29,0.22)]",
          className,
        )}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="dialog-title" className="font-display text-2xl text-ink">
              {title}
            </h2>
            {description ? (
              <p id="dialog-description" className="mt-2 text-sm leading-6 text-muted">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            className="text-muted transition-colors hover:text-ink"
            onClick={onClose}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </section>
    </div>
  );
}
