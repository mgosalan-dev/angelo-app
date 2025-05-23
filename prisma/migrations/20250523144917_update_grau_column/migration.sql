/*
  Warnings:

  - You are about to drop the column `estado` on the `product` table. All the data in the column will be lost.
  - Added the required column `grau` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `estado`,
    ADD COLUMN `grau` VARCHAR(191) NOT NULL;
