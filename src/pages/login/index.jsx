import Head from "next/head";
import Header from "@/components/Header/Header";
import { useState } from "react";
import { useRouter } from "next/router";

import { MdAccountCircle, MdAlternateEmail, MdOutlineFingerprint } from "react-icons/md"

import useNotifStore from "@/store/useNotifStore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import authHandler from "@/lib/handling/authHandler";


const Login = () => {
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

  const login = async (e) => {
    e.preventDefault();

    if ( fields.username.length ) {
      if ( fields.password.length ) {

        const docSnap = await getDoc(doc(db, "users", fields.username))

        if (docSnap.exists()) {
          
          let email = docSnap.data().email;
          
          signInWithEmailAndPassword(auth, email, fields.password).then((cred) => {

            setNotif(`Welcome back, ${fields.username}!`)
  
            router.replace("/stream")
  
          }).catch((error) => {
            const message = authHandler(error.code)
            setNotif(message);
          })

        } else {
          setNotif("That user doesn't exist!")
        }

      } else {
        setNotif("Please enter your password!")
      }
    } else {
      setNotif("Please enter your username!")
    }
  }

  return (
    <div className="px-28 pb-32">
      <Head>
        <title> devhub - Login </title>
      </Head>

      <Header />

      <form
        className="bg-[#1e1e22] max-w-screen-md mx-auto mt-16 px-12 py-20 flex flex-col items-center rounded-sm gap-10"
        onSubmit={login}
      >
        <h1 className="text-2xl mb-4">
          Welcome back, <span className="text-[#6C63FF]">developer</span>!
        </h1>

          <div className="flex items-center relative group w-[80%]">
            <input
              type="text"
              name="username"
              placeholder="Your username..."
              className="w-full py-3 px-5 bg-zinc-800 text-white outline-none border border-zinc-800 hover:border-[#6C63FF] focus:border-[#6C63FF] transition-all rounded-sm"
              value={fields.username}
              onChange={handleChange}
            />

            <MdAccountCircle className="absolute right-6 text-white/[0.5] group-hover:text-white/[1] transition-all text-xl" />
          </div>

          <div className="flex items-center relative group w-[80%]">
            <input
              type={hide ? "text" : "password"}
              name="password"
              placeholder="Your password..."
              className="w-full py-3 px-5 bg-zinc-800 text-white outline-none border border-zinc-800 hover:border-[#6C63FF] focus:border-[#6C63FF] transition-all rounded-sm"
              value={fields.password}
              onChange={handleChange}
            />

            <MdOutlineFingerprint
              className="absolute right-6 text-white/[0.5] group-hover:text-white/[1] transition-all cursor-pointer text-xl"
              onClick={() => setHide(!hide)}
            />
          </div>

        {/* Button */}

        <button
          type="submit"
          className="bg-zinc-800 hover:bg-[#6C63FF] transition-all w-[80%] py-3 "
        >
          Login
        </button>
      </form>
    </div>
  )
};

export default Login;
