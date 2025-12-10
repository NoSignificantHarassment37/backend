-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('activo', 'inactivo');

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol_id" INTEGER,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'activo',
    "descripcion" TEXT NOT NULL,
    "usuario_creador_id" INTEGER,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permiso" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "Estado" NOT NULL DEFAULT 'activo',
    "descripcion" TEXT NOT NULL,
    "usuario_creador_id" INTEGER,

    CONSTRAINT "permiso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paquete_turistico" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio_total" DECIMAL(10,2) NOT NULL,
    "duracion_dias" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "Estado" NOT NULL,

    CONSTRAINT "paquete_turistico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "dia" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "paquete_id" INTEGER NOT NULL,

    CONSTRAINT "itinerario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actividad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "hora_inicio" TIMESTAMP(3),
    "hora_fin" TIMESTAMP(3),
    "itinerario_id" INTEGER NOT NULL,

    CONSTRAINT "actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(10,2) NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "servicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paquete_servicio" (
    "paquete_id" INTEGER NOT NULL,
    "servicio_id" INTEGER NOT NULL,

    CONSTRAINT "paquete_servicio_pkey" PRIMARY KEY ("paquete_id","servicio_id")
);

-- CreateTable
CREATE TABLE "reserva" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "paquete_id" INTEGER NOT NULL,
    "fecha_reserva" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "numero_personas" INTEGER NOT NULL DEFAULT 1,
    "precio_total" DOUBLE PRECISION NOT NULL,
    "metodo_pago" TEXT,
    "comentarios" TEXT,

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_permisos_roles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_permisos_roles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rol_nombre_key" ON "rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "permiso_nombre_key" ON "permiso"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "paquete_turistico_nombre_key" ON "paquete_turistico"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "actividad_nombre_key" ON "actividad"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "servicio_nombre_key" ON "servicio"("nombre");

-- CreateIndex
CREATE INDEX "_permisos_roles_B_index" ON "_permisos_roles"("B");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "rol"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol" ADD CONSTRAINT "rol_usuario_creador_id_fkey" FOREIGN KEY ("usuario_creador_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permiso" ADD CONSTRAINT "permiso_usuario_creador_id_fkey" FOREIGN KEY ("usuario_creador_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerario" ADD CONSTRAINT "itinerario_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "paquete_turistico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actividad" ADD CONSTRAINT "actividad_itinerario_id_fkey" FOREIGN KEY ("itinerario_id") REFERENCES "itinerario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paquete_servicio" ADD CONSTRAINT "paquete_servicio_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "paquete_turistico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paquete_servicio" ADD CONSTRAINT "paquete_servicio_servicio_id_fkey" FOREIGN KEY ("servicio_id") REFERENCES "servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "paquete_turistico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_permisos_roles" ADD CONSTRAINT "_permisos_roles_A_fkey" FOREIGN KEY ("A") REFERENCES "permiso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_permisos_roles" ADD CONSTRAINT "_permisos_roles_B_fkey" FOREIGN KEY ("B") REFERENCES "rol"("id") ON DELETE CASCADE ON UPDATE CASCADE;
