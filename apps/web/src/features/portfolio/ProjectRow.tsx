import { ArrowUpRight } from "lucide-react";
import { getFragmentData, type FragmentType } from "../../gql";
import { useTranslation } from "react-i18next";
import { localized, type Locale } from "../../lib/locale.ts";
import { ProjectRowFragment } from "./portfolio.graphql.ts";

type ProjectRowProps = {
  project: FragmentType<typeof ProjectRowFragment>;
  index: number;
};

export function ProjectRow({ project, index }: ProjectRowProps) {
  const { i18n, t } = useTranslation();
  const locale: Locale = i18n.language === "ru" ? "ru" : "en";
  const data = getFragmentData(ProjectRowFragment, project);

  return (
    <article className="group grid gap-5 border-b border-line py-7 first:border-t md:grid-cols-[minmax(0,1fr)_minmax(180px,0.36fr)_auto] md:items-start md:gap-8">
      <div className="min-w-0">
        <div className="flex items-start gap-4">
          <span className="font-mono text-[0.68rem] tracking-[0.12em] text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-display text-[clamp(1.35rem,2.4vw,2.15rem)] leading-[1.05] tracking-[-0.04em] text-ink">
              {localized(locale, data.titleEn, data.titleRu)}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              {localized(locale, data.summaryEn, data.summaryRu)}
            </p>
            {data.image ? (
              <img
                src={data.image.url}
                alt=""
                className="mt-5 h-24 w-full max-w-sm object-cover grayscale transition-[filter] duration-200 group-hover:grayscale-0"
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap content-start gap-x-3 gap-y-1 pl-9 md:pl-0">
        {data.skills.map((skill) => (
          <span
            key={skill.id}
            className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted"
          >
            {skill.name}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 pl-9 md:pl-0">
        {data.repoUrl ? (
          <a
            href={data.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            {t("public.viewRepository")}
          </a>
        ) : null}
        {data.liveUrl ? (
          <a
            href={data.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            {t("public.viewLive")}
          </a>
        ) : null}
        <ArrowUpRight
          className="ml-auto text-accent transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
          size={21}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
