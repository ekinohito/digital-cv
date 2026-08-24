import { useEffect, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { getFragmentData } from "../../gql";
import { AssetPicker } from "../../components/ui/AssetPicker.tsx";
import { Button } from "../../components/ui/Button.tsx";
import { Dialog } from "../../components/ui/Dialog.tsx";
import { EmptyState } from "../../components/ui/EmptyState.tsx";
import { ErrorState } from "../../components/ui/ErrorState.tsx";
import { Field } from "../../components/ui/Field.tsx";
import { Input } from "../../components/ui/Input.tsx";
import { LocalizedFieldPair } from "../../components/ui/LocalizedFieldPair.tsx";
import { SectionLoading } from "../../components/ui/LoadingBlock.tsx";
import { SkillPicker } from "../../components/ui/SkillPicker.tsx";
import { Textarea } from "../../components/ui/Textarea.tsx";
import { type AssetUploadResponse } from "../../lib/asset-upload.ts";
import {
  AdminProjectsQuery,
  AdminSkillsQuery,
  AssetPickerFragment,
  CreateProjectMutation,
  DeleteProjectMutation,
  UpdateProjectMutation,
} from "../../features/admin/admin.graphql.ts";
import { PortfolioPageQuery } from "../../features/portfolio/portfolio.graphql.ts";
import { errorMessage } from "../../features/admin/admin.utils.ts";
import {
  emptyProjectFormValues,
  createProjectFormSchema,
  projectMutationInput,
  type ProjectFormValues,
} from "../../features/projects/project-form.ts";
import {
  AdminPageHeader,
  AdminSection,
  AddButton,
  DeleteButton,
  SaveBar,
} from "./AdminPrimitives.tsx";

export function ProjectsAdminPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "ru" ? "ru" : "en";
  const projectFormSchema = createProjectFormSchema(t);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [imageUpload, setImageUpload] = useState<AssetUploadResponse | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const { data, loading, error, refetch } = useQuery(AdminProjectsQuery);
  const { data: skillsData } = useQuery(AdminSkillsQuery);
  const [createProject, { loading: creating }] = useMutation(CreateProjectMutation);
  const [updateProject, { loading: updating }] = useMutation(UpdateProjectMutation);
  const [deleteProject, { loading: deleting }] = useMutation(DeleteProjectMutation);
  const editing = data?.projects.find((item) => item.id === editingId);
  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: emptyProjectFormValues,
  });
  const selectedSkills = watch("skillIds");
  const saving = creating || updating || isSubmitting;

  useEffect(() => {
    if (editing) {
      const image = editing.image ? getFragmentData(AssetPickerFragment, editing.image) : null;
      reset({
        slug: editing.slug,
        titleEn: editing.titleEn,
        titleRu: editing.titleRu,
        summaryEn: editing.summaryEn,
        summaryRu: editing.summaryRu,
        detailsEn: editing.detailsEn ?? "",
        detailsRu: editing.detailsRu ?? "",
        repoUrl: editing.repoUrl ?? "",
        liveUrl: editing.liveUrl ?? "",
        featured: editing.featured,
        sortOrder: String(editing.sortOrder),
        skillIds: editing.skills.map((skill) => skill.id),
        imageAssetId: image?.id ?? "",
      });
    } else {
      reset(emptyProjectFormValues);
    }
    setImageUpload(null);
    setImageRemoved(false);
  }, [editing, reset]);

  const submit = async (values: ProjectFormValues) => {
    const input = projectMutationInput(values);
    try {
      if (editingId) {
        await updateProject({
          variables: { id: editingId, input },
          refetchQueries: [AdminProjectsQuery, PortfolioPageQuery],
          awaitRefetchQueries: true,
        });
        toast.success(t("admin.saveProject"));
      } else {
        await createProject({
          variables: { input },
          refetchQueries: [AdminProjectsQuery, PortfolioPageQuery],
          awaitRefetchQueries: true,
        });
        toast.success(t("admin.createProject"));
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
      await deleteProject({
        variables: { id: deleteId },
        refetchQueries: [AdminProjectsQuery, PortfolioPageQuery],
        awaitRefetchQueries: true,
      });
      toast.success(t("admin.deleteProject"));
      setDeleteId(null);
      if (editingId === deleteId) setEditingId(null);
    } catch (mutationError: unknown) {
      toast.error(errorMessage(mutationError, t("admin.serverError")));
    }
  };

  if (loading && !data) return <SectionLoading rows={4} />;
  if (error && !data)
    return (
      <ErrorState
        title={t("admin.loadError")}
        description={error.message}
        retry={() => void refetch()}
      />
    );
  const projects = data?.projects ?? [];
  const deleteTarget = projects.find((item) => item.id === deleteId);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="CONTENT / 03"
        title={t("admin.projects")}
        description={t("admin.projectsDescription")}
        action={<AddButton onClick={() => setEditingId(null)}>{t("admin.create")}</AddButton>}
      />
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(390px,0.78fr)]">
        <AdminSection className="p-0">
          {projects.length ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="grid gap-4 border-b border-line p-5 last:border-0 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-6"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-2xl tracking-[-0.04em]">
                      {locale === "ru" ? project.titleRu : project.titleEn}
                    </h2>
                    {project.featured ? (
                      <span className="font-mono text-[0.58rem] uppercase tracking-widest text-accent">
                        {t("admin.featuredLabel")}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 truncate font-mono text-[0.64rem] uppercase tracking-[0.08em] text-muted">
                    /{project.slug}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
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
                  <Button variant="quiet" size="sm" onClick={() => setEditingId(project.id)}>
                    <Pencil size={14} strokeWidth={1.5} /> {t("actions.edit")}
                  </Button>
                  <DeleteButton onClick={() => setDeleteId(project.id)} />
                </div>
              </div>
            ))
          ) : (
            <div className="p-5">
              <EmptyState title={t("admin.notConfigured")} />
            </div>
          )}
        </AdminSection>

        <AdminSection className="xl:sticky xl:top-8 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.64rem] uppercase tracking-widest text-accent">
                {editing ? t("admin.editRecord") : t("admin.newRecord")}
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-[-0.04em]">
                {editing
                  ? locale === "ru"
                    ? editing.titleRu
                    : editing.titleEn
                  : t("admin.createProject")}
              </h2>
            </div>
            {editingId ? (
              <button
                type="button"
                className="text-muted hover:text-ink"
                aria-label={t("admin.closeEditor")}
                onClick={() => setEditingId(null)}
              >
                <X size={19} strokeWidth={1.5} />
              </button>
            ) : null}
          </div>
          <form className="mt-7 space-y-6" onSubmit={handleSubmit(submit)}>
            <Field
              label={t("admin.slug")}
              htmlFor="project-slug"
              hint={t("admin.slugHint")}
              error={errors.slug?.message}
            >
              <Input id="project-slug" {...register("slug")} />
            </Field>
            <LocalizedFieldPair
              label={t("admin.title")}
              en={
                <Field label="EN" htmlFor="project-title-en" error={errors.titleEn?.message}>
                  <Input id="project-title-en" {...register("titleEn")} />
                </Field>
              }
              ru={
                <Field label="RU" htmlFor="project-title-ru" error={errors.titleRu?.message}>
                  <Input id="project-title-ru" {...register("titleRu")} />
                </Field>
              }
            />
            <LocalizedFieldPair
              label={t("admin.summary")}
              en={
                <Field label="EN" htmlFor="project-summary-en" error={errors.summaryEn?.message}>
                  <Textarea id="project-summary-en" {...register("summaryEn")} />
                </Field>
              }
              ru={
                <Field label="RU" htmlFor="project-summary-ru" error={errors.summaryRu?.message}>
                  <Textarea id="project-summary-ru" {...register("summaryRu")} />
                </Field>
              }
            />
            <LocalizedFieldPair
              label={t("admin.details")}
              en={
                <Field label="EN" htmlFor="project-details-en" error={errors.detailsEn?.message}>
                  <Textarea id="project-details-en" {...register("detailsEn")} />
                </Field>
              }
              ru={
                <Field label="RU" htmlFor="project-details-ru" error={errors.detailsRu?.message}>
                  <Textarea id="project-details-ru" {...register("detailsRu")} />
                </Field>
              }
            />
            <div className="grid gap-4">
              <Field
                label={t("admin.repositoryUrl")}
                htmlFor="project-repo"
                error={errors.repoUrl?.message}
              >
                <Input
                  id="project-repo"
                  type="url"
                  placeholder="https://github.com/..."
                  {...register("repoUrl")}
                />
              </Field>
              <Field
                label={t("admin.liveUrl")}
                htmlFor="project-live"
                error={errors.liveUrl?.message}
              >
                <Input
                  id="project-live"
                  type="url"
                  placeholder="https://..."
                  {...register("liveUrl")}
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <Field
                label={t("admin.sortOrder")}
                htmlFor="project-order"
                error={errors.sortOrder?.message}
              >
                <Input id="project-order" type="number" min="0" {...register("sortOrder")} />
              </Field>
              <label className="flex min-h-11 items-center gap-3 border border-line bg-surface px-3 text-sm">
                <input type="checkbox" className="size-4 accent-accent" {...register("featured")} />{" "}
                <span>{t("admin.featured")}</span>
              </label>
            </div>
            <SkillPicker
              label={t("admin.skills")}
              skills={skillsData?.skills ?? []}
              selectedIds={selectedSkills}
              onChange={(ids) => setValue("skillIds", ids, { shouldDirty: true })}
            />
            <AssetPicker
              label={t("admin.image")}
              asset={editing?.image}
              uploaded={imageUpload}
              removed={imageRemoved}
              onUploaded={(asset) => {
                setImageUpload(asset);
                setImageRemoved(false);
                setValue("imageAssetId", asset.id, { shouldDirty: true });
              }}
              onRemove={() => {
                setImageUpload(null);
                setImageRemoved(true);
                setValue("imageAssetId", "", { shouldDirty: true });
              }}
              onError={(message) => toast.error(message)}
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
        title={t("admin.deleteQuestion", { name: deleteTarget?.titleEn ?? "project" })}
        description={t("admin.deleteDescription")}
        onClose={() => setDeleteId(null)}
      >
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>
            {t("actions.cancel")}
          </Button>
          <Button variant="danger" disabled={deleting} onClick={() => void confirmDelete()}>
            <Trash2 size={15} strokeWidth={1.5} /> {t("admin.deleteProjectAction")}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
