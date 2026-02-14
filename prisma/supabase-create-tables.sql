-- Ejecutar este SQL en Supabase si "npx prisma db push" no crea las tablas.
-- En Supabase: SQL Editor → New query → pegar y ejecutar (Run).

-- Tabla Categoria (primero, porque Producto tiene FK a Categoria)
CREATE TABLE IF NOT EXISTS "Categoria" (
  "id"    SERIAL PRIMARY KEY,
  "nombre" TEXT NOT NULL,
  "icono"  TEXT NOT NULL
);

-- Tabla Producto
CREATE TABLE IF NOT EXISTS "Producto" (
  "id"          SERIAL PRIMARY KEY,
  "nombre"      TEXT NOT NULL,
  "precio"      DOUBLE PRECISION NOT NULL,
  "imagen"      TEXT NOT NULL,
  "categoriaId" INTEGER NOT NULL,
  CONSTRAINT "Producto_categoriaId_fkey"
    FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Tabla Orden
CREATE TABLE IF NOT EXISTS "Orden" (
  "id"     SERIAL PRIMARY KEY,
  "nombre" TEXT NOT NULL,
  "fecha"  TEXT NOT NULL,
  "total"  DOUBLE PRECISION NOT NULL,
  "pedido" TEXT NOT NULL,
  "estado" BOOLEAN NOT NULL DEFAULT false
);

-- Índice para mejorar consultas por categoriaId
CREATE INDEX IF NOT EXISTS "Producto_categoriaId_idx" ON "Producto"("categoriaId");
