/*
  Warnings:

  - Added the required column `estado` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `estado` VARCHAR(191) NOT NULL;
