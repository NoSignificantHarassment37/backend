/*
  Warnings:

  - Changed the type of `tipo` on the `proveedor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tipo` on the `servicio` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoDeServicio" AS ENUM ('ALOJAMIENTO', 'TRANSPORTE', 'SEGURO', 'ALIMENTACION', 'ACTIVIDAD');

-- CreateEnum
CREATE TYPE "EstadoDisponibilidad" AS ENUM ('bloqueada', 'no_disponible', 'disponible');

-- AlterTable
ALTER TABLE "proveedor" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoDeServicio" NOT NULL;

-- AlterTable
ALTER TABLE "servicio" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoDeServicio" NOT NULL;

-- CreateTable
CREATE TABLE "Disponibilidad" (
    "id" SERIAL NOT NULL,
    "estado" "EstadoDisponibilidad" NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "servicioId" INTEGER NOT NULL,
    "cupo" INTEGER NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Disponibilidad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Disponibilidad" ADD CONSTRAINT "Disponibilidad_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
