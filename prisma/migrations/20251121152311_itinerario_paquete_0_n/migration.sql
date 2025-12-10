-- DropForeignKey
ALTER TABLE "public"."itinerario" DROP CONSTRAINT "itinerario_paquete_id_fkey";

-- AlterTable
ALTER TABLE "itinerario" ALTER COLUMN "paquete_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "itinerario" ADD CONSTRAINT "itinerario_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "paquete_turistico"("id") ON DELETE SET NULL ON UPDATE CASCADE;
