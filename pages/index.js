import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout/Layout';
import useQuiosco from '../hooks/useQuiosco';
import Producto from '../components/Producto';

//categoriaActual, viene de useQuiosco
export default function Home() {
  const { categoriaActual } = useQuiosco();
  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className='text-3xl font-black mt-1'>
        {categoriaActual?.nombre}
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



