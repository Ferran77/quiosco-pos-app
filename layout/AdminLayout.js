import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children, pagina }) {
  return (
    <>
      <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Quosco Cafetería" />
      </Head>

      <div className="md:flex">
            <aside className="md:w-[calc(33.33%-16px)] xl:w-[calc(25%-16px)] 2xl:w-[calc(20%-16px)] py-5">
                <Link href="/">
                  <Image
                      width={180}
                      height={80}
                      src="/assets/img/logo.svg"
                      alt="imagen logotipo"
                      className="ml-8 mt-2 cursor-pointer"
                  />
                </Link>
                <nav className="mt-10 ml-8">
                  <Link 
                    href="/"
                    className="block text-2xl font-bold text-amber-500 hover:text-amber-600 transition-colors"
                  >
                    ← Volver al Menú
                  </Link>
                </nav>
            </aside>

            <main className="md:w-[calc(66.67%+16px)] xl:w-[calc(75%+16px)] 2xl:w-[calc(80%+16px)] h-screen overflow-y-scroll">
                <div className="p-10">
                    {children}
                </div>
            </main>
      </div>
      <ToastContainer />
    </>
  );
}