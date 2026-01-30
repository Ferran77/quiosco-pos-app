import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    const categorias = await prisma.categoria.findMany({
      include: {
        productos: true,
      },
    });
    
    res.status(200).json(categorias);
  } catch (error) {
    console.error("Error en /api/categorias:", error);
    res.status(500).json({ 
      error: "Error al obtener categorías",
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  } finally {
    await prisma.$disconnect();
  }
}
