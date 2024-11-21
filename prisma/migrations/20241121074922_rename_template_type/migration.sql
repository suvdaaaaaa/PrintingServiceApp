/*
  Warnings:

  - You are about to drop the column `template_type` on the `Material` table. All the data in the column will be lost.
  - Added the required column `material_type` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Material" DROP COLUMN "template_type",
ADD COLUMN     "material_type" INTEGER NOT NULL;
