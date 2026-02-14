-- Quita el warning "RLS is disabled" en Supabase.
-- Ejecutar en Supabase: SQL Editor → New query → pegar y Run.
--
-- Con RLS activado, la Data API (anon key) no puede acceder a las tablas.
-- Tu app sigue funcionando porque Prisma usa la conexión directa (DATABASE_URL),
-- no la Data API.

ALTER TABLE "Categoria" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Producto"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Orden"     ENABLE ROW LEVEL SECURITY;

-- Política: permitir todo solo para el rol que usa la conexión directa (tu app).
-- Sin políticas adicionales, la Data API (anon) no puede leer ni escribir.
-- El usuario de la connection string (postgres) sigue teniendo acceso completo.
