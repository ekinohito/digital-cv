import { useEffect, useState } from "react";
import { ExternalLink, Pencil, Trash2, X } from "lucide-react";
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
import { SectionLoading } from "../../components/ui/LoadingBlock.tsx";
import {
  AdminLinksQuery,
  CreateSocialLinkMutation,
  DeleteSocialLinkMutation,
  UpdateSocialLinkMutation,
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

type Translate = (key: string) => string;

const createLinkSchema = (t: Translate) =>
  z.object({
    platform: z.string().trim().min(1, t("admin.validation.required")),
    label: z.string().trim().min(1, t("admin.validation.required")),
    url: z.string().url(t("admin.validation.url")),
    sortOrder: z.string().regex(/^\d+$/, t("admin.validation.number")),
  });
type LinkFormValues = z.infer<ReturnType<typeof createLinkSchema>>;
const emptyValues: LinkFormValues = {
  platform: "github",
  label: "GitHub",
  url: "",
  sortOrder: "10",
};

export function LinksAdminPage() {
  const { t } = useTranslation();
  const linkSchema = createLinkSchema(t);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data, loading, error, refetch } = useQuery(AdminLinksQuery);
  const [createLink, { loading: creating }] = useMutation(CreateSocialLinkMutation);
  const [updateLink, { loading: updating }] = useMutation(UpdateSocialLinkMutation);
  const [deleteLink, { loading: deleting }] = useMutation(DeleteSocialLinkMutation);
  const editing = data?.socialLinks.find((link) => link.id === editingId);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LinkFormValues>({ resolver: zodResolver(linkSchema), defaultValues: emptyValues });

  useEffect(() => {
    if (editing)
      reset({
        platform: editing.platform,
        label: editing.label,
        url: editing.url,
        sortOrder: String(editing.sortOrder),
      });
    else reset(emptyValues);
  }, [editing, reset]);

  const submit = async (values: LinkFormValues) => {
    try {
      if (editingId) {
        await updateLink({
          variables: {
            id: editingId,
            input: {
              platform: values.platform,
              label: values.label,
              url: values.url,
              sortOrder: Number(values.sortOrder),
            },
          },
          refetchQueries: [AdminLinksQuery, PortfolioPageQuery],
          awaitRefetchQueries: true,
        });
        toast.success(t("admin.saveLink"));
      } else {
        await createLink({
          variables: {
            input: {
              platform: values.platform,
              label: values.label,
              url: values.url,
              sortOrder: Number(values.sortOrder),
            },
          },
          refetchQueries: [AdminLinksQuery, PortfolioPageQuery],
          awaitRefetchQueries: true,
        });
        toast.success(t("admin.createLink"));
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
      await deleteLink({
        variables: { id: deleteId },
        refetchQueries: [AdminLinksQuery, PortfolioPageQuery],
        awaitRefetchQueries: true,
      });
      toast.success(t("admin.deleteLink"));
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
  const links = data?.socialLinks ?? [];
  const deleteTarget = links.find((link) => link.id === deleteId);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="CONTENT / 05"
        title={t("admin.links")}
        description={t("admin.linksDescription")}
        action={<AddButton onClick={() => setEditingId(null)}>{t("admin.create")}</AddButton>}
      />
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(330px,0.62fr)]">
        <AdminSection className="p-0">
          {links.length ? (
            links.map((link) => (
              <div
                key={link.id}
                className="grid gap-4 border-b border-line p-5 last:border-0 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-6"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-2xl tracking-[-0.04em]">{link.label}</h2>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-accent">
                      {link.platform}
                    </span>
                  </div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex max-w-full items-center gap-1 truncate text-sm text-muted underline decoration-line underline-offset-4 hover:text-ink"
                  >
                    {link.url}
                    <ExternalLink size={13} strokeWidth={1.5} />
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="quiet" size="sm" onClick={() => setEditingId(link.id)}>
                    <Pencil size={14} strokeWidth={1.5} /> {t("actions.edit")}
                  </Button>
                  <DeleteButton onClick={() => setDeleteId(link.id)} />
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
              <p className="font-mono text-[0.64rem] uppercase tracking-widest text-accent">
                {editing ? t("admin.editRecord") : t("admin.newRecord")}
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-[-0.04em]">
                {editing ? editing.label : t("admin.createLink")}
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
          <form className="mt-7 space-y-5" onSubmit={handleSubmit(submit)}>
            <Field
              label={t("admin.platform")}
              htmlFor="link-platform"
              error={errors.platform?.message}
            >
              <Input id="link-platform" {...register("platform")} />
            </Field>
            <Field label={t("admin.label")} htmlFor="link-label" error={errors.label?.message}>
              <Input id="link-label" {...register("label")} />
            </Field>
            <Field label={t("admin.url")} htmlFor="link-url" error={errors.url?.message}>
              <Input id="link-url" type="url" placeholder="https://..." {...register("url")} />
            </Field>
            <Field
              label={t("admin.sortOrder")}
              htmlFor="link-order"
              error={errors.sortOrder?.message}
            >
              <Input id="link-order" type="number" min="0" {...register("sortOrder")} />
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
        title={t("admin.deleteQuestion", { name: deleteTarget?.label ?? "link" })}
        description={t("admin.deleteDescription")}
        onClose={() => setDeleteId(null)}
      >
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>
            {t("actions.cancel")}
          </Button>
          <Button variant="danger" disabled={deleting} onClick={() => void confirmDelete()}>
            <Trash2 size={15} strokeWidth={1.5} /> {t("admin.deleteLinkAction")}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
