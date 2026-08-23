import { useEffect, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";
import { EmptyState } from "../../components/ui/EmptyState.tsx";
import { ErrorState } from "../../components/ui/ErrorState.tsx";
import { Field } from "../../components/ui/Field.tsx";
import { Input } from "../../components/ui/Input.tsx";
import { Textarea } from "../../components/ui/Textarea.tsx";
import { LocalizedFieldPair } from "../../components/ui/LocalizedFieldPair.tsx";
import { SectionLoading } from "../../components/ui/LoadingBlock.tsx";
import { SkillPicker } from "../../components/ui/SkillPicker.tsx";
import { Button } from "../../components/ui/Button.tsx";
import { Dialog } from "../../components/ui/Dialog.tsx";
import {
  AdminSkillsQuery,
  CreateExperienceMutation,
  DeleteExperienceMutation,
  AdminExperiencesQuery,
  UpdateExperienceMutation,
} from "../../features/admin/admin.graphql.ts";
import { PortfolioPageQuery } from "../../features/portfolio/portfolio.graphql.ts";
import { dateInputValue, dateTimeValue, errorMessage } from "../../features/admin/admin.utils.ts";
import {
  AdminPageHeader,
  AdminSection,
  AddButton,
  DeleteButton,
  SaveBar,
} from "./AdminPrimitives.tsx";

const experienceSchema = z.object({
  company: z.string().trim().min(1, "Company is required"),
  roleEn: z.string().trim().min(1, "English role is required"),
  roleRu: z.string().trim().min(1, "Russian role is required"),
  descriptionEn: z.string().trim().min(1, "English description is required"),
  descriptionRu: z.string().trim().min(1, "Russian description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string(),
  sortOrder: z.string().regex(/^\d+$/, "Use a whole number"),
  skillIds: z.array(z.string()),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;
const emptyValues: ExperienceFormValues = {
  company: "",
  roleEn: "",
  roleRu: "",
  descriptionEn: "",
  descriptionRu: "",
  startDate: "",
  endDate: "",
  sortOrder: "10",
  skillIds: [],
};

export function ExperienceAdminPage() {
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data, loading, error, refetch } = useQuery(AdminExperiencesQuery);
  const { data: skillsData } = useQuery(AdminSkillsQuery);
  const [createExperience, { loading: creating }] = useMutation(CreateExperienceMutation);
  const [updateExperience, { loading: updating }] = useMutation(UpdateExperienceMutation);
  const [deleteExperience, { loading: deleting }] = useMutation(DeleteExperienceMutation);
  const editing = data?.experiences.find((item) => item.id === editingId);
  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: emptyValues,
  });
  const selectedSkills = watch("skillIds");
  const saving = creating || updating || isSubmitting;

  useEffect(() => {
    if (editing) {
      reset({
        company: editing.company,
        roleEn: editing.roleEn,
        roleRu: editing.roleRu,
        descriptionEn: editing.descriptionEn,
        descriptionRu: editing.descriptionRu,
        startDate: dateInputValue(editing.startDate),
        endDate: dateInputValue(editing.endDate),
        sortOrder: String(editing.sortOrder),
        skillIds: editing.skills.map((skill) => skill.id),
      });
    } else {
      reset(emptyValues);
    }
  }, [editing, reset]);

  const submit = async (values: ExperienceFormValues) => {
    const input = {
      company: values.company,
      roleEn: values.roleEn,
      roleRu: values.roleRu,
      descriptionEn: values.descriptionEn,
      descriptionRu: values.descriptionRu,
      startDate: dateTimeValue(values.startDate),
      endDate: values.endDate ? dateTimeValue(values.endDate) : null,
      sortOrder: Number(values.sortOrder),
      skillIds: values.skillIds,
    };
    try {
      if (editingId) {
        await updateExperience({
          variables: { id: editingId, input },
          refetchQueries: [AdminExperiencesQuery, PortfolioPageQuery],
          awaitRefetchQueries: true,
        });
        toast.success(t("admin.saveExperience"));
      } else {
        await createExperience({
          variables: { input },
          refetchQueries: [AdminExperiencesQuery, PortfolioPageQuery],
          awaitRefetchQueries: true,
        });
        toast.success(t("admin.createExperience"));
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
      await deleteExperience({
        variables: { id: deleteId },
        refetchQueries: [AdminExperiencesQuery, PortfolioPageQuery],
        awaitRefetchQueries: true,
      });
      toast.success(t("admin.deleteExperience"));
      if (editingId === deleteId) setEditingId(null);
      setDeleteId(null);
    } catch (mutationError: unknown) {
      toast.error(errorMessage(mutationError, t("admin.serverError")));
    }
  };

  if (loading && !data) return <SectionLoading />;
  if (error && !data)
    return (
      <ErrorState
        title="Could not load experiences."
        description={error.message}
        retry={() => void refetch()}
      />
    );
  const experiences = data?.experiences ?? [];
  const deleteTarget = experiences.find((item) => item.id === deleteId);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="CONTENT / 02"
        title={t("admin.experience")}
        description="Keep the chronology concise: role, context and the systems shipped."
        action={<AddButton onClick={() => setEditingId(null)}>{t("admin.create")}</AddButton>}
      />
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)]">
        <AdminSection className="p-0">
          {experiences.length ? (
            experiences.map((experience) => (
              <div
                key={experience.id}
                className="grid gap-4 border-b border-line p-5 last:border-0 md:grid-cols-[minmax(125px,0.33fr)_1fr_auto] md:items-start md:p-6"
              >
                <div>
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.08em] text-muted">
                    {dateInputValue(experience.startDate)} —{" "}
                    {experience.endDate ? dateInputValue(experience.endDate) : t("public.present")}
                  </p>
                  <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-accent">
                    #{String(experience.sortOrder).padStart(2, "0")}
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-2xl tracking-[-0.04em]">{experience.company}</h2>
                  <p className="mt-1 text-sm text-muted">{experience.roleEn}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="quiet" onClick={() => setEditingId(experience.id)}>
                    <Pencil size={14} strokeWidth={1.5} /> {t("actions.edit")}
                  </Button>
                  <DeleteButton onClick={() => setDeleteId(experience.id)} />
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
                {editing ? "EDIT / EXPERIENCE" : "NEW / EXPERIENCE"}
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-[-0.04em]">
                {editing ? editing.company : t("admin.createExperience")}
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
          <form className="mt-7 space-y-6" onSubmit={handleSubmit(submit)}>
            <Field
              label={t("admin.company")}
              htmlFor="experience-company"
              error={errors.company?.message}
            >
              <Input id="experience-company" {...register("company")} />
            </Field>
            <LocalizedFieldPair
              label={t("admin.role")}
              en={
                <Field label="EN" htmlFor="experience-role-en" error={errors.roleEn?.message}>
                  <Input id="experience-role-en" {...register("roleEn")} />
                </Field>
              }
              ru={
                <Field label="RU" htmlFor="experience-role-ru" error={errors.roleRu?.message}>
                  <Input id="experience-role-ru" {...register("roleRu")} />
                </Field>
              }
            />
            <LocalizedFieldPair
              label={t("admin.description")}
              en={
                <Field
                  label="EN"
                  htmlFor="experience-description-en"
                  error={errors.descriptionEn?.message}
                >
                  <Textarea id="experience-description-en" {...register("descriptionEn")} />
                </Field>
              }
              ru={
                <Field
                  label="RU"
                  htmlFor="experience-description-ru"
                  error={errors.descriptionRu?.message}
                >
                  <Textarea id="experience-description-ru" {...register("descriptionRu")} />
                </Field>
              }
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label={t("admin.startDate")}
                htmlFor="experience-start"
                error={errors.startDate?.message}
              >
                <Input id="experience-start" type="date" {...register("startDate")} />
              </Field>
              <Field
                label={t("admin.endDate")}
                htmlFor="experience-end"
                error={errors.endDate?.message}
              >
                <Input id="experience-end" type="date" {...register("endDate")} />
              </Field>
            </div>
            <Field
              label={t("admin.sortOrder")}
              htmlFor="experience-order"
              error={errors.sortOrder?.message}
            >
              <Input id="experience-order" type="number" min="0" {...register("sortOrder")} />
            </Field>
            <SkillPicker
              label={t("admin.skills")}
              skills={skillsData?.skills ?? []}
              selectedIds={selectedSkills}
              onChange={(ids) => setValue("skillIds", ids, { shouldDirty: true })}
            />
            <SaveBar
              saving={saving}
              saved={false}
              label={editing ? t("actions.save") : t("admin.create")}
              savingLabel={t("actions.saving")}
            />
          </form>
        </AdminSection>
      </div>
      <Dialog
        open={Boolean(deleteTarget)}
        title={t("admin.deleteQuestion", { name: deleteTarget?.company ?? "experience" })}
        description={t("admin.deleteDescription")}
        onClose={() => setDeleteId(null)}
      >
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>
            {t("actions.cancel")}
          </Button>
          <Button variant="danger" disabled={deleting} onClick={() => void confirmDelete()}>
            <Trash2 size={15} strokeWidth={1.5} /> {t("admin.deleteExperienceAction")}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
