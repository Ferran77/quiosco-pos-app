import { PrismaClient } from "@prisma/client";


//Insertar pedido a la BD mediante PrismaClient

export default async function handler(req, res) {
const prisma = new PrismaClient();

//Obteniendo órdenes en DB
  const ordenes = await prisma.orden.findMany({
    where: {
      estado: false
    }
  })
  res.status(200).json(ordenes);

//Creando órdenes en DB
  if (req.method === "POST") {
    const orden = await prisma.orden.create({
      data: {
        nombre: req.body.nombre,
        total: req.body.total,
        pedido: req.body.pedido,
        fecha: req.body.fecha
      },
    });

    res.status(200).json(orden);
  }
}