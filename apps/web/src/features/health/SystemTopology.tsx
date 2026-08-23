import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getHealth, toHealthStatus, type HealthSnapshot, type HealthStatus } from "./health.ts";

type TopologyNodeProps = {
  label: string;
  technology: string;
  status: HealthStatus;
};

function TopologyNode({ label, technology, status }: TopologyNodeProps) {
  const { t } = useTranslation();

  return (
    <div
      className="topology-node relative ml-3 grid grid-cols-[minmax(85px,0.7fr)_1fr_auto] items-center gap-3 border-b border-line/80 py-3 last:border-b-0"
      data-status={status}
    >
      <span className="font-mono text-[0.66rem] uppercase tracking-[0.09em] text-muted">
        {label}
      </span>
      <span className="font-display text-base tracking-[-0.02em] text-ink">{technology}</span>
      <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" data-status={status} />
        {t(`public.${status}`)}
      </span>
    </div>
  );
}

export function SystemTopology() {
  const { t } = useTranslation();
  const [health, setHealth] = useState<HealthSnapshot | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    void getHealth()
      .then((snapshot) => {
        if (active) {
          setHealth(snapshot);
          setFailed(false);
        }
      })
      .catch(() => {
        if (active) {
          setFailed(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const apiStatus: HealthStatus = failed ? "offline" : toHealthStatus(health?.status);
  const databaseStatus: HealthStatus = failed ? "unknown" : toHealthStatus(health?.database);
  const storageStatus: HealthStatus = failed ? "unknown" : toHealthStatus(health?.storage);

  return (
    <aside className="border-l border-line pl-5 md:pl-7" aria-label={t("public.system")}>
      <div className="mb-5 flex items-end justify-between gap-5">
        <div>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent">
            SYS / 001
          </p>
          <h2 className="mt-2 font-display text-xl tracking-[-0.035em] text-ink">
            {t("public.system")}
          </h2>
        </div>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted">
          {t("public.systemDescription")}
        </span>
      </div>
      <div className="topology-rail border-y border-line bg-surface px-4">
        <TopologyNode label={t("public.api")} technology="NestJS / GraphQL" status={apiStatus} />
        <TopologyNode
          label={t("public.database")}
          technology="CockroachDB"
          status={databaseStatus}
        />
        <TopologyNode label={t("public.storage")} technology="S3 / MinIO" status={storageStatus} />
      </div>
    </aside>
  );
}
