import Head from "next/head";
import Header from "@/components/Header/Header";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  AccountCircle,
  AlternateEmail,
  Fingerprint,
  Router,
} from "@mui/icons-material";
import useNotifStore from "@/store/useNotifStore";

const Register = () => {
  const [hide, setHide] = useState(false);
  const { setNotif, message } = useNotifStore();

  const router = useRouter();

  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();
    console.log(fields);

    const response = await fetch("/api/auth/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: fields.username,
        email: fields.email,
        password: fields.password,
        cPassword: fields.cPassword,
      }),
    });

    const result = await response.json();

    if (response.status !== 200) {
      setNotif(result.message);
    } else {
      router.replace("/");
      setNotif(result.message);
    }
  };

  return (
    <div className="px-28 pb-32">
      <Head>
        <title> devhub - Register </title>
      </Head>

      <Header />

      <form
        className="bg-[#1e1e22] max-w-screen-lg mx-auto mt-16 px-12 py-20 flex flex-col items-center rounded-sm gap-10"
        onSubmit={register}
      >
        <h1 className="text-2xl mb-4">
          Become a <span className="text-[#6C63FF]">developer</span>!
        </h1>

        <div className="flex flex-col gap-8 2xl:grid 2xl:grid-cols-2 w-[80%] 2xl:gap-12">
          <div className="flex items-center relative group">
            <input
              type="text"
              name="username"
              placeholder="Username..."
              className="w-full py-3 px-5 bg-zinc-800 text-white outline-none border border-zinc-800 hover:border-[#6C63FF] focus:border-[#6C63FF] transition-all rounded-sm"
              value={fields.username}
              onChange={handleChange}
            />

            <AccountCircle className="absolute right-6 text-white/[0.5] group-hover:text-white/[1] transition-all" />
          </div>

          <div className="flex items-center relative group">
            <input
              type="email"
              name="email"
              placeholder="E-mail address..."
              className="w-full py-3 px-5 bg-zinc-800 text-white outline-none border border-zinc-800 hover:border-[#6C63FF] focus:border-[#6C63FF] transition-all rounded-sm"
              value={fields.email}
              onChange={handleChange}
            />

            <AlternateEmail className="absolute right-6 text-white/[0.5] group-hover:text-white/[1] transition-all" />
          </div>
        </div>

        <div className="flex flex-col w-[80%] gap-10">
          <div className="flex items-center relative group">
            <input
              type={hide ? "text" : "password"}
              name="password"
              placeholder="Your password..."
              className="w-full py-3 px-5 bg-zinc-800 text-white outline-none border border-zinc-800 hover:border-[#6C63FF] focus:border-[#6C63FF] transition-all rounded-sm"
              value={fields.password}
              onChange={handleChange}
            />

            <Fingerprint
              className="absolute right-6 text-white/[0.5] group-hover:text-white/[1] transition-all cursor-pointer"
              onClick={() => setHide(!hide)}
            />
          </div>

          <div className="flex items-center relative group">
            <input
              type={hide ? "text" : "password"}
              name="cPassword"
              placeholder="Confirm your password please, don't want you forgetting it..."
              className="w-full py-3 px-5 bg-zinc-800 text-white outline-none border border-zinc-800 hover:border-[#6C63FF] focus:border-[#6C63FF] transition-all rounded-sm"
              value={fields.cPassword}
              onChange={handleChange}
            />

            <Fingerprint
              className="absolute right-6 text-white/[0.5] group-hover:text-white/[1] transition-all cursor-pointer"
              onClick={() => setHide(!hide)}
            />
          </div>
        </div>

        {/* Button */}

        <button
          type="submit"
          className="bg-zinc-800 hover:bg-[#6C63FF] transition-all w-[80%] py-3 "
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
