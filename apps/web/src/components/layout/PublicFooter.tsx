import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageContainer } from "./PageContainer.tsx";

export function PublicFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-line bg-surface">
      <PageContainer>
        <div className="flex flex-col gap-5 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.68rem] uppercase tracking-widest text-ink">
            Digital CV / 2026
          </p>
          <div className="flex items-center gap-5 text-ink">
            <Link className="transition-colors hover:text-ink" to="/architecture">
              {t("nav.architecture")}
            </Link>
            <a
              className="inline-flex items-center gap-1 transition-colors hover:text-ink"
              href="/admin"
            >
              {t("footer.admin")} <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
