import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { useQuery } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { getFragmentData } from "../gql";
import { PageContainer } from "../components/layout/PageContainer.tsx";
import { EmptyState } from "../components/ui/EmptyState.tsx";
import { ErrorState } from "../components/ui/ErrorState.tsx";
import { LoadingBlock, SectionLoading } from "../components/ui/LoadingBlock.tsx";
import { localized, type Locale } from "../lib/locale.ts";
import { ProjectRow } from "../features/portfolio/ProjectRow.tsx";
import { PortfolioPageQuery, ProjectRowFragment } from "../features/portfolio/portfolio.graphql.ts";
import { SystemTopology } from "../features/health/SystemTopology.tsx";

function formatPeriod(
  startDate: string,
  endDate: string | null,
  locale: Locale,
  present: string,
): string {
  const formatter = new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    month: "short",
    year: "numeric",
  });
  return `${formatter.format(new Date(startDate))} — ${endDate ? formatter.format(new Date(endDate)) : present}`;
}

export function PortfolioPage() {
  const { t, i18n } = useTranslation();
  const locale: Locale = i18n.language === "ru" ? "ru" : "en";
  const { data, loading, error, refetch } = useQuery(PortfolioPageQuery);

  if (loading && !data) {
    return (
      <PageContainer>
        <div className="grid min-h-[70vh] items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div className="space-y-5">
            <LoadingBlock className="h-4 w-48" />
            <LoadingBlock className="h-24 w-full max-w-3xl" />
            <LoadingBlock className="h-5 w-4/5" />
          </div>
          <LoadingBlock className="h-64 w-full" />
        </div>
        <SectionLoading />
      </PageContainer>
    );
  }

  if (error && !data) {
    return (
      <PageContainer>
        <div className="py-24">
          <ErrorState
            title={t("public.errorTitle")}
            description={t("public.errorDescription")}
            retry={() => void refetch()}
          />
        </div>
      </PageContainer>
    );
  }

  const profile = data?.profile;

  return (
    <>
      <PageContainer>
        <section
          className="grid gap-12 border-b border-line py-14 md:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-16 lg:py-20"
          aria-labelledby="hero-title"
        >
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">
                {t("public.heroEyebrow")}
              </p>
              {profile ? (
                <>
                  {profile.avatar ? (
                    <img
                      src={profile.avatar.url}
                      alt={profile.fullName}
                      className="mt-8 size-32 border border-line object-cover"
                    />
                  ) : null}
                  <h1
                    id="hero-title"
                    className="mt-6 max-w-4xl font-display text-[clamp(3.2rem,7.4vw,7.2rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-ink"
                  >
                    {profile.fullName}
                  </h1>
                  <p className="mt-7 max-w-2xl font-display text-[clamp(1.35rem,2.4vw,2.2rem)] leading-[1.14] tracking-[-0.04em] text-ink">
                    {localized(locale, profile.headlineEn, profile.headlineRu)}
                  </p>
                  <p className="mt-5 max-w-136 text-base leading-7 text-muted">
                    {localized(locale, profile.summaryEn, profile.summaryRu)}
                  </p>
                </>
              ) : (
                <div className="mt-8">
                  <EmptyState title={t("public.profileMissing")} />
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="inline-flex min-h-11 items-center gap-3 border border-accent bg-accent px-4 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#1f46bf]"
              >
                {t("public.selectedWork")} <ArrowDown size={16} strokeWidth={1.5} />
              </a>
              {profile?.resume ? (
                <a
                  href={profile.resume.url}
                  download={profile.resume.originalName}
                  className="inline-flex min-h-11 items-center gap-2 border-b border-line font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted transition-colors hover:border-ink hover:text-ink"
                >
                  {t("public.resume")} <ArrowUpRight size={15} strokeWidth={1.5} />
                </a>
              ) : null}
            </div>
          </div>
          <div className="flex items-start pt-2 lg:pt-8">
            <SystemTopology />
          </div>
        </section>

        <section id="work" className="scroll-mt-24 py-16 md:py-24" aria-labelledby="work-title">
          <div className="mb-10 grid gap-4 md:grid-cols-[0.24fr_1fr] md:gap-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">
              01 / {t("public.selectedWork")}
            </p>
            <div>
              <h2
                id="work-title"
                className="font-display text-[clamp(2rem,4vw,3.8rem)] leading-none tracking-[-0.06em] text-ink"
              >
                {t("public.selectedWork")}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
                {t("public.selectedWorkIntro")}
              </p>
            </div>
          </div>
          {data?.projects.length ? (
            <div>
              {data.projects.map((project, index) => (
                <ProjectRow
                  key={getFragmentData(ProjectRowFragment, project).id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <EmptyState title={t("public.noProjects")} />
          )}
        </section>

        <section
          id="experience"
          className="scroll-mt-24 border-t border-line py-16 md:py-24"
          aria-labelledby="experience-title"
        >
          <div className="mb-10 grid gap-4 md:grid-cols-[0.24fr_1fr] md:gap-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">
              02 / {t("public.experience")}
            </p>
            <div>
              <h2
                id="experience-title"
                className="font-display text-[clamp(2rem,4vw,3.8rem)] leading-none tracking-[-0.06em] text-ink"
              >
                {t("public.experience")}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
                {t("public.experienceIntro")}
              </p>
            </div>
          </div>
          {data?.experiences.length ? (
            <div className="space-y-0">
              {data.experiences.map((experience) => (
                <article
                  key={experience.id}
                  className="grid gap-4 border-b border-line py-7 first:border-t md:grid-cols-[minmax(145px,0.34fr)_1fr] md:gap-8"
                >
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted">
                    {formatPeriod(
                      experience.startDate,
                      experience.endDate,
                      locale,
                      t("public.present"),
                    )}
                  </p>
                  <div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-2xl tracking-[-0.04em] text-ink">
                        {experience.company}
                      </h3>
                      <p className="text-sm text-accent">
                        {localized(locale, experience.roleEn, experience.roleRu)}
                      </p>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                      {localized(locale, experience.descriptionEn, experience.descriptionRu)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                      {experience.skills.map((skill) => (
                        <span
                          key={skill.id}
                          className="font-mono text-[0.64rem] uppercase tracking-[0.08em] text-muted"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title={t("public.noExperience")} />
          )}
        </section>

        <section
          id="skills"
          className="scroll-mt-24 border-t border-line py-16 md:py-24"
          aria-labelledby="skills-title"
        >
          <div className="mb-10 grid gap-4 md:grid-cols-[0.24fr_1fr] md:gap-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">
              03 / {t("public.capabilities")}
            </p>
            <div>
              <h2
                id="skills-title"
                className="font-display text-[clamp(2rem,4vw,3.8rem)] leading-none tracking-[-0.06em] text-ink"
              >
                {t("public.capabilities")}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
                {t("public.capabilitiesIntro")}
              </p>
            </div>
          </div>
          {data?.skills.length ? (
            <div className="grid gap-x-8 gap-y-10 border-t border-line pt-7 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(
                data.skills.reduce<Record<string, typeof data.skills>>((groups, skill) => {
                  const group = groups[skill.category] ?? [];
                  group.push(skill);
                  groups[skill.category] = group;
                  return groups;
                }, {}),
              ).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent">
                    {t(`public.${category.toLowerCase()}`, category)}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {skills.map((skill) => (
                      <li
                        key={skill.id}
                        className="font-display text-xl tracking-[-0.03em] text-ink"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title={t("public.noSkills")} />
          )}
        </section>

        <section className="border-t border-line py-16 md:py-24" aria-labelledby="contact-title">
          <div className="grid gap-8 md:grid-cols-[0.24fr_1fr] md:gap-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">
              04 / {t("public.about")}
            </p>
            <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
              <div>
                <h2
                  id="contact-title"
                  className="max-w-2xl font-display text-[clamp(2rem,4vw,3.8rem)] leading-[0.98] tracking-[-0.06em] text-ink"
                >
                  {t("public.about")}
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
                  {t("public.aboutIntro")}
                </p>
              </div>
              {profile ? (
                <div className="flex flex-col items-start gap-3 text-sm">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                  >
                    <Mail size={16} strokeWidth={1.5} />
                    {profile.email}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
          {data?.socialLinks.length ? (
            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5 pl-0 md:ml-[calc(36%+2rem)]">
              {data.socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </section>
      </PageContainer>
    </>
  );
}
