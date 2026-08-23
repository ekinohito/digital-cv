import { useEffect, useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { clearAdminToken, getAdminToken } from "../../lib/admin-token.ts";
import { AdminAccessQuery } from "../../features/admin/admin.graphql.ts";
import { AdminLoginPage } from "./AdminLoginPage.tsx";
import { AdminAuthContext } from "./admin-auth.ts";

function GateLoading() {
  const { t } = useTranslation();
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-5">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
        {t("admin.verifying")}
      </p>
    </main>
  );
}

export function AdminGate() {
  const navigate = useNavigate();
  const client = useApolloClient();
  const [token, setToken] = useState<string | null>(() => getAdminToken());
  const { data, loading, error } = useQuery(AdminAccessQuery, {
    skip: !token,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      clearAdminToken();
      setToken(null);
    }
  }, [error]);

  if (!token || error) {
    return <AdminLoginPage onAuthenticated={() => setToken(getAdminToken())} />;
  }

  if (loading || !data) {
    return <GateLoading />;
  }

  if (!data.adminAccess) {
    clearAdminToken();
    return <AdminLoginPage onAuthenticated={() => setToken(getAdminToken())} />;
  }

  const logout = () => {
    clearAdminToken();
    setToken(null);
    void client.clearStore();
    void navigate("/admin", { replace: true });
  };

  return (
    <AdminAuthContext.Provider value={{ logout }}>
      <Outlet />
    </AdminAuthContext.Provider>
  );
}
