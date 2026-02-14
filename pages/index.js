import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout/Layout';
import useQuiosco from '../hooks/useQuiosco';
import Producto from '../components/Producto';

//categoriaActual, viene de useQuiosco
export default function Home() {
  const { categoriaActual, categoriasError, categoriasCargando, reintentarCategorias } = useQuiosco();

  if (categoriasCargando) {
    return (
      <Layout pagina="Menú">
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-xl text-slate-600">Cargando menú...</p>
        </div>
      </Layout>
    );
  }

  if (categoriasError) {
    return (
      <Layout pagina="Menú">
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <p className="text-xl text-red-600 text-center mb-4">
            No se pudo cargar el menú. En producción (Vercel) necesitas una base de datos alojada.
          </p>
          <p className="text-slate-600 text-center mb-6">{categoriasError}</p>
          <button
            type="button"
            onClick={reintentarCategorias}
            className="bg-indigo-600 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg font-bold uppercase"
          >
            Reintentar
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pagina={categoriaActual?.nombre ? `Menú ${categoriaActual.nombre}` : 'Menú'}>
      <h1 className='text-3xl font-black mt-1'>
        {categoriaActual?.nombre ?? 'Menú'}
      </h1>
      <p className='text-lg md:text-2xl my-5'>
        Elige y personaliza tu pedido aquí:
      </p>

      <div className='grid gap-4 grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
        {categoriaActual?.productos?.map(producto => (
        <Producto key={producto.id} producto={producto}/>
      ))}

      </div>

      
    </Layout>
    
  )
}



