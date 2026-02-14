/**
 * Script para verificar que Supabase tiene tablas y datos.
 * Ejecutar con: npx ts-node prisma/verificar-datos.ts
 * (Asegúrate de tener DATABASE_URL en .env apuntando a Supabase)
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const numCategorias = await prisma.categoria.count();
    const numProductos = await prisma.producto.count();
    const numOrdenes = await prisma.orden.count();

    console.log("\n--- Estado de la base de datos ---");
    console.log("Categorías:", numCategorias);
    console.log("Productos:", numProductos);
    console.log("Órdenes:", numOrdenes);
    console.log("-----------------------------------\n");

    if (numCategorias === 0) {
      console.log("⚠️  No hay categorías. Ejecuta: npx prisma db seed");
      process.exit(1);
    }

    const categorias = await prisma.categoria.findMany({
      select: { id: true, nombre: true, icono: true },
    });
    console.log("Categorías encontradas:", categorias.map((c) => c.nombre).join(", "));
    console.log("\n✅ La base de datos tiene datos. Si la app sigue en undefined, revisa que Vercel use la misma DATABASE_URL.\n");
  } catch (error) {
    console.error("❌ Error al conectar o leer la base de datos:", error);
    console.log("\nRevisa que DATABASE_URL en .env sea la URL de Supabase (Connection string, modo URI).");
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
