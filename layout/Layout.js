import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Modal from "react-modal";
import useQuiosco from "../hooks/useQuiosco";
import ModalProducto from "../components/ModalProducto";
import {ToastContainer} from 'react-toastify';
import Pasos from "../components/Pasos";
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

export default function Layout({children, pagina}) {

  const { modal } = useQuiosco();

  return (
    <>
    <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Quiosco Cafetería" />
      </Head>

      <div className="md:flex">
        <aside className="md:w-[calc(33.33%-16px)] xl:w-[calc(25%-16px)] 2xl:w-[calc(20%-16px)]">
          <Sidebar />
        </aside>

        <main className="md:w-[calc(66.67%+24px)] xl:w-[calc(75%+24px)] 2xl:w-[calc(80%+24px)] h-screen overflow-y-scroll">
          <div className="p-4 md:p-10">
            <Pasos/>
          {children}
          </div>
            
        </main>
      </div> 
      {modal && (<Modal isOpen={modal} style={customStyles}>
          <ModalProducto/>
        </Modal>
      )};
        
      <ToastContainer/>
    </>
  );
}