import Head from "next/head";
import Header from "@/components/Header/Header";
import { useState } from "react";
import { useRouter } from "next/router";

import useNotifStore from "@/store/useNotifStore";
import Sidebar from "@/components/sidebar/Sidebar";
import Stream from "@/components/stream/Stream";
import { getProviders, getSession } from "next-auth/react";

const StreamPage = () => {
  const [hide, setHide] = useState(false);

  const { setNotif, message } = useNotifStore();

  const router = useRouter();

  const [fields, setFields] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

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

export async function getServerSideProps() {

  const providers = await getProviders();
  const session = await getSession();

  return {
    props: {
      providers, session
    }
  }
  
}
