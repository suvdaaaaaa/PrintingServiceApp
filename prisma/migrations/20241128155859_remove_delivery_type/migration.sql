/*
  Warnings:

  - You are about to drop the `Delivery_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_delivery_type_fkey";

-- DropTable
DROP TABLE "Delivery_type";
