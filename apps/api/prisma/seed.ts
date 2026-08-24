import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('Missing required environment variable: DATABASE_URL');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const PROFILE_ID = '00000000-0000-4000-8000-000000000001';

const SKILL_IDS = {
  typescript: '00000000-0000-4000-8000-000000000101',
  javascript: '00000000-0000-4000-8000-000000000102',
  nodejs: '00000000-0000-4000-8000-000000000103',
  nestjs: '00000000-0000-4000-8000-000000000104',
  graphql: '00000000-0000-4000-8000-000000000105',
  react: '00000000-0000-4000-8000-000000000106',
  postgresql: '00000000-0000-4000-8000-000000000107',
  cockroachdb: '00000000-0000-4000-8000-000000000108',
  prisma: '00000000-0000-4000-8000-000000000109',
  docker: '00000000-0000-4000-8000-000000000110',
  jest: '00000000-0000-4000-8000-000000000111',
  git: '00000000-0000-4000-8000-000000000112',
} as const;

const EXPERIENCE_IDS = {
  exampleLabs: '00000000-0000-4000-8000-000000000201',
  startupCo: '00000000-0000-4000-8000-000000000202',
} as const;

const PROJECT_IDS = {
  digitalCv: '00000000-0000-4000-8000-000000000301',
  taskForge: '00000000-0000-4000-8000-000000000302',
  realtimeDashboard: '00000000-0000-4000-8000-000000000303',
} as const;

const SOCIAL_LINK_IDS = {
  github: '00000000-0000-4000-8000-000000000401',
  linkedin: '00000000-0000-4000-8000-000000000402',
  telegram: '00000000-0000-4000-8000-000000000403',
} as const;

const SKILLS = [
  {
    id: SKILL_IDS.typescript,
    slug: 'typescript',
    name: 'TypeScript',
    category: 'LANGUAGE',
    sortOrder: 10,
  },
  {
    id: SKILL_IDS.javascript,
    slug: 'javascript',
    name: 'JavaScript',
    category: 'LANGUAGE',
    sortOrder: 20,
  },
  {
    id: SKILL_IDS.nodejs,
    slug: 'nodejs',
    name: 'Node.js',
    category: 'BACKEND',
    sortOrder: 30,
  },
  {
    id: SKILL_IDS.nestjs,
    slug: 'nestjs',
    name: 'NestJS',
    category: 'BACKEND',
    sortOrder: 40,
  },
  {
    id: SKILL_IDS.graphql,
    slug: 'graphql',
    name: 'GraphQL',
    category: 'BACKEND',
    sortOrder: 50,
  },
  {
    id: SKILL_IDS.react,
    slug: 'react',
    name: 'React',
    category: 'FRONTEND',
    sortOrder: 60,
  },
  {
    id: SKILL_IDS.postgresql,
    slug: 'postgresql',
    name: 'PostgreSQL',
    category: 'DATABASE',
    sortOrder: 70,
  },
  {
    id: SKILL_IDS.cockroachdb,
    slug: 'cockroachdb',
    name: 'CockroachDB',
    category: 'DATABASE',
    sortOrder: 80,
  },
  {
    id: SKILL_IDS.prisma,
    slug: 'prisma',
    name: 'Prisma',
    category: 'DATABASE',
    sortOrder: 90,
  },
  {
    id: SKILL_IDS.docker,
    slug: 'docker',
    name: 'Docker',
    category: 'INFRASTRUCTURE',
    sortOrder: 100,
  },
  {
    id: SKILL_IDS.jest,
    slug: 'jest',
    name: 'Jest',
    category: 'TESTING',
    sortOrder: 110,
  },
  {
    id: SKILL_IDS.git,
    slug: 'git',
    name: 'Git',
    category: 'TOOLING',
    sortOrder: 120,
  },
] as const;

const EXPERIENCES = [
  {
    id: EXPERIENCE_IDS.exampleLabs,
    company: 'Example Labs',
    roleEn: 'Senior Backend Developer',
    roleRu: 'Старший backend-разработчик',
    descriptionEn:
      'Designed and built GraphQL APIs for products with large data volumes. Led the migration of REST services to a modular NestJS monolith backed by Prisma and PostgreSQL-compatible storage.',
    descriptionRu:
      'Проектировал и разрабатывал GraphQL API для продуктов с большими объёмами данных. Руководил переносом REST-сервисов на модульный монолит NestJS с Prisma и PostgreSQL-совместимым хранилищем.',
    startDate: new Date('2023-04-01T00:00:00.000Z'),
    endDate: null,
    sortOrder: 10,
    skillIds: [
      SKILL_IDS.typescript,
      SKILL_IDS.nodejs,
      SKILL_IDS.nestjs,
      SKILL_IDS.graphql,
      SKILL_IDS.prisma,
    ],
  },
  {
    id: EXPERIENCE_IDS.startupCo,
    company: 'Startup Co',
    roleEn: 'Full-stack Developer',
    roleRu: 'Full-stack разработчик',
    descriptionEn:
      'Built and operated a customer-facing SPA and API: React frontend, Node.js backend, relational data modeling, and Docker-based CI/CD pipelines.',
    descriptionRu:
      'Разрабатывал и поддерживал SPA и API для пользователей: frontend на React, backend на Node.js, реляционная модель данных и CI/CD на Docker.',
    startDate: new Date('2020-09-01T00:00:00.000Z'),
    endDate: new Date('2023-03-31T00:00:00.000Z'),
    sortOrder: 20,
    skillIds: [
      SKILL_IDS.typescript,
      SKILL_IDS.javascript,
      SKILL_IDS.react,
      SKILL_IDS.postgresql,
      SKILL_IDS.docker,
    ],
  },
] as const;

const PROJECTS = [
  {
    id: PROJECT_IDS.digitalCv,
    slug: 'digital-cv',
    titleEn: 'Digital developer card',
    titleRu: 'Цифровая визитка разработчика',
    summaryEn:
      'This portfolio is built with a NestJS, GraphQL and Prisma backend, a React frontend, CockroachDB and S3-compatible file storage. Everything runs together with Docker Compose.',
    summaryRu:
      'Это портфолио с backend на NestJS, GraphQL и Prisma, frontend на React, CockroachDB и S3-совместимым хранилищем файлов. Все сервисы запускаются через Docker Compose.',
    detailsEn:
      'Code-first GraphQL schema, single-token admin authentication, binary files delivered through REST, and a deterministic database seed.',
    detailsRu:
      'Code-first GraphQL-схема, авторизация в панели по единому токену, передача файлов через REST и детерминированное заполнение базы.',
    repoUrl: 'https://github.com/example/digital-cv',
    liveUrl: null,
    featured: true,
    sortOrder: 10,
    skillIds: [
      SKILL_IDS.typescript,
      SKILL_IDS.nestjs,
      SKILL_IDS.graphql,
      SKILL_IDS.prisma,
      SKILL_IDS.cockroachdb,
      SKILL_IDS.docker,
    ],
  },
  {
    id: PROJECT_IDS.taskForge,
    slug: 'task-forge',
    titleEn: 'Task Forge API',
    titleRu: 'Task Forge API',
    summaryEn:
      'Task management service with nested projects, deadlines and a GraphQL subscription feed for real-time board updates.',
    summaryRu:
      'Сервис управления задачами с вложенными проектами, дедлайнами и GraphQL-подписками для обновления доски в реальном времени.',
    detailsEn: null,
    detailsRu: null,
    repoUrl: 'https://github.com/example/task-forge',
    liveUrl: null,
    featured: true,
    sortOrder: 20,
    skillIds: [
      SKILL_IDS.typescript,
      SKILL_IDS.nestjs,
      SKILL_IDS.postgresql,
      SKILL_IDS.jest,
    ],
  },
  {
    id: PROJECT_IDS.realtimeDashboard,
    slug: 'realtime-dashboard',
    titleEn: 'Realtime metrics dashboard',
    titleRu: 'Дашборд метрик в реальном времени',
    summaryEn:
      'Operations dashboard for live service metrics with WebSockets, virtualized charts and alerting rules.',
    summaryRu:
      'Операционный дашборд с метриками сервисов в реальном времени, WebSockets, виртуализацией графиков и правилами оповещений.',
    detailsEn: null,
    detailsRu: null,
    repoUrl: 'https://github.com/example/realtime-dashboard',
    liveUrl: null,
    featured: false,
    sortOrder: 30,
    skillIds: [SKILL_IDS.react, SKILL_IDS.typescript, SKILL_IDS.nodejs],
  },
] as const;

const SOCIAL_LINKS = [
  {
    id: SOCIAL_LINK_IDS.github,
    platform: 'github',
    label: 'GitHub',
    url: 'https://github.com/example',
    sortOrder: 10,
  },
  {
    id: SOCIAL_LINK_IDS.linkedin,
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/example',
    sortOrder: 20,
  },
  {
    id: SOCIAL_LINK_IDS.telegram,
    platform: 'telegram',
    label: 'Telegram',
    url: 'https://t.me/example',
    sortOrder: 30,
  },
] as const;

async function seedSkills(): Promise<void> {
  for (const skill of SKILLS) {
    await prisma.skill.upsert({
      where: { id: skill.id },
      create: skill,
      update: {
        slug: skill.slug,
        name: skill.name,
        category: skill.category,
        sortOrder: skill.sortOrder,
      },
    });
  }
}

async function seedExperiences(): Promise<void> {
  for (const experience of EXPERIENCES) {
    const { skillIds, ...data } = experience;
    await prisma.experience.upsert({
      where: { id: experience.id },
      create: {
        ...data,
        skills: { connect: skillIds.map((id) => ({ id })) },
      },
      update: {
        ...data,
        skills: { set: skillIds.map((id) => ({ id })) },
      },
    });
  }
}

async function seedProjects(): Promise<void> {
  for (const project of PROJECTS) {
    const { skillIds, ...data } = project;
    await prisma.project.upsert({
      where: { id: project.id },
      create: {
        ...data,
        skills: { connect: skillIds.map((id) => ({ id })) },
      },
      update: {
        ...data,
        skills: { set: skillIds.map((id) => ({ id })) },
      },
    });
  }
}

async function seedSocialLinks(): Promise<void> {
  for (const socialLink of SOCIAL_LINKS) {
    await prisma.socialLink.upsert({
      where: { id: socialLink.id },
      create: socialLink,
      update: {
        platform: socialLink.platform,
        label: socialLink.label,
        url: socialLink.url,
        sortOrder: socialLink.sortOrder,
      },
    });
  }
}

async function seedProfile(): Promise<void> {
  const data = {
    fullName: 'Alexey Petrov',
    headlineEn: 'Backend developer working with TypeScript, NestJS and GraphQL',
    headlineRu: 'Backend-разработчик: TypeScript, NestJS, GraphQL',
    summaryEn:
      'I build reliable backend services with TypeScript and Node.js, including GraphQL APIs, relational data models and infrastructure that is easy to operate. This card is a small full-stack application that reflects how I work.',
    summaryRu:
      'Разрабатываю надёжные backend-сервисы на TypeScript и Node.js: GraphQL API, реляционные модели данных и удобную в эксплуатации инфраструктуру. Эта визитка — небольшое full-stack приложение, которое отражает мой подход к работе.',
    email: 'alexey.petrov@example.com',
    githubUrl: 'https://github.com/example',
  };

  const existing = await prisma.profile.findFirst({ select: { id: true } });

  if (existing) {
    await prisma.profile.update({ where: { id: existing.id }, data });
  } else {
    await prisma.profile.create({ data: { id: PROFILE_ID, ...data } });
  }
}

async function seedIfEmpty(): Promise<void> {
  const [
    profileCount,
    experienceCount,
    projectCount,
    skillCount,
    socialLinkCount,
    assetCount,
  ] = await Promise.all([
    prisma.profile.count(),
    prisma.experience.count(),
    prisma.project.count(),
    prisma.skill.count(),
    prisma.socialLink.count(),
    prisma.asset.count(),
  ]);

  const hasExistingData =
    profileCount > 0 ||
    experienceCount > 0 ||
    projectCount > 0 ||
    skillCount > 0 ||
    socialLinkCount > 0 ||
    assetCount > 0;

  if (hasExistingData) {
    console.log('Database is not empty; skipping initial seed.');
    return;
  }

  await seedSkills();
  await seedExperiences();
  await seedProjects();
  await seedSocialLinks();
  await seedProfile();
}

async function main(): Promise<void> {
  await seedIfEmpty();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
