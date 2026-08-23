import { useState } from "react";
import { ExternalLink, LogOut, Menu, X } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAdminAuth } from "./admin-auth.ts";
import { PageContainer } from "../../components/layout/PageContainer.tsx";
import { cn } from "../../lib/cn.ts";

const navigation = [
  { key: "profile", path: "profile" },
  { key: "experience", path: "experience" },
  { key: "projects", path: "projects" },
  { key: "skills", path: "skills" },
  { key: "links", path: "links" },
  { key: "assets", path: "assets" },
] as const;

export function AdminLayout() {
  const { t } = useTranslation();
  const { logout } = useAdminAuth();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const active =
    navigation.find((item) => location.pathname.endsWith(`/${item.path}`))?.path ?? "profile";

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-line bg-surface lg:hidden">
        <PageContainer>
          <div className="flex min-h-[68px] items-center justify-between gap-4">
            <Link
              to="/admin/profile"
              className="font-display text-lg font-semibold tracking-[-0.04em]"
            >
              Digital CV<span className="text-accent">.</span>
            </Link>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center"
              aria-label={mobileNavOpen ? t("admin.closeNavigation") : t("admin.openNavigation")}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              {mobileNavOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
          {mobileNavOpen ? (
            <div className="border-t border-line py-4">
              <nav aria-label="Admin navigation">
                {navigation.map((item) => (
                  <NavLink
                    key={item.path}
                    to={`/admin/${item.path}`}
                    onClick={() => setMobileNavOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block border-b border-line py-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted last:border-0",
                        isActive && "text-accent",
                      )
                    }
                  >
                    {t(`admin.${item.key}`)}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-4 flex items-center gap-5 border-t border-line pt-4">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-muted"
                >
                  {t("admin.openSite")} <ExternalLink size={13} strokeWidth={1.5} />
                </a>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-muted"
                >
                  {t("admin.signOut")} <LogOut size={13} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ) : null}
        </PageContainer>
      </header>

      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-surface px-7 py-8 lg:flex">
          <Link
            to="/admin/profile"
            className="font-display text-xl font-semibold tracking-[-0.05em]"
          >
            Digital CV<span className="text-accent">.</span>
          </Link>
          <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
            {t("admin.contentOperations")}
          </p>
          <nav className="mt-14 space-y-1" aria-label="Admin navigation">
            {navigation.map((item, index) => (
              <NavLink
                key={item.path}
                to={`/admin/${item.path}`}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between border-l-2 border-transparent px-3 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink",
                    isActive && "border-accent bg-accent-soft/50 text-accent",
                  )
                }
              >
                <span>{t(`admin.${item.key}`)}</span>
                <span className="text-[0.58rem] text-line">0{index + 1}</span>
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto space-y-1 border-t border-line pt-5">
            <a
              href="/"
              className="flex items-center gap-2 px-3 py-2.5 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink"
            >
              {t("admin.openSite")} <ExternalLink size={13} strokeWidth={1.5} />
            </a>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left font-mono text-[0.64rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink"
            >
              {t("admin.signOut")} <LogOut size={13} strokeWidth={1.5} />
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="hidden border-b border-line bg-surface lg:block">
            <PageContainer>
              <div className="flex min-h-[72px] items-center justify-between gap-5">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                  {t(`admin.${active}`)} / {t("admin.workspace")}
                </p>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={logout}
                    className="inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink"
                  >
                    {t("admin.signOut")} <LogOut size={13} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </PageContainer>
          </div>
          <PageContainer className="py-8 md:py-12">
            <Outlet />
          </PageContainer>
        </main>
      </div>
    </div>
  );
}
