import Link from "next/link";
import React from "react";

const NavLink = ({ icon, text, destination }) => {
  return (
    <Link
      href={destination}
      className="flex flex-col items-center justify-end space-y-2 text-sm hover:text-[#6C63FF] transition-all hover:border-b-2 hover:border-[#6C63FF] pb-2"
    >
      <div className="text-lg">
      {icon}
      </div>
      <p> {text} </p>
    </Link>
  );
};

export default NavLink;
