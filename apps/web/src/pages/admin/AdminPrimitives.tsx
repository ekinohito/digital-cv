import type { PropsWithChildren, ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/Button.tsx";
import { cn } from "../../lib/cn.ts";

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col justify-between gap-5 border-b border-line pb-7 md:flex-row md:items-end">
      <div>
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-0.06em] text-ink">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">{description}</p>
        ) : null}
      </div>
      {action}
    </header>
  );
}

export function AdminSection({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={cn("border border-line bg-surface p-5 md:p-7", className)}>
      {children}
    </section>
  );
}

export function SaveBar({
  saving,
  saved,
  label = "Save changes",
  savingLabel = "Saving...",
  savedLabel = "Saved",
}: {
  saving: boolean;
  saved: boolean;
  label?: string;
  savingLabel?: string;
  savedLabel?: string;
}) {
  return (
    <div className="flex items-center justify-end gap-4 border-t border-line pt-5">
      <span
        className={cn(
          "font-mono text-[0.66rem] uppercase tracking-[0.1em] text-positive",
          !saved && "opacity-0",
        )}
      >
        {savedLabel}
      </span>
      <Button type="submit" disabled={saving}>
        {saving ? savingLabel : label}
      </Button>
    </div>
  );
}

export function AddButton({
  onClick,
  children = "Add",
}: {
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <Button type="button" variant="secondary" onClick={onClick}>
      <Plus size={16} strokeWidth={1.5} /> {children}
    </Button>
  );
}

export function DeleteButton({
  onClick,
  children = "Delete",
}: {
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <Button type="button" variant="danger" size="sm" onClick={onClick}>
      <Trash2 size={14} strokeWidth={1.5} /> {children}
    </Button>
  );
}
