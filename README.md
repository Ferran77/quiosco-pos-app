This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Importante:** En local el proyecto usa SQLite. En Vercel (serverless) **SQLite no funciona** porque no hay sistema de archivos persistente. Si solo ves la barra, el logo y el botón Admin tras el deploy, es porque la API de categorías falla al no poder usar la base de datos.

### Solución: usar una base de datos alojada en producción

#### Opción 1 – Supabase (PostgreSQL, plan gratis)

1. Crea una cuenta en [Supabase](https://supabase.com) y un nuevo proyecto.
2. En el proyecto: **Project Settings** → **Database**. Copia la **Connection string** en modo **URI**.
   - Para Vercel (serverless) usa la que incluye **connection pooling** (puerto **6543**, "Transaction" mode). Suele verse como `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`.
3. En tu proyecto en **Vercel** → **Settings** → **Environment Variables** añade `DATABASE_URL` con esa URL. Añade `?pgbouncer=true` al final si Supabase lo indica para el pooler.
4. En este repo, en `prisma/schema.prisma` cambia el datasource a PostgreSQL:
   - `provider = "postgresql"`
   - `url      = env("DATABASE_URL")`
5. Crea y aplica migraciones contra Supabase (desde tu máquina con `DATABASE_URL` apuntando a Supabase):
   ```bash
   npx prisma migrate dev --name supabase
   npx prisma db seed
   ```
6. Vuelve a desplegar en Vercel.

Para desarrollo local puedes usar la misma base de datos de Supabase en tu `.env` (misma `DATABASE_URL`) o seguir usando SQLite en local y tener dos archivos de schema si lo prefieres (más avanzado).

#### Opción 2 – Neon (PostgreSQL, plan gratis)

- Crea un proyecto en [Neon](https://neon.tech), copia la connection string y en Vercel define `DATABASE_URL`. En `prisma/schema.prisma` usa `provider = "postgresql"` y `url = env("DATABASE_URL")`. Luego migraciones y seed como arriba.

#### Otras opciones

PlanetScale (MySQL), Vercel Postgres, etc. En todos los casos: definir `DATABASE_URL` en Vercel y que el `provider` en `schema.prisma` coincida con la base elegida. Después, ejecutar migraciones y seed contra esa base y volver a desplegar.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
