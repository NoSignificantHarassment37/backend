/*
  Warnings:

  - You are about to drop the column `comentarios` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_fin` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_inicio` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the column `metodo_pago` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the column `precio_total` on the `reserva` table. All the data in the column will be lost.
  - Added the required column `cantidad_personas` to the `paquete_turistico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paquete_turistico" ADD COLUMN     "cantidad_personas" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "reserva" DROP COLUMN "comentarios",
DROP COLUMN "fecha_fin",
DROP COLUMN "fecha_inicio",
DROP COLUMN "metodo_pago",
DROP COLUMN "precio_total";
