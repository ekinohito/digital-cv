import type { ResultOf } from "@graphql-typed-document-node/core";
import { useTranslation } from "react-i18next";
import { AdminSkillsQuery } from "../../features/admin/admin.graphql.ts";
import { Field } from "./Field.tsx";

type SkillOption = ResultOf<typeof AdminSkillsQuery>["skills"][number];

type SkillPickerProps = {
  skills: readonly SkillOption[];
  selectedIds: readonly string[];
  onChange: (ids: string[]) => void;
  label: string;
};

export function SkillPicker({ skills, selectedIds, onChange, label }: SkillPickerProps) {
  const { t } = useTranslation();
  const selected = new Set(selectedIds);

  const toggle = (id: string) => {
    const next = selected.has(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    onChange(next);
  };

  return (
    <Field label={label}>
      {skills.length ? (
        <div className="grid gap-2 border border-line bg-surface p-3 sm:grid-cols-2">
          {skills.map((skill) => (
            <label
              key={skill.id}
              className="flex cursor-pointer items-center gap-3 border border-transparent px-2 py-2 text-sm transition-colors hover:border-line hover:bg-canvas"
            >
              <input
                type="checkbox"
                checked={selected.has(skill.id)}
                onChange={() => toggle(skill.id)}
                className="size-4 accent-accent"
              />
              <span className="text-ink">{skill.name}</span>
              <span className="ml-auto font-mono text-[0.58rem] uppercase tracking-[0.08em] text-muted">
                {skill.category}
              </span>
            </label>
          ))}
        </div>
      ) : (
        <p className="border border-dashed border-line px-3 py-4 text-sm text-muted">
          {t("admin.noSkillsAvailable")}
        </p>
      )}
    </Field>
  );
}
