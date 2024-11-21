/*
  Warnings:

  - Added the required column `paper_type` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `side` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "description" TEXT,
ADD COLUMN     "paper_type" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "side" INTEGER NOT NULL,
ADD COLUMN     "total_price" DOUBLE PRECISION NOT NULL;
