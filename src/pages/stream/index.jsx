import Head from "next/head";

import useNotifStore from "@/store/useNotifStore";
import Sidebar from "@/components/sidebar/Sidebar";
import Stream from "@/components/stream/Stream";
import { auth } from "@/firebase";
import Modal from "@/components/modal/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";

const StreamPage = () => {

  const [isOpen, setIsOpen] = useRecoilState(modalState);

  return (
    <div>
      <Head>
        <title> devhub - Stream </title>
      </Head>

      <div className="flex font-noto">

          <Sidebar />

          <Stream />

          {isOpen && <Modal />}

          
      </div>

      
    </div>
  )
};

export default StreamPage;
