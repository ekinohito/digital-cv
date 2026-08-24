import type { ReactNode } from "react";

type LocalizedFieldPairProps = {
  label: string;
  en: ReactNode;
  ru: ReactNode;
};

export function LocalizedFieldPair({ label, en, ru }: LocalizedFieldPairProps) {
  return (
    <fieldset className="space-y-4 border-0 p-0">
      <legend className="font-mono text-[0.68rem] uppercase tracking-widest text-muted">
        {label}
      </legend>
      <div className="grid gap-4 md:grid-cols-2">
        {en}
        {ru}
      </div>
    </fieldset>
  );
}
