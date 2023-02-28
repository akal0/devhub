import { auth } from "@/firebase";
import useNotifStore from "@/store/useNotifStore";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";

const SidebarLink = ({ icon, text, destination, logout, pathname, profile }) => {

  const { setNotif } = useNotifStore();
  let active = false;

  if ( !profile ) {
    if (pathname === text.toLowerCase()) {
      active = true;
    }
  }

  return (
    <Link
      href={destination}
      className={`flex items-center justify-center xl:justify-start gap-3 font-noto xl:hover:bg-[#27272c] px-4 py-2 xl:py-3 xl:pr-6 transition-all rounded-md w-max group ${active && "font-bold text-[#6C63FF]"}`}
      onClick={logout ? () => signOut(auth).then(() => setNotif("You have been successfully logged out!") ).catch((error) => setNotif(error)) : undefined}
    >
      <div className={`text-lg group-hover:text-[#6C63FF] ${logout && "group-hover:text-red-500"}`}>
      {icon}
      </div>
      <p className="hidden xl:inline"> {text} </p>
    </Link>
  );
};

export default SidebarLink;
