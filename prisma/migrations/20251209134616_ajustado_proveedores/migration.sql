/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `proveedor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `proveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_de_telefono` to the `proveedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "proveedor" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "numero_de_telefono" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "proveedor_email_key" ON "proveedor"("email");
