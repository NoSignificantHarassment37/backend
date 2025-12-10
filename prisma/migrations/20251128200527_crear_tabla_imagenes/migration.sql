-- AlterTable
ALTER TABLE "servicio" ADD COLUMN     "proveedor_id" INTEGER;

-- CreateTable
CREATE TABLE "proveedor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "proveedor_nombre_key" ON "proveedor"("nombre");

-- AddForeignKey
ALTER TABLE "servicio" ADD CONSTRAINT "servicio_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
