import Link from "next/link";
import React from "react";
import { IoGameControllerSharp } from "react-icons/io5";

const Logo = () => {
  return (
    <Link
      className="flex gap-2 text-lg my-2 font-semibold lg:text-2xl"
      href={"/"}
    >
      <div className="block lg:hidden">
        <IoGameControllerSharp className="w-8 h-8" />
      </div>
      <div className="hidden lg:block">
        <h1 className="text-rose-500 font-semibold lg:text-[22px] xl:text-3xl">
          Gaming<span className="text-white">boi</span>
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
