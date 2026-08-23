import { useRef, useState } from "react";
import { FileUp, Image as ImageIcon, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getFragmentData, type FragmentType } from "../../gql";
import { uploadAsset, type AssetUploadResponse } from "../../lib/asset-upload.ts";
import { errorMessage } from "../../features/admin/admin.utils.ts";
import { AssetPickerFragment } from "../../features/admin/admin.graphql.ts";
import { Button } from "./Button.tsx";
import { Field } from "./Field.tsx";

type AssetPickerProps = {
  label: string;
  asset: FragmentType<typeof AssetPickerFragment> | null | undefined;
  uploaded?: AssetUploadResponse | null;
  removed?: boolean;
  onUploaded: (asset: AssetUploadResponse) => void;
  onRemove: () => void;
  onError: (message: string) => void;
};

export function AssetPicker({
  label,
  asset,
  uploaded,
  removed = false,
  onUploaded,
  onRemove,
  onError,
}: AssetPickerProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const current = asset ? getFragmentData(AssetPickerFragment, asset) : null;
  const previewUrl = removed ? undefined : (uploaded?.url ?? current?.url);
  const previewName = removed ? undefined : (uploaded?.originalName ?? current?.originalName);

  const handleFileChange = async (file: File | undefined) => {
    if (!file) {
      return;
    }

    setUploading(true);
    try {
      onUploaded(await uploadAsset(file));
    } catch (error: unknown) {
      onError(errorMessage(error, t("admin.uploadError")));
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <Field label={label}>
      <div className="border border-line bg-surface p-3">
        <div className="flex flex-wrap items-center gap-4">
          {previewUrl &&
          (current?.mimeType.startsWith("image/") || uploaded?.mimeType.startsWith("image/")) ? (
            <img
              src={previewUrl}
              alt={previewName ?? label}
              className="size-16 border border-line object-cover"
            />
          ) : (
            <div
              className="flex size-16 items-center justify-center border border-dashed border-line text-muted"
              aria-hidden="true"
            >
              <ImageIcon size={22} strokeWidth={1.4} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-ink">{previewName ?? t("admin.noAsset")}</p>
            {current ? (
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted">
                {current.mimeType} / {current.size} B
              </p>
            ) : null}
          </div>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            onChange={(event) => void handleFileChange(event.target.files?.[0])}
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            <FileUp size={15} strokeWidth={1.5} />{" "}
            {uploading ? t("admin.uploading") : t("admin.uploadNew")}
          </Button>
          {previewUrl ? (
            <Button type="button" variant="quiet" size="sm" onClick={onRemove}>
              <X size={15} strokeWidth={1.5} /> {t("admin.removeAsset")}
            </Button>
          ) : null}
        </div>
      </div>
    </Field>
  );
}
