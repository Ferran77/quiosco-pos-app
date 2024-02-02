import useSWR from "swr";
import axios from "axios";
import AdminLayout from "../layout/AdminLayout";
import Orden from "../components/Orden";


export default function Admin() {

  const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('api/ordenes', fetcher, {refreshInterval: 100})

    console.log(data)
  return (
    <AdminLayout pagina={'Admin'}>
      <h1 className="text-4xl font-black">Panel de administración</h1>
      <p className="text-2xl my-10">Administra las órdenes:</p>

      {data && data.length ? data.map(orden => 
        <Orden
        key={orden.id}
        orden={orden}
        />
        ) : <p>No hay órdenes pendientes</p>}
    </AdminLayout>
  )
}