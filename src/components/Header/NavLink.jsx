import Link from "next/link";
import React from "react";

const NavLink = ({ Icon, text, destination, avatar }) => {
  return (
    <Link
      href={destination}
      className="flex flex-col items-center space-y-2 text-sm hover:text-[#6C63FF] transition-all hover:border-b-2 hover:border-[#6C63FF] pb-2"
    >
      {avatar ? <Icon className="!h-7 !w-7 flex" /> : <Icon />}
      <p> {text} </p>
    </Link>
  );
};

export default NavLink;
