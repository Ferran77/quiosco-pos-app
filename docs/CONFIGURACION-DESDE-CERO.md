# Configuración desde cero: Supabase + Vercel

Guía para conectar este proyecto con un **nuevo** proyecto en Supabase y un **nuevo** despliegue en Vercel.

---

## Orden recomendado

1. Crear proyecto en **Supabase** y obtener la URL de conexión.
2. Crear las **tablas** en Supabase (SQL).
3. Poblar **datos** (seed) desde tu PC.
4. Crear proyecto en **Vercel**, configurar **DATABASE_URL** y desplegar.

---

## 1. Supabase – Crear proyecto

1. Entra a [supabase.com](https://supabase.com) e inicia sesión.
2. **New project**.
3. Elige organización, **nombre del proyecto**, **contraseña de base de datos** (guárdala bien; la usarás en la URL).
4. Región: la que prefieras. **Create new project** y espera a que esté listo.

---

## 2. Supabase – Obtener la URL de conexión (Session Pooler)

**No uses "Direct connection"** si Supabase te avisa de "Not IPv4 compatible". En Vercel conviene usar el **Session Pooler** (IPv4).

1. En el proyecto: **Project Settings** (engranaje) → **Database**.
2. En **Connection string** elige el modo **URI**.
3. Selecciona **Session** (Session Pooler), no "Direct" ni "Transaction".
4. Copia la URI que aparece. Será algo como:
   ```text
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
   ```
5. Si la **contraseña** tiene caracteres especiales (`@`, `#`, `%`, `/`, etc.), codifícala para la URL (por ejemplo con [urlencoder.org](https://www.urlencoder.org/)) y sustituye `[YOUR-PASSWORD]` en la URI por esa versión codificada.

Guarda esta URL; la usarás en el `.env` local y en Vercel.

---

## 3. Supabase – Crear las tablas

1. En Supabase: **SQL Editor** → **New query**.
2. Abre en tu repo el archivo **`prisma/supabase-create-tables.sql`**.
3. Copia **todo** el contenido y pégalo en el editor de Supabase.
4. Pulsa **Run**.
5. Comprueba en **Table Editor** que existan las tablas **Categoria**, **Producto** y **Orden**.

---

## 4. Tu PC – Poblar datos (seed)

1. En la raíz del proyecto crea o edita el archivo **`.env`** con una sola línea (usa la misma URL de Session Pooler del paso 2):

   ```env
   DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
   ```

   Sustituye `[PASSWORD]` por tu contraseña (codificada si tiene símbolos). No añadas todavía `?pgbouncer=true` para el seed.

2. En la terminal, en la raíz del proyecto:

   ```bash
   npm install
   npx prisma generate
   npx prisma db seed
   ```

3. Deberías ver: `✅ Base de datos poblada correctamente con datos fake`.
4. En Supabase → **Table Editor** → **Categoria** deberías ver 6 filas (Café, Hamburguesas, etc.).

Si el seed falla por conexión, prueba en `.env` la misma URL pero añadiendo al final: `?connection_limit=1`, y vuelve a ejecutar el seed.

---

## 5. Vercel – Crear proyecto y variable de entorno

1. Entra a [vercel.com](https://vercel.com) y en **Add New** → **Project**.
2. Importa el repo de GitHub (por ejemplo `Ferran77/quiosco-pos-app`), rama **main**.
3. **Antes de desplegar**, en **Environment Variables** añade:
   - **Name:** `DATABASE_URL`
   - **Value:** la **misma** URL del Session Pooler del paso 2, pero **con esto al final**:
     ```text
     ?pgbouncer=true&connection_limit=1
     ```
     Ejemplo completo:
     ```text
     postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1
     ```
   - Entorno: marca **Production** (y Preview si quieres).
4. **Deploy** (o **Redeploy** si ya existía el proyecto).

---

## 6. Comprobar que todo funciona

1. Abre la URL del proyecto en Vercel (por ejemplo `https://tu-proyecto.vercel.app`).
2. Deberías ver el menú con categorías (Café, Hamburguesas, etc.) y productos.
3. Si ves un mensaje de error de conexión, revisa que:
   - En Vercel la variable se llame exactamente `DATABASE_URL`.
   - La URL tenga al final `?pgbouncer=true&connection_limit=1`.
   - Hayas hecho **Redeploy** después de guardar la variable.

---

## Resumen rápido

| Dónde        | Qué hacer |
|-------------|-----------|
| **Supabase** | Proyecto nuevo → Session Pooler URI → Crear tablas con `prisma/supabase-create-tables.sql` en SQL Editor. |
| **.env local** | `DATABASE_URL` = Session Pooler URI (sin `?pgbouncer=...` para seed). |
| **Tu PC**   | `npx prisma generate` y `npx prisma db seed`. |
| **Vercel**  | Proyecto nuevo → `DATABASE_URL` = misma URI + `?pgbouncer=true&connection_limit=1` → Deploy. |

---

## Opcional después de que funcione

- **RLS:** Si en Supabase ves el aviso de "RLS is disabled", puedes ejecutar en SQL Editor el contenido de **`prisma/supabase-enable-rls.sql`**.
- **Conexión directa:** Solo si en tu región Supabase no muestra "Not IPv4 compatible", podrías usar la conexión directa (puerto 5432, host `db.[ref].supabase.co`) en lugar del Session Pooler; en ese caso en Vercel no uses `?pgbouncer=true`.
