import { createContext, useContext } from "react";

type AdminAuthContextValue = { logout: () => void };

export const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminGate");
  }
  return context;
}
