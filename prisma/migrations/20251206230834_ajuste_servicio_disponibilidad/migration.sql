/*
  Warnings:

  - A unique constraint covering the columns `[nombre,proveedor_id]` on the table `servicio` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "servicio_nombre_key";

-- CreateIndex
CREATE UNIQUE INDEX "servicio_nombre_proveedor_id_key" ON "servicio"("nombre", "proveedor_id");
