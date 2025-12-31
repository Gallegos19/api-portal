/*
  Warnings:

  - You are about to drop the column `id_subproject` on the `social_facilitators` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_region]` on the table `coordinators` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_region]` on the table `social_facilitators` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_region` to the `coordinators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_region` to the `social_facilitators` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "social_facilitators" DROP CONSTRAINT "social_facilitators_id_subproject_fkey";

-- AlterTable
ALTER TABLE "archives" ADD COLUMN     "school_year_id" TEXT,
ADD COLUMN     "status_id" TEXT;

-- AlterTable
ALTER TABLE "coordinators" ADD COLUMN     "id_region" TEXT NOT NULL,
ADD COLUMN     "status_id" TEXT;

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "school_year_id" TEXT,
ADD COLUMN     "status_id" TEXT;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "school_year_id" TEXT,
ADD COLUMN     "status_id" TEXT;

-- AlterTable
ALTER TABLE "formats" ADD COLUMN     "school_year_id" TEXT,
ADD COLUMN     "status_id" TEXT;

-- AlterTable
ALTER TABLE "interns" ADD COLUMN     "school_year_id" TEXT,
ADD COLUMN     "status_id" TEXT;

-- AlterTable
ALTER TABLE "photos" ADD COLUMN     "school_year_id" TEXT,
ADD COLUMN     "status_id" TEXT;

-- AlterTable
ALTER TABLE "regions" ADD COLUMN     "status_id" TEXT;

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "school_year_id" TEXT,
ADD COLUMN     "status_id" TEXT;

-- AlterTable
ALTER TABLE "social_facilitators" DROP COLUMN "id_subproject",
ADD COLUMN     "id_region" TEXT NOT NULL,
ADD COLUMN     "status_id" TEXT;

-- AlterTable
ALTER TABLE "subprojects" ADD COLUMN     "id_social_facilitator" TEXT,
ADD COLUMN     "status_id" TEXT;

-- AlterTable
ALTER TABLE "success_stories" ADD COLUMN     "school_year_id" TEXT,
ADD COLUMN     "status_id" TEXT;

-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "school_year_id" TEXT,
ADD COLUMN     "status_id" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status_id" TEXT;

-- CreateTable
CREATE TABLE "statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_years" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "school_years_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "statuses_name_key" ON "statuses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "school_years_name_key" ON "school_years"("name");

-- CreateIndex
CREATE UNIQUE INDEX "coordinators_id_region_key" ON "coordinators"("id_region");

-- CreateIndex
CREATE UNIQUE INDEX "social_facilitators_id_region_key" ON "social_facilitators"("id_region");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archives" ADD CONSTRAINT "archives_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archives" ADD CONSTRAINT "archives_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formats" ADD CONSTRAINT "formats_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formats" ADD CONSTRAINT "formats_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interns" ADD CONSTRAINT "interns_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interns" ADD CONSTRAINT "interns_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "school_years"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_facilitators" ADD CONSTRAINT "social_facilitators_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_facilitators" ADD CONSTRAINT "social_facilitators_id_region_fkey" FOREIGN KEY ("id_region") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subprojects" ADD CONSTRAINT "subprojects_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subprojects" ADD CONSTRAINT "subprojects_id_social_facilitator_fkey" FOREIGN KEY ("id_social_facilitator") REFERENCES "social_facilitators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regions" ADD CONSTRAINT "regions_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinators" ADD CONSTRAINT "coordinators_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinators" ADD CONSTRAINT "coordinators_id_region_fkey" FOREIGN KEY ("id_region") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
