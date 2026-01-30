import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useQuiosco from "../hooks/useQuiosco";
import Categoria from "./Categoria";

const Sidebar = () => {
  const { categorias } = useQuiosco();
  const router = useRouter();

  return (
    <>
      <Image
        width={180}
        height={80}
        src="/assets/img/logo.svg"
        alt="imagen logotipo"
        className="ml-12 mt-8"
      />
      <nav className="mt-10">
        {categorias.map(categoria => (
          <Categoria
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </nav>
      
      {/* Botón de Administración */}
      <div className="mt-14 px-5">
        <Link href="/admin">
          <div className={`${router.pathname === "/admin" ? "bg-indigo-600" : "bg-indigo-500"} flex items-center gap-2 w-[calc(100%-8px)] md:w-full border p-5 hover:bg-indigo-600 transition-colors cursor-pointer rounded-lg shadow-md`}>
            <svg 
              className="w-8 h-8 md:w-6 md:h-6 lg:w-10 lg:h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            <button
              type="button"
              className="text-lg md:text-base lg:text-2xl font-bold text-white hover:cursor-pointer"
            >
              Administración
            </button>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Sidebar