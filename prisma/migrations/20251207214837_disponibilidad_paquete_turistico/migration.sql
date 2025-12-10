/*
  Warnings:

  - You are about to drop the `Disponibilidad` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Disponibilidad" DROP CONSTRAINT "Disponibilidad_servicioId_fkey";

-- DropTable
DROP TABLE "Disponibilidad";

-- CreateTable
CREATE TABLE "disponibilidad_paquete" (
    "paquete_id" INTEGER NOT NULL,
    "disponibilidad_id" INTEGER NOT NULL,

    CONSTRAINT "disponibilidad_paquete_pkey" PRIMARY KEY ("paquete_id","disponibilidad_id")
);

-- CreateTable
CREATE TABLE "disponibilidad" (
    "id" SERIAL NOT NULL,
    "estado" "EstadoDisponibilidad" NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "servicioId" INTEGER NOT NULL,
    "cupo" INTEGER NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "disponibilidad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "disponibilidad_paquete" ADD CONSTRAINT "disponibilidad_paquete_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "paquete_turistico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disponibilidad_paquete" ADD CONSTRAINT "disponibilidad_paquete_disponibilidad_id_fkey" FOREIGN KEY ("disponibilidad_id") REFERENCES "disponibilidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disponibilidad" ADD CONSTRAINT "disponibilidad_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
