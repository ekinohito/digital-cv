import { useEffect, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../../components/ui/Button.tsx";
import { Dialog } from "../../components/ui/Dialog.tsx";
import { EmptyState } from "../../components/ui/EmptyState.tsx";
import { ErrorState } from "../../components/ui/ErrorState.tsx";
import { Field } from "../../components/ui/Field.tsx";
import { Input } from "../../components/ui/Input.tsx";
import { Select } from "../../components/ui/Select.tsx";
import { SectionLoading } from "../../components/ui/LoadingBlock.tsx";
import {
  AdminSkillsQuery,
  CreateSkillMutation,
  DeleteSkillMutation,
  UpdateSkillMutation,
} from "../../features/admin/admin.graphql.ts";
import { PortfolioPageQuery } from "../../features/portfolio/portfolio.graphql.ts";
import { errorMessage } from "../../features/admin/admin.utils.ts";
import {
  AdminPageHeader,
  AdminSection,
  AddButton,
  DeleteButton,
  SaveBar,
} from "./AdminPrimitives.tsx";

const SKILL_CATEGORIES = [
  "LANGUAGE",
  "BACKEND",
  "FRONTEND",
  "DATABASE",
  "INFRASTRUCTURE",
  "TESTING",
  "TOOLING",
  "OTHER",
] as const;
const skillSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens"),
  name: z.string().trim().min(1, "Name is required"),
  category: z.enum(SKILL_CATEGORIES),
  sortOrder: z.string().regex(/^\d+$/, "Use a whole number"),
});
type SkillFormValues = z.infer<typeof skillSchema>;
const emptyValues: SkillFormValues = { slug: "", name: "", category: "BACKEND", sortOrder: "10" };

export function SkillsAdminPage() {
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data, loading, error, refetch } = useQuery(AdminSkillsQuery);
  const [createSkill, { loading: creating }] = useMutation(CreateSkillMutation);
  const [updateSkill, { loading: updating }] = useMutation(UpdateSkillMutation);
  const [deleteSkill, { loading: deleting }] = useMutation(DeleteSkillMutation);
  const editing = data?.skills.find((skill) => skill.id === editingId);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SkillFormValues>({ resolver: zodResolver(skillSchema), defaultValues: emptyValues });

  useEffect(() => {
    if (editing)
      reset({
        slug: editing.slug,
        name: editing.name,
        category: editing.category,
        sortOrder: String(editing.sortOrder),
      });
    else reset(emptyValues);
  }, [editing, reset]);

  const submit = async (values: SkillFormValues) => {
    try {
      if (editingId) {
        await updateSkill({
          variables: {
            id: editingId,
            input: {
              slug: values.slug,
              name: values.name,
              category: values.category,
              sortOrder: Number(values.sortOrder),
            },
          },
          refetchQueries: [AdminSkillsQuery, PortfolioPageQuery],
          awaitRefetchQueries: true,
        });
        toast.success(t("admin.saveSkill"));
      } else {
        await createSkill({
          variables: {
            input: {
              slug: values.slug,
              name: values.name,
              category: values.category,
              sortOrder: Number(values.sortOrder),
            },
          },
          refetchQueries: [AdminSkillsQuery, PortfolioPageQuery],
          awaitRefetchQueries: true,
        });
        toast.success(t("admin.createSkill"));
      }
      setEditingId(null);
      await refetch();
    } catch (mutationError: unknown) {
      toast.error(errorMessage(mutationError, t("admin.serverError")));
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteSkill({
        variables: { id: deleteId },
        refetchQueries: [AdminSkillsQuery, PortfolioPageQuery],
        awaitRefetchQueries: true,
      });
      toast.success(t("admin.deleteSkill"));
      setDeleteId(null);
      if (editingId === deleteId) setEditingId(null);
    } catch (mutationError: unknown) {
      toast.error(errorMessage(mutationError, t("admin.serverError")));
    }
  };

  if (loading && !data) return <SectionLoading rows={5} />;
  if (error && !data)
    return (
      <ErrorState
        title="Could not load skills."
        description={error.message}
        retry={() => void refetch()}
      />
    );
  const skills = data?.skills ?? [];
  const deleteTarget = skills.find((skill) => skill.id === deleteId);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="CONTENT / 04"
        title={t("admin.skills")}
        description="Skills are relationships used by projects and experience, not a progress scoreboard."
        action={<AddButton onClick={() => setEditingId(null)}>{t("admin.create")}</AddButton>}
      />
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(330px,0.62fr)]">
        <AdminSection className="p-0">
          <div className="grid grid-cols-[minmax(0,1fr)_120px_auto] border-b border-line px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted md:px-6">
            <span>{t("admin.name")}</span>
            <span>{t("admin.category")}</span>
            <span />
          </div>
          {skills.length ? (
            skills.map((skill) => (
              <div
                key={skill.id}
                className="grid grid-cols-[minmax(0,1fr)_120px_auto] items-center gap-3 border-b border-line px-5 py-4 last:border-0 md:px-6"
              >
                <div>
                  <p className="font-display text-lg tracking-[-0.03em]">{skill.name}</p>
                  <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted">
                    {skill.slug}
                  </p>
                </div>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-accent">
                  {skill.category}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="quiet"
                    size="sm"
                    aria-label={`${t("actions.edit")} ${skill.name}`}
                    onClick={() => setEditingId(skill.id)}
                  >
                    <Pencil size={14} strokeWidth={1.5} />
                  </Button>
                  <DeleteButton onClick={() => setDeleteId(skill.id)} />
                </div>
              </div>
            ))
          ) : (
            <div className="p-5">
              <EmptyState title={t("admin.notConfigured")} />
            </div>
          )}
        </AdminSection>
        <AdminSection className="xl:sticky xl:top-8 xl:self-start">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.1em] text-accent">
                {editing ? "EDIT / SKILL" : "NEW / SKILL"}
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-[-0.04em]">
                {editing ? editing.name : t("admin.createSkill")}
              </h2>
            </div>
            {editingId ? (
              <button
                type="button"
                className="text-muted hover:text-ink"
                aria-label="Close editor"
                onClick={() => setEditingId(null)}
              >
                <X size={19} strokeWidth={1.5} />
              </button>
            ) : null}
          </div>
          <form className="mt-7 space-y-5" onSubmit={handleSubmit(submit)}>
            <Field label={t("admin.slug")} htmlFor="skill-slug" error={errors.slug?.message}>
              <Input id="skill-slug" {...register("slug")} />
            </Field>
            <Field label={t("admin.name")} htmlFor="skill-name" error={errors.name?.message}>
              <Input id="skill-name" {...register("name")} />
            </Field>
            <Field
              label={t("admin.category")}
              htmlFor="skill-category"
              error={errors.category?.message}
            >
              <Select id="skill-category" {...register("category")}>
                {SKILL_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              label={t("admin.sortOrder")}
              htmlFor="skill-order"
              error={errors.sortOrder?.message}
            >
              <Input id="skill-order" type="number" min="0" {...register("sortOrder")} />
            </Field>
            <SaveBar
              saving={creating || updating || isSubmitting}
              saved={false}
              label={editing ? t("actions.save") : t("admin.create")}
              savingLabel={t("actions.saving")}
            />
          </form>
        </AdminSection>
      </div>
      <Dialog
        open={Boolean(deleteTarget)}
        title={t("admin.deleteQuestion", { name: deleteTarget?.name ?? "skill" })}
        description={t("admin.deleteDescription")}
        onClose={() => setDeleteId(null)}
      >
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>
            {t("actions.cancel")}
          </Button>
          <Button variant="danger" disabled={deleting} onClick={() => void confirmDelete()}>
            <Trash2 size={15} strokeWidth={1.5} /> {t("admin.deleteSkillAction")}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
