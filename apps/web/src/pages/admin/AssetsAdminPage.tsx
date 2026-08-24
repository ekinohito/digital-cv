import { useRef, useState } from "react";
import { FileUp, Trash2 } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { getFragmentData } from "../../gql";
import { Button } from "../../components/ui/Button.tsx";
import { Dialog } from "../../components/ui/Dialog.tsx";
import { EmptyState } from "../../components/ui/EmptyState.tsx";
import { ErrorState } from "../../components/ui/ErrorState.tsx";
import { SectionLoading } from "../../components/ui/LoadingBlock.tsx";
import { uploadAsset } from "../../lib/asset-upload.ts";
import {
  AdminAssetsQuery,
  AssetPickerFragment,
  DeleteAssetMutation,
} from "../../features/admin/admin.graphql.ts";
import { errorMessage, formatBytes } from "../../features/admin/admin.utils.ts";
import { AdminPageHeader, AdminSection, DeleteButton } from "./AdminPrimitives.tsx";

export function AssetsAdminPage() {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data, loading, error, refetch } = useQuery(AdminAssetsQuery);
  const [deleteAsset, { loading: deleting }] = useMutation(DeleteAssetMutation);
  const assets = data?.assets ?? [];
  const deleteTarget = assets.find(
    (asset) => getFragmentData(AssetPickerFragment, asset).id === deleteId,
  );

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      await uploadAsset(file);
      toast.success(t("admin.uploadDone"));
      await refetch();
    } catch (uploadError: unknown) {
      toast.error(errorMessage(uploadError, t("admin.serverError")));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteAsset({
        variables: { id: deleteId },
        refetchQueries: [AdminAssetsQuery],
        awaitRefetchQueries: true,
      });
      toast.success(t("admin.deleteAsset"));
      setDeleteId(null);
    } catch (deleteError: unknown) {
      toast.error(errorMessage(deleteError, t("admin.serverError")));
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

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="INFRASTRUCTURE / 06"
        title={t("admin.assets")}
        description={t("admin.assetsDescription")}
        action={
          <>
            <input
              ref={inputRef}
              type="file"
              className="sr-only"
              onChange={(event) => void handleUpload(event.target.files?.[0])}
            />
            <Button type="button" disabled={uploading} onClick={() => inputRef.current?.click()}>
              <FileUp size={16} strokeWidth={1.5} />{" "}
              {uploading ? t("admin.uploading") : t("admin.uploadNew")}
            </Button>
          </>
        }
      />
      <AdminSection className="p-0">
        {assets.length ? (
          <div className="divide-y divide-line">
            {assets.map((asset) => {
              const item = getFragmentData(AssetPickerFragment, asset);
              return (
                <div
                  key={item.id}
                  className="grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-6"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    {item.mimeType.startsWith("image/") ? (
                      <img
                        src={item.url}
                        alt={item.originalName}
                        className="size-14 shrink-0 border border-line object-cover"
                      />
                    ) : (
                      <div className="flex size-14 shrink-0 items-center justify-center border border-line bg-canvas font-mono text-[0.58rem] uppercase text-muted">
                        file
                      </div>
                    )}
                    <div className="min-w-0">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block truncate font-display text-lg tracking-[-0.03em] text-ink underline decoration-line underline-offset-4 hover:text-accent"
                      >
                        {item.originalName}
                      </a>
                      <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted">
                        {item.mimeType} / {formatBytes(item.size)}
                      </p>
                    </div>
                  </div>
                  <DeleteButton onClick={() => setDeleteId(item.id)}>
                    {t("actions.delete")}
                  </DeleteButton>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-5">
            <EmptyState
              title={t("admin.noRecords")}
              description={t("admin.assetsEmptyDescription")}
            />
          </div>
        )}
      </AdminSection>
      <Dialog
        open={Boolean(deleteTarget)}
        title={t("admin.deleteQuestion", {
          name: deleteTarget
            ? getFragmentData(AssetPickerFragment, deleteTarget).originalName
            : "asset",
        })}
        description={t("admin.deleteDescription")}
        onClose={() => setDeleteId(null)}
      >
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>
            {t("actions.cancel")}
          </Button>
          <Button variant="danger" disabled={deleting} onClick={() => void confirmDelete()}>
            <Trash2 size={15} strokeWidth={1.5} /> {t("admin.deleteAssetAction")}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
