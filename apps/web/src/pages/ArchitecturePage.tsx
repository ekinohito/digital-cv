import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Braces,
  Database,
  HardDrive,
  Layers3,
  type LucideIcon,
  Server,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageContainer } from "../components/layout/PageContainer.tsx";

type ArchitectureNodeProps = {
  icon: LucideIcon;
  title: string;
  detail: string;
  className?: string;
};

function ArchitectureNode({ icon: Icon, title, detail, className }: ArchitectureNodeProps) {
  return (
    <div className={`border border-line bg-surface p-5 ${className ?? ""}`}>
      <Icon size={20} strokeWidth={1.4} className="text-accent" aria-hidden="true" />
      <h3 className="mt-8 font-display text-xl tracking-[-0.04em] text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{detail}</p>
    </div>
  );
}

export function ArchitecturePage() {
  const { t } = useTranslation();

  const steps = [
    t("architecture.contractStep1"),
    t("architecture.contractStep2"),
    t("architecture.contractStep3"),
    t("architecture.contractStep4"),
    t("architecture.contractStep5"),
  ];

  return (
    <PageContainer>
      <section
        className="grid gap-12 border-b border-line py-16 md:py-24 lg:grid-cols-[1fr_0.55fr] lg:gap-20 lg:py-28"
        aria-labelledby="architecture-title"
      >
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-widest text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={15} strokeWidth={1.5} /> {t("architecture.backToPortfolio")}
          </Link>
          <p className="mt-16 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">
            {t("architecture.eyebrow")}
          </p>
          <h1
            id="architecture-title"
            className="mt-6 max-w-4xl font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-ink"
          >
            {t("architecture.title")}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-7 text-muted">{t("architecture.intro")}</p>
        </div>
        <div className="flex items-end">
          <div className="w-full border-l border-line pl-6 md:pl-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">
              {t("architecture.flowLabel")} / 001
            </p>
            <div className="mt-7 space-y-4 font-mono text-sm text-muted">
              <span className="block">{t("architecture.flowBrowser")}</span>
              <ArrowDown size={16} strokeWidth={1.5} />
              <span className="block">{t("architecture.flowGraphql")}</span>
              <ArrowDown size={16} strokeWidth={1.5} />
              <span className="block">{t("architecture.flowPersistent")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-16 md:py-24" aria-labelledby="topology-title">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">
              {t("architecture.runtimeEyebrow")}
            </p>
            <h2
              id="topology-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.8rem)] leading-none tracking-[-0.06em] text-ink"
            >
              {t("architecture.runtimeTitle")}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted">{t("architecture.runtimeIntro")}</p>
        </div>
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          <ArchitectureNode
            icon={Layers3}
            title={t("architecture.browser")}
            detail={t("architecture.browserDetail")}
          />
          <ArchitectureNode
            icon={Braces}
            title={t("architecture.apollo")}
            detail={t("architecture.apolloDetail")}
          />
          <ArchitectureNode
            icon={Workflow}
            title={t("architecture.graphql")}
            detail={t("architecture.graphqlDetail")}
          />
          <ArchitectureNode
            icon={Server}
            title={t("architecture.nest")}
            detail={t("architecture.nestDetail")}
            className="md:col-span-2"
          />
          <ArchitectureNode
            icon={Database}
            title={t("architecture.prisma")}
            detail={t("architecture.prismaDetail")}
          />
          <ArchitectureNode
            icon={HardDrive}
            title={t("architecture.storage")}
            detail={t("architecture.storageDetail")}
          />
          <ArchitectureNode
            icon={Database}
            title={t("architecture.cockroach")}
            detail={t("architecture.relationalData")}
          />
          <ArchitectureNode
            icon={HardDrive}
            title={t("architecture.minio")}
            detail={t("architecture.objectStorage")}
          />
        </div>
      </section>

      <section className="border-b border-line py-16 md:py-24" aria-labelledby="contract-title">
        <div className="grid gap-10 md:grid-cols-[0.42fr_1fr] md:gap-8">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">
              02 / contract
            </p>
            <h2
              id="contract-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.8rem)] leading-none tracking-[-0.06em] text-ink"
            >
              {t("architecture.contractTitle")}
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              {t("architecture.contractIntro")}
            </p>
          </div>
          <div className="self-end">
            <div className="flex flex-col border-y border-line sm:flex-row sm:items-stretch">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex flex-1 items-center gap-3 border-b border-line py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0"
                >
                  <span className="font-mono text-[0.64rem] text-accent">0{index + 1}</span>
                  <span className="font-display text-base leading-tight tracking-[-0.02em] text-ink">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between gap-7 py-12 sm:flex-row sm:items-center">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
          {t("architecture.architectureFlow")}
        </p>
        <a
          href="/graphql"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-widest text-accent transition-colors hover:text-ink"
        >
          {t("architecture.exploreApi")} <ArrowUpRight size={16} strokeWidth={1.5} />
        </a>
      </section>
    </PageContainer>
  );
}
