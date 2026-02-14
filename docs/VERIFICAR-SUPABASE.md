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

**Importante:** Para `db push` y `db seed` usa en `.env` la **conexión directa** (puerto **5432**), no la del pooler (6543). En Supabase: **Project Settings → Database → Connection string → URI** (la que dice "Direct connection" o usa el puerto 5432).

**Opción A – Con Prisma (recomendado):**

```bash
npx prisma db push
npx prisma generate
```

Si ves un error de conexión, revisa que la URL no tenga `?pgbouncer=true` y que el puerto sea 5432 para estas órdenes.

**Opción B – A mano en Supabase (si db push no crea tablas):**

1. En Supabase abre **SQL Editor** → **New query**.
2. Copia todo el contenido del archivo `prisma/supabase-create-tables.sql` del proyecto.
3. Pégalo en el editor y pulsa **Run**.
4. Verifica en **Table Editor** que existan las tablas **Categoria**, **Producto** y **Orden**.

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

---

## 5. Quitar el warning "RLS is disabled"

Si en Table Editor ves que las tablas tienen **"This table can be accessed by anyone via the Data API as RLS is disabled"**:

1. En Supabase abre **SQL Editor** → **New query**.
2. Copia y ejecuta el contenido de **`prisma/supabase-enable-rls.sql`** (Run).

Con eso se activa **Row Level Security** en las tablas. La Data API (anon) dejará de poder acceder; tu app sigue funcionando porque usa la conexión directa con `DATABASE_URL` (Prisma), no la Data API.
