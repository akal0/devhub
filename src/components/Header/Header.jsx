import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";

import { DataObject, Work } from "@mui/icons-material";

import Logo from "../logo/Logo";

const Header = () => {
  return (
    <>
      <header className="flex justify-center xl:justify-start py-8 xl:max-w-screen-2xl xl:mx-auto">
        <div className="flex flex-col items-center max-w-xs pb-8 border-b-2 border-b-[#6C63FF] xl:border-b-0 xl:max-w-screen-2xl xl:flex-row w-full xl:justify-between xl:items-center">
          <Logo />

          <ul className="flex flex-col gap-6 tracking-widest xl:flex-row xl:gap-12 xl:divide-y-0 xl:divide-x-2 divide-[#6C63FF]">
            <div className="flex gap-12">
              <NavLink Icon={DataObject} text="Articles" destination="#" />
              <NavLink Icon={Work} text="Opportunities" destination="#" />
            </div>

            <div className="flex flex-col gap-4 tracking-widest xl:flex-row xl:gap-8 items-center px-10 py-4">
              <li>
                <Link href="#" className="hover:text-[#6C63FF] transition-all">
                  Sign up
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="border-2 border-[#6C63FF] hover:bg-[#6C63FF] px-5 py-2 rounded-sm hover:text-white transition-all"
                >
                  Sign in
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
