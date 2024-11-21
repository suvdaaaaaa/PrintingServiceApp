/*
  Warnings:

  - You are about to drop the column `unit_price` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the `Paper_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `total_price` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_paper_type_fkey";

-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "unit_price",
ADD COLUMN     "total_price" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Paper_type";
