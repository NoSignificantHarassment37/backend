/*
  Warnings:

  - Added the required column `detalles` to the `disponibilidad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "disponibilidad" ADD COLUMN     "detalles" TEXT NOT NULL;
