import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";
import { getFragmentData } from "../../gql";
import { AssetPicker } from "../../components/ui/AssetPicker.tsx";
import { ErrorState } from "../../components/ui/ErrorState.tsx";
import { Field } from "../../components/ui/Field.tsx";
import { Input } from "../../components/ui/Input.tsx";
import { Textarea } from "../../components/ui/Textarea.tsx";
import { LocalizedFieldPair } from "../../components/ui/LocalizedFieldPair.tsx";
import { SectionLoading } from "../../components/ui/LoadingBlock.tsx";
import { PortfolioPageQuery } from "../../features/portfolio/portfolio.graphql.ts";
import {
  AssetPickerFragment,
  AdminProfileQuery,
  UpdateProfileMutation,
} from "../../features/admin/admin.graphql.ts";
import { type AssetUploadResponse } from "../../lib/asset-upload.ts";
import { errorMessage } from "../../features/admin/admin.utils.ts";
import { AdminPageHeader, AdminSection, SaveBar } from "./AdminPrimitives.tsx";

type Translate = (key: string) => string;

const createProfileSchema = (t: Translate) =>
  z.object({
    fullName: z.string().trim().min(1, t("admin.validation.required")),
    headlineEn: z.string().trim().min(1, t("admin.validation.required")),
    headlineRu: z.string().trim().min(1, t("admin.validation.required")),
    summaryEn: z.string().trim().min(1, t("admin.validation.required")),
    summaryRu: z.string().trim().min(1, t("admin.validation.required")),
    email: z.string().trim().email(t("admin.validation.email")),
    githubUrl: z.string().url(t("admin.validation.url")).or(z.literal("")),
    avatarAssetId: z.string(),
    resumeAssetId: z.string(),
  });

type ProfileFormValues = z.infer<ReturnType<typeof createProfileSchema>>;

export function ProfileAdminPage() {
  const { t } = useTranslation();
  const profileSchema = createProfileSchema(t);
  const { data, loading, error, refetch } = useQuery(AdminProfileQuery);
  const [updateProfile, { loading: saving }] = useMutation(UpdateProfileMutation);
  const [avatarUpload, setAvatarUpload] = useState<AssetUploadResponse | null>(null);
  const [resumeUpload, setResumeUpload] = useState<AssetUploadResponse | null>(null);
  const [avatarRemoved, setAvatarRemoved] = useState(false);
  const [resumeRemoved, setResumeRemoved] = useState(false);
  const [saved, setSaved] = useState(false);
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      headlineEn: "",
      headlineRu: "",
      summaryEn: "",
      summaryRu: "",
      email: "",
      githubUrl: "",
      avatarAssetId: "",
      resumeAssetId: "",
    },
  });
  const profile = data?.profile;

  useEffect(() => {
    if (!profile) return;
    const avatar = profile.avatar ? getFragmentData(AssetPickerFragment, profile.avatar) : null;
    const resume = profile.resume ? getFragmentData(AssetPickerFragment, profile.resume) : null;
    reset({
      fullName: profile.fullName,
      headlineEn: profile.headlineEn,
      headlineRu: profile.headlineRu,
      summaryEn: profile.summaryEn,
      summaryRu: profile.summaryRu,
      email: profile.email,
      githubUrl: profile.githubUrl ?? "",
      avatarAssetId: avatar?.id ?? "",
      resumeAssetId: resume?.id ?? "",
    });
    setAvatarUpload(null);
    setResumeUpload(null);
    setAvatarRemoved(false);
    setResumeRemoved(false);
  }, [profile, reset]);

  const submit = async (values: ProfileFormValues) => {
    setSaved(false);
    try {
      await updateProfile({
        variables: {
          input: {
            fullName: values.fullName,
            headlineEn: values.headlineEn,
            headlineRu: values.headlineRu,
            summaryEn: values.summaryEn,
            summaryRu: values.summaryRu,
            email: values.email,
            githubUrl: values.githubUrl || null,
            avatarAssetId: values.avatarAssetId || null,
            resumeAssetId: values.resumeAssetId || null,
          },
        },
        refetchQueries: [AdminProfileQuery, PortfolioPageQuery],
        awaitRefetchQueries: true,
      });
      setSaved(true);
      toast.success(t("admin.saveProfile"));
      await refetch();
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

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="CONTENT / 01"
        title={t("admin.profile")}
        description={t("admin.profileDescription")}
      />
      <AdminSection>
        <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          <Field
            label={t("admin.fullName")}
            htmlFor="profile-name"
            error={errors.fullName?.message}
          >
            <Input id="profile-name" {...register("fullName")} />
          </Field>
          <LocalizedFieldPair
            label={t("admin.headline")}
            en={
              <Field label="EN" htmlFor="profile-headline-en" error={errors.headlineEn?.message}>
                <Input id="profile-headline-en" {...register("headlineEn")} />
              </Field>
            }
            ru={
              <Field label="RU" htmlFor="profile-headline-ru" error={errors.headlineRu?.message}>
                <Input id="profile-headline-ru" {...register("headlineRu")} />
              </Field>
            }
          />
          <LocalizedFieldPair
            label={t("admin.summary")}
            en={
              <Field label="EN" htmlFor="profile-summary-en" error={errors.summaryEn?.message}>
                <Textarea id="profile-summary-en" {...register("summaryEn")} />
              </Field>
            }
            ru={
              <Field label="RU" htmlFor="profile-summary-ru" error={errors.summaryRu?.message}>
                <Textarea id="profile-summary-ru" {...register("summaryRu")} />
              </Field>
            }
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t("admin.email")} htmlFor="profile-email" error={errors.email?.message}>
              <Input id="profile-email" type="email" {...register("email")} />
            </Field>
            <Field
              label={t("admin.githubUrl")}
              htmlFor="profile-github"
              error={errors.githubUrl?.message}
            >
              <Input
                id="profile-github"
                type="url"
                placeholder="https://github.com/..."
                {...register("githubUrl")}
              />
            </Field>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <AssetPicker
              label={t("admin.avatar")}
              asset={profile?.avatar}
              uploaded={avatarUpload}
              removed={avatarRemoved}
              onUploaded={(asset) => {
                setAvatarUpload(asset);
                setAvatarRemoved(false);
                setValue("avatarAssetId", asset.id, { shouldDirty: true });
              }}
              onRemove={() => {
                setAvatarUpload(null);
                setAvatarRemoved(true);
                setValue("avatarAssetId", "", { shouldDirty: true });
              }}
              onError={(message) => toast.error(message)}
            />
            <AssetPicker
              label={t("admin.resume")}
              asset={profile?.resume}
              uploaded={resumeUpload}
              removed={resumeRemoved}
              onUploaded={(asset) => {
                setResumeUpload(asset);
                setResumeRemoved(false);
                setValue("resumeAssetId", asset.id, { shouldDirty: true });
              }}
              onRemove={() => {
                setResumeUpload(null);
                setResumeRemoved(true);
                setValue("resumeAssetId", "", { shouldDirty: true });
              }}
              onError={(message) => toast.error(message)}
            />
          </div>
          <SaveBar
            saving={saving || isSubmitting}
            saved={saved}
            label={t("actions.save")}
            savingLabel={t("actions.saving")}
            savedLabel={t("actions.saved")}
          />
        </form>
      </AdminSection>
    </div>
  );
}
