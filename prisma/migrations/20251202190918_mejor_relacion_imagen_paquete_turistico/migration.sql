/*
  Warnings:

  - You are about to drop the column `imagen_url` on the `paquete_turistico` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paquete_id]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "paquete_id" INTEGER;

-- AlterTable
ALTER TABLE "paquete_turistico" DROP COLUMN "imagen_url";

-- CreateIndex
CREATE UNIQUE INDEX "Image_paquete_id_key" ON "Image"("paquete_id");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "paquete_turistico"("id") ON DELETE SET NULL ON UPDATE CASCADE;
