import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const productos = await prisma.producto.findMany({
      where: {
        categoriaId: 1,
      },
    });
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error en /api/productos:", error);
    res.status(500).json({
      error: "Error al obtener productos",
      message: error.message,
    });
  }
}