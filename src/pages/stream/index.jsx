import Head from "next/head";

import useNotifStore from "@/store/useNotifStore";
import Sidebar from "@/components/sidebar/Sidebar";
import Stream from "@/components/stream/Stream";
import { auth } from "@/firebase";

const StreamPage = () => {
  return (
    <div>
      <Head>
        <title> devhub - Stream </title>
      </Head>

      <div className="flex font-noto">

          <Sidebar />

          <Stream />

          <div className="break-words max-w-lg">
            Hello daflsodj;hbfuyisdfibasdadfijadujwefsdfdasfsasdasdasdasdasdasasdasdasdasdasdasd
          </div>
          
      </div>

      
    </div>
  )
};

export default StreamPage;
