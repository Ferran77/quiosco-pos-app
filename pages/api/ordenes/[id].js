import prisma from "../lib/prisma";

export default async function handler(req, res) {
  try {
    if(req.method === 'POST') {
      const {id} = req.query

      const ordenActualizada = await prisma.orden.update({
        where: {
          id: parseInt(id)
        },
        data: {
          estado: true
        }
      });

      // Parsear el pedido de vuelta a JSON para la respuesta
      res.status(200).json({
        ...ordenActualizada,
        pedido: JSON.parse(ordenActualizada.pedido)
      });
    } else {
      res.status(405).json({ error: "Método no permitido" });
    }
  } catch (error) {
    console.error("Error en /api/ordenes/[id]:", error);
    res.status(500).json({
      error: "Error al actualizar la orden",
      message: error.message,
    });
  }
}