import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";


const Categoria = ({ categoria }) => {
  const { categoriaActual, handleClickCategoria } = useQuiosco();

  const { nombre, icono, id } = categoria;

  return (
    <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-2 w-[calc(100%-16px)] md:w-full border p-5 hover:bg-amber-400 rounded-lg ml-2 md:ml-0`}>
      <Image
        width={40}
        height={40}
        src={`/assets/img/icono_${icono}.svg`}
        alt="Imagen icono"
      />
      <button
        type="button"
        className="text-xl md:text-lg lg:text-2xl font-bold hover:cursor-pointer"
        onClick={() => handleClickCategoria(id)}
      >
        {nombre}
      </button>
    </div>
  );
};

export default Categoria