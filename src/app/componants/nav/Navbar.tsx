"use client";
import React from "react";
import Search from "../Search";
import ButtonGame from "../defaults/ButtonGame";
import { IoGameControllerSharp } from "react-icons/io5";
import Link from "next/link";
import { useGetUser } from "@/lib/queryFunctions";
import User from "../User";
import CustomSkeleton from "../CustomSkeleton";
import MenuToggle from "../MenuToggle";

const Navbar = () => {
  const { user, isLoading } = useGetUser();
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center gap-4">
      <div className="flex items-center gap-4 w-full">
        <MenuToggle />
        <Search />
      </div>

      <div className="w-full sm:w-auto flex items-center justify-between ">
        <div className="flex sm:hidden">
          <Link href={"/"}>
            <IoGameControllerSharp className="w-8 h-8 hover:text-rose-400 duration-200" />
          </Link>
        </div>

        {isLoading ? (
         <CustomSkeleton circle />
        ) : user?.data ? (
          <User user={user.data} />
        ) : (
          <div className="flex gap-2">
            <ButtonGame text="Login" link="/login" />
            <ButtonGame text="Sign Up" link="/signup" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
