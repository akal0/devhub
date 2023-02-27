import Link from "next/link";
import React from "react";



const SignedInLogo = () => {

  return (
    <Link
      href="/"
      className="mb-0 flex flex-col items-center xl:items-start max-w-2xl xl:py-3 px-4 xl:pr-6 transition-all rounded-md w-max"
    >
      <h1 className="hidden xl:inline text-3xl font-mono text-[#6C63FF] mb-2">devhub</h1>
      <h1 className=" xl:hidden text-lg font-mono text-[#6C63FF] mb-2">dh</h1>
    </Link>
  );
};

export default SignedInLogo;
