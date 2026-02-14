/**
 * Cliente Prisma singleton para Vercel/serverless.
 * Ubicado en pages/api/lib para importar con rutas relativas desde todas las API routes.
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = typeof globalThis !== "undefined" ? globalThis : global;

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
