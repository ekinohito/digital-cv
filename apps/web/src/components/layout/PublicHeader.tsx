import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { changeLocale } from "../../app/i18n-config.ts";
import { cn } from "../../lib/cn.ts";
import { PageContainer } from "./PageContainer.tsx";

const links = [
  { key: "work", href: "/#work" },
  { key: "experience", href: "/#experience" },
  { key: "skills", href: "/#skills" },
  { key: "architecture", href: "/architecture" },
] as const;

export function PublicHeader() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = i18n.language === "ru" ? "ru" : "en";

  const navigation = (
    <nav
      aria-label={t("nav.label")}
      className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6"
    >
      {links.map((link) => {
        const isArchitecture = link.href === "/architecture";
        return isArchitecture ? (
          <NavLink
            key={link.key}
            to={link.href}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              cn(
                "font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink",
                isActive && "text-accent",
              )
            }
          >
            {t(`nav.${link.key}`)}
          </NavLink>
        ) : (
          <a
            key={link.key}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink"
          >
            {t(`nav.${link.key}`)}
          </a>
        );
      })}
    </nav>
  );

  return (
    <header className="relative z-20 border-b border-line bg-canvas/95 backdrop-blur-sm">
      <PageContainer>
        <div className="flex min-h-[72px] items-center justify-between gap-5">
          <Link to="/" className="font-display text-lg font-semibold tracking-[-0.04em] text-ink">
            Digital CV<span className="text-accent">.</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navigation}
            <div className="flex items-center gap-1 border-l border-line pl-6 font-mono text-[0.68rem] uppercase tracking-[0.1em]">
              {(["en", "ru"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => void changeLocale(item)}
                  className={cn(
                    "px-1.5 py-1 text-muted transition-colors hover:text-ink",
                    locale === item && "text-accent",
                  )}
                  aria-label={t("locale.switchTo", { locale: item.toUpperCase() })}
                  aria-pressed={locale === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-ink md:hidden"
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-line py-5 md:hidden">
            {navigation}
            <div className="mt-5 flex items-center gap-3 border-t border-line pt-5 font-mono text-[0.68rem] uppercase tracking-[0.1em]">
              <span className="text-muted">{t("locale.label")}</span>
              {(["en", "ru"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => void changeLocale(item)}
                  className={cn("px-1.5 py-1 text-muted", locale === item && "text-accent")}
                  aria-pressed={locale === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </PageContainer>
    </header>
  );
}
