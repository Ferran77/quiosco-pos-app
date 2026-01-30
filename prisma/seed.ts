import { categorias } from "./data/categorias";
import { productos } from "./data/productos";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () : Promise<void> => {
  try {
    // Limpiar datos existentes (opcional, para desarrollo)
    await prisma.producto.deleteMany();
    await prisma.categoria.deleteMany();

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
