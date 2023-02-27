import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";

import { MdWork, MdCode, MdStream, MdAccountCircle } from "react-icons/md"

import Logo from "../logo/Logo";

const Header = () => {
  return (
    <>
      <header className="flex justify-center xl:justify-start py-8 xl:max-w-screen-2xl xl:mx-auto">
        <div className="flex flex-col items-center max-w-xs pb-8 border-b-2 border-b-[#6C63FF] xl:border-b-0 xl:max-w-screen-2xl xl:flex-row w-full xl:justify-between xl:items-center">
          <Logo />

          <ul className="flex flex-col gap-4 tracking-widest xl:flex-row xl:gap-12 items-center px-10 py-4 xl:border-l-2 border-[#6C63FF]">
                <li>
                  <Link href="/register" className="hover:text-[#6C63FF] transition-all">
                    Sign up
                  </Link>
                </li>

                <li>
                  <Link
                    href="/login"
                    className="border-2 border-[#6C63FF] hover:bg-[#6C63FF] px-5 py-2 rounded-sm hover:text-white transition-all"
                  >
                    Sign in
                  </Link>
                </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
