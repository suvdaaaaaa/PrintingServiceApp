/*
  Warnings:

  - Changed the type of `file_url` on the `Material` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Material" DROP COLUMN "file_url",
ADD COLUMN     "file_url" JSONB NOT NULL;
