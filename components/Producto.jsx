import Image from "next/image"
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Producto = ({ producto }) => {
  const { handleSetProducto, handleChangeModal } = useQuiosco();

  const { nombre, imagen, precio } = producto
  return (
    <div className="border p-2 rounded-lg overflow-hidden flex flex-col h-full">
      <Image
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen Platillo ${nombre}`}
        width={200}
        height={300}
        className="rounded-lg w-full h-auto object-cover"
      />
      <div className="p-4 rounded-lg flex flex-col flex-grow">
        <div className="h-[5rem] md:h-auto flex items-start overflow-hidden">
          <h3 className="text-1xl font-bold">
            {nombre}
          </h3>
        </div>
        <p className="mt-4 font-black text-3xl text-amber-500">
          {formatearDinero(precio)}
        </p>
        <div className="flex-grow"></div>
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-lg"
          onClick={() => {
            handleChangeModal();
            handleSetProducto(producto);
          }}
        >

          Agregar
        </button>
      </div>
    </div>
  )
}

export default Producto