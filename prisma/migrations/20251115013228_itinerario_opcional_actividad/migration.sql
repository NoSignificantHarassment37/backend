-- DropForeignKey
ALTER TABLE "public"."actividad" DROP CONSTRAINT "actividad_itinerario_id_fkey";

-- AlterTable
ALTER TABLE "actividad" ALTER COLUMN "itinerario_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "actividad" ADD CONSTRAINT "actividad_itinerario_id_fkey" FOREIGN KEY ("itinerario_id") REFERENCES "itinerario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
