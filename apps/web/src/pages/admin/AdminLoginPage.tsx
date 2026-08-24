import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useApolloClient } from "@apollo/client/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { AdminAccessQuery } from "../../features/admin/admin.graphql.ts";
import { clearAdminToken, setAdminToken } from "../../lib/admin-token.ts";
import { Button } from "../../components/ui/Button.tsx";
import { Field, FormError } from "../../components/ui/Field.tsx";
import { Input } from "../../components/ui/Input.tsx";
import { PageContainer } from "../../components/layout/PageContainer.tsx";
import { errorMessage } from "../../features/admin/admin.utils.ts";

type Translate = (key: string) => string;
const createLoginSchema = (t: Translate) =>
  z.object({ token: z.string().trim().min(1, t("admin.tokenRequired")) });
type LoginValues = z.infer<ReturnType<typeof createLoginSchema>>;

export function AdminLoginPage({ onAuthenticated }: { onAuthenticated: () => void }) {
  const { t } = useTranslation();
  const loginSchema = createLoginSchema(t);
  const client = useApolloClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { token: "" } });

  const submit = async ({ token }: LoginValues) => {
    setServerError(null);
    setAdminToken(token);
    try {
      const result = await client.query({ query: AdminAccessQuery, fetchPolicy: "network-only" });
      if (!result.data?.adminAccess) {
        throw new Error(t("admin.invalidToken"));
      }
      onAuthenticated();
      const destination = location.pathname.startsWith("/admin/")
        ? location.pathname
        : "/admin/profile";
      void navigate(destination, { replace: true });
    } catch (error: unknown) {
      clearAdminToken();
      setServerError(errorMessage(error, t("admin.invalidToken")));
    }
  };

  return (
    <main className="min-h-screen bg-canvas py-6 md:py-10">
      <PageContainer>
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-widest text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} strokeWidth={1.5} /> {t("architecture.backToPortfolio")}
        </Link>
        <div className="mx-auto grid max-w-5xl gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-28">
          <div>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent">
              {t("admin.accessLabel")}
            </p>
            <h1 className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.88] tracking-[-0.07em] text-ink">
              {t("admin.loginTitle")}
            </h1>
          </div>
          <form
            className="border border-line bg-surface p-6 md:p-8"
            onSubmit={(event) => void handleSubmit(submit)(event)}
          >
            <div className="flex size-10 items-center justify-center border border-accent-soft bg-accent-soft text-accent">
              <LockKeyhole size={18} strokeWidth={1.5} />
            </div>
            <p className="mt-7 max-w-md text-sm leading-7 text-muted">
              {t("admin.loginDescription")}
            </p>
            <Field
              className="mt-8"
              label={t("admin.token")}
              htmlFor="admin-token"
              hint={t("admin.tokenHint")}
              error={errors.token?.message}
            >
              <Input
                id="admin-token"
                type="password"
                autoComplete="current-password"
                {...register("token")}
              />
            </Field>
            {serverError ? (
              <FormError>
                {serverError.includes("Network") ? t("admin.networkError") : serverError}
              </FormError>
            ) : null}
            <Button className="mt-7 w-full" size="lg" type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("admin.signIn") + "..." : t("admin.signIn")}
            </Button>
          </form>
        </div>
      </PageContainer>
    </main>
  );
}
