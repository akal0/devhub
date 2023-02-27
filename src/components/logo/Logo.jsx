import Link from "next/link";
import React from "react";



const Logo = () => {

  return (
    <Link
      href="/"
      className="mb-8 xl:mb-0 flex flex-col items-center xl:items-start border-l-4 border-l-[#6C63FF] pl-8 max-w-2xl"
    >
      <h1 className="text-4xl font-mono text-[#6C63FF] mb-2">devhub</h1>

      <p className="text-sm max-w-full">The homeplace of all developers...</p>
    </Link>
  );
};

export default Logo;
