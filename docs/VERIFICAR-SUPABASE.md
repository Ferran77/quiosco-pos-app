# Cómo verificar Supabase

Si en Vercel ves "Menú undefined" o no cargan categorías, suele ser porque en Supabase **no existen las tablas** o **no hay datos** (categorías/productos).

## 1. Revisar en el panel de Supabase

1. Entra a [Supabase](https://supabase.com) → tu proyecto.
2. En el menú izquierdo abre **Table Editor**.
3. Deberías ver al menos estas tablas:
   - **Categoria** (con columnas: id, nombre, icono)
   - **Producto** (id, nombre, precio, imagen, categoriaId)
   - **Orden** (id, nombre, fecha, total, pedido, estado)

Si **no ves esas tablas**, hay que crear el esquema con Prisma (paso 2).

Si **las tablas existen pero están vacías** (sobre todo **Categoria**), hay que ejecutar el seed (paso 3).

---

## 2. Crear las tablas en Supabase

Desde tu máquina, con el `.env` apuntando a Supabase (`DATABASE_URL` = URL de tu proyecto Supabase).

**Recomendado** (crea las tablas sin usar migraciones antiguas de SQLite):

```bash
npx prisma db push
```

Eso crea o actualiza las tablas en Supabase según tu `schema.prisma` actual (PostgreSQL).

Luego genera el cliente por si acaso:

```bash
npx prisma generate
```

---

## 3. Poblar datos (categorías y productos)

Con el mismo `.env` (Supabase):

```bash
npx prisma db seed
```

Deberías ver: `✅ Base de datos poblada correctamente con datos fake`.

Luego en **Table Editor** → **Categoria** deberías ver 6 filas (Café, Hamburguesas, Pizzas, etc.) y en **Producto** muchas más.

---

## 4. Comprobar desde tu PC que Supabase tiene datos

En la raíz del proyecto:

```bash
npx ts-node prisma/verificar-datos.ts
```

(Necesitas tener `DATABASE_URL` en `.env` apuntando a Supabase.)

Si todo está bien, verás cuántas categorías y productos hay. Si hay 0 categorías, la app mostrará "Menú" sin nombre hasta que ejecutes el seed (paso 3).

---

## Resumen

| Síntoma              | Qué hacer                                      |
|----------------------|-------------------------------------------------|
| No existen las tablas| `npx prisma db push` y luego `npx prisma db seed` |
| Tablas vacías        | `npx prisma db seed`                           |
| Sigue "undefined"    | 1) Ejecutar `npx ts-node prisma/verificar-datos.ts` en tu PC (con .env a Supabase). 2) Si hay 0 categorías, hacer seed. 3) Comprobar que en Vercel la variable `DATABASE_URL` sea la misma URL de Supabase y volver a desplegar. |
