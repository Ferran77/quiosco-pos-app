import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL no está definida en este entorno (Vercel → Settings → Environment Variables).");
    }
    const categorias = await prisma.categoria.findMany({
      include: {
        productos: true,
      },
    });
    res.status(200).json(categorias);
  } catch (error) {
    console.error("Error en /api/categorias:", error);
    const message =
      error.code === "P1001"
        ? "No se puede conectar a la base de datos. Revisa DATABASE_URL en Vercel (usa la URL de Supabase con puerto 6543 o 5432 y, si la contraseña tiene símbolos, codifícala en la URL)."
        : error.message;
    res.status(500).json({
      error: "Error al obtener categorías",
      message,
      code: error.code,
    });
  }
}
