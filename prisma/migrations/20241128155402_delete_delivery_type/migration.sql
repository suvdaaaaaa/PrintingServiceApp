-- DropIndex
DROP INDEX "Templates_template_name_key";

-- AlterTable
ALTER TABLE "Templates" ALTER COLUMN "design_object" SET DATA TYPE TEXT;
