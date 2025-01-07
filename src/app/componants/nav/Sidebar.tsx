"use client";
import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { MdDashboard, MdGames } from "react-icons/md";
import NavLinks from "./NavLinks";
import Logo from "../defaults/Logo";
import { useGetUser } from "@/lib/queryFunctions";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { log } from "console";
import { logout } from "@/app/actions/auth";
import { toast } from "react-toastify";
import {  useQueryClient } from "@tanstack/react-query";

const Sidebar = () => {
  const { user, isLoading } = useGetUser();
  const queryClient = useQueryClient();

  const NAV_LINKS = [
    {
      link: "/",
      label: "Home",
      icon: <GoHomeFill />,
    },
    {
      link: "/category",
      label: "Category",
      icon: <MdDashboard />,
    },
    {
      link: "/games",
      label: "Games",
      icon: <MdGames />,
    },
    {
      link: "/wishlist",
      label: "WIshlist",
      icon: <FaHeart />,
    },
    {
      link: "/friends",
      label: "Friends",
      icon: <BsFillPeopleFill />,
    },
  ];
  return (
    <div className="hidden md:block md:col-span-1 lg:col-span-2">
      <div className="h-screen bg-black/30 sticky inset-0 py-5 flex flex-col items-center lg:items-start text-gray-50 md:px-10 ">
        <Logo />
        {NAV_LINKS.map((navLink) => (
          <NavLinks key={navLink.label} navLink={navLink} />
        ))}
        {isLoading ? (
          <div className="mt-auto">
            <Skeleton className="h-4 w-[130px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ) : user?.data ? (
          <div className="mt-auto hidden md:block   ">
            <div className="flex flex-col items-center lg:items-start">
              <NavLinks
                navLink={{
                  link: "/settings",
                  label: "Settings",
                  icon: <SettingsIcon />,
                }}
              />
              <Button
                onClick={async () => {
                  const res = await logout();
                  if (res.success) {
                    toast.success(res.success);
                    queryClient.invalidateQueries({queryKey:['user']});

                  }else toast.error(res.error);
                }}
                variant={"destructive"}
                className="w-full text-left"
              >
                <LogOutIcon /> <span className=" hidden lg:block">Logout</span>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
