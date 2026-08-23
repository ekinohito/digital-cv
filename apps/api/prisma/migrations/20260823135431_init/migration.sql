-- CockroachDB >= 26 creates locked tables by default, which blocks the
-- ALTER TABLE ... ADD FOREIGN KEY statements below. Create these tables
-- without the schema lock instead.
SET create_table_with_schema_locked = false;

-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('LANGUAGE', 'BACKEND', 'FRONTEND', 'DATABASE', 'INFRASTRUCTURE', 'TESTING', 'TOOLING', 'OTHER');

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "fullName" STRING NOT NULL,
    "headlineEn" STRING NOT NULL,
    "headlineRu" STRING NOT NULL,
    "summaryEn" STRING NOT NULL,
    "summaryRu" STRING NOT NULL,
    "email" STRING NOT NULL,
    "githubUrl" STRING,
    "avatarAssetId" UUID,
    "resumeAssetId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "id" UUID NOT NULL,
    "company" STRING NOT NULL,
    "roleEn" STRING NOT NULL,
    "roleRu" STRING NOT NULL,
    "descriptionEn" STRING NOT NULL,
    "descriptionRu" STRING NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "sortOrder" INT4 NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" UUID NOT NULL,
    "slug" STRING NOT NULL,
    "titleEn" STRING NOT NULL,
    "titleRu" STRING NOT NULL,
    "summaryEn" STRING NOT NULL,
    "summaryRu" STRING NOT NULL,
    "detailsEn" STRING,
    "detailsRu" STRING,
    "repoUrl" STRING,
    "liveUrl" STRING,
    "featured" BOOL NOT NULL DEFAULT false,
    "sortOrder" INT4 NOT NULL DEFAULT 0,
    "imageAssetId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" UUID NOT NULL,
    "slug" STRING NOT NULL,
    "name" STRING NOT NULL,
    "category" "SkillCategory" NOT NULL,
    "sortOrder" INT4 NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_links" (
    "id" UUID NOT NULL,
    "platform" STRING NOT NULL,
    "label" STRING NOT NULL,
    "url" STRING NOT NULL,
    "sortOrder" INT4 NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" UUID NOT NULL,
    "bucket" STRING NOT NULL,
    "key" STRING NOT NULL,
    "originalName" STRING NOT NULL,
    "mimeType" STRING NOT NULL,
    "size" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExperienceToSkill" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToSkill" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_avatarAssetId_key" ON "profiles"("avatarAssetId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_resumeAssetId_key" ON "profiles"("resumeAssetId");

-- CreateIndex
CREATE INDEX "experiences_sortOrder_idx" ON "experiences"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_featured_sortOrder_idx" ON "projects"("featured", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "skills_slug_key" ON "skills"("slug");

-- CreateIndex
CREATE INDEX "skills_category_sortOrder_idx" ON "skills"("category", "sortOrder");

-- CreateIndex
CREATE INDEX "social_links_sortOrder_idx" ON "social_links"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "assets_key_key" ON "assets"("key");

-- CreateIndex
CREATE INDEX "assets_createdAt_idx" ON "assets"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "_ExperienceToSkill_AB_unique" ON "_ExperienceToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_ExperienceToSkill_B_index" ON "_ExperienceToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToSkill_AB_unique" ON "_ProjectToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToSkill_B_index" ON "_ProjectToSkill"("B");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_avatarAssetId_fkey" FOREIGN KEY ("avatarAssetId") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_resumeAssetId_fkey" FOREIGN KEY ("resumeAssetId") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_imageAssetId_fkey" FOREIGN KEY ("imageAssetId") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceToSkill" ADD CONSTRAINT "_ExperienceToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceToSkill" ADD CONSTRAINT "_ExperienceToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToSkill" ADD CONSTRAINT "_ProjectToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToSkill" ADD CONSTRAINT "_ProjectToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
