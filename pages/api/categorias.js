import prisma from "./lib/prisma";

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
    const isConnectionError =
      error.code === "P1001" ||
      (error.message && error.message.includes("Circuit breaker"));
    const message = isConnectionError
      ? "Error de conexión a la base de datos. En Vercel usa la URL directa de Supabase (puerto 5432) o, si usas pooler (6543), añade al final: ?pgbouncer=true&connection_limit=1"
      : error.message;
    res.status(500).json({
      error: "Error al obtener categorías",
      message,
      code: error.code,
    });
  }
}
