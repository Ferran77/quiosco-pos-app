import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    //Creando órdenes en DB
    if (req.method === "POST") {
      const orden = await prisma.orden.create({
        data: {
          nombre: req.body.nombre,
          total: req.body.total,
          pedido: JSON.stringify(req.body.pedido), // Convertir a string para SQLite
          fecha: req.body.fecha
        },
      });

      // Parsear el pedido de vuelta a JSON para la respuesta
      res.status(200).json({
        ...orden,
        pedido: JSON.parse(orden.pedido)
      });
    } else {
      //Obteniendo órdenes en DB
      const ordenes = await prisma.orden.findMany({
        where: {
          estado: false
        }
      });
      
      // Parsear el pedido de cada orden de vuelta a JSON
      const ordenesConPedidoParseado = ordenes.map(orden => ({
        ...orden,
        pedido: JSON.parse(orden.pedido)
      }));
      
      res.status(200).json(ordenesConPedidoParseado);
    }
  } catch (error) {
    console.error("Error en /api/ordenes:", error);
    res.status(500).json({
      error: "Error al procesar órdenes",
      message: error.message,
    });
  }
}