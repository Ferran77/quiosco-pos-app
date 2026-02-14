import { categorias } from "./data/categorias";
import { productos } from "./data/productos";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () : Promise<void> => {
  try {
    // Limpiar datos existentes (opcional); si las tablas no existen, no hacer nada
    try {
      await prisma.producto.deleteMany();
      await prisma.categoria.deleteMany();
    } catch (e: unknown) {
      const err = e as { code?: string };
      if (err?.code === "P2021") {
        console.error("❌ Las tablas no existen. Crea las tablas primero:");
        console.error("   1. En Supabase → SQL Editor → New query");
        console.error("   2. Copia el contenido de prisma/supabase-create-tables.sql y ejecútalo (Run)");
        console.error("   O ejecuta: npx prisma db push");
        process.exit(1);
      }
      throw e;
    }

    // Crear categorías usando transacción
    for (const categoria of categorias) {
      await prisma.categoria.create({
        data: categoria
      });
    }

    // Crear productos usando transacción
    for (const producto of productos) {
      await prisma.producto.create({
        data: producto
      });
    }

    console.log("✅ Base de datos poblada correctamente con datos fake");
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
