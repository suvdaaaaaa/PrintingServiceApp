/*
  Warnings:

  - You are about to drop the `Template_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_template_type_fkey";

-- DropTable
DROP TABLE "Template_type";
