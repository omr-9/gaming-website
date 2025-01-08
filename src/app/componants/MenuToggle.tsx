"use client";

import { useGetUser } from "@/lib/queryFunctions";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { logout } from "../actions/auth";
import { toast } from "react-toastify";
import { IoClose, IoMenu } from "react-icons/io5";
// import { links } from "@/constant";
import NavLinks from "./nav/NavLinks";
import CustomSkeleton from "./CustomSkeleton";
import { IoMdHeart, IoMdSettings } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { GoHomeFill } from "react-icons/go";
import { MdDashboard } from "react-icons/md";

// import React, { useRef, useState, useEffect } from "react";
// import { IoMenu, IoClose } from "react-icons/io5";
// import NavLink from "./nav/NavLink";
// import { links } from "@/constant";
// import { FiLogOut } from "react-icons/fi";
// import CustomSkeleton from "./CustomSkeleton";
// import { IoMdSettings } from "react-icons/io";
// import { Button } from "./ui/button";
// import { useGetUser } from "@/lib/queryFunctions";
// import { useQueryClient } from "@tanstack/react-query";
// import { logout } from "@/lib/actions";
// import toast from "react-hot-toast";

 const links = [
    {
      label: "Home",
      href: "/",
      icon: <GoHomeFill size={22} aria-label="Home Icon" />,
    },
    {
      label: "Games",
      href: "/games",
      icon: <MdDashboard size={22} aria-label="Games Icon" />,
    },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: <IoMdHeart size={22} aria-label="Wishlist Icon" />,
    },
  ];


const MenuToggle = () => {
  const [open, setOpen] = useState(false);
  const outsideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        outsideRef.current &&
        !outsideRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const toggleMenu = () => setOpen((prev) => !prev);

  const { user, isLoading } = useGetUser();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    const res = await logout();
    if (res !== undefined && res.success) {
      toast.success(res.success);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } else if (res !== undefined && res.error) {
      toast.error(res.error);
    }
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <div className="md:hidden">
        {!open && (
          <IoMenu
            size={40}
            className="text-gray-50 cursor-pointer"
            onClick={toggleMenu}
            aria-label="Open Menu"
          />
        )}
      </div>

      {/* Side Menu */}
      <div
        ref={outsideRef}
        className={`fixed top-0 left-0 z-50 w-[310px] min-h-screen bg-black/90 flex flex-col items-center justify-center transition-transform duration-300 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* Close Icon */}
        <IoClose
          size={40}
          className="text-gray-50 cursor-pointer absolute top-5 right-5"
          onClick={toggleMenu}
          aria-label="Close Menu"
        />

        {/* Menu Content */}
        <div className="flex flex-col items-center gap-10">
          <h1 className="text-3xl font-semibold">
            <span className="text-rose-500">Gaming</span>boi
          </h1>
          <nav className="space-y-6 text-center">
          {/* {links.map((link) => (
          <NavLinks key={link.label} navLink={link.icon} />
        ))} */}

{links.map((navlink) => (
  <NavLinks
    navLink={{
      link: navlink.href,
      label: navlink.label,
      icon: navlink.icon
    }}
    key={navlink.label}
  />
))}
            <div className="mt-auto">
              {isLoading ? (
                <CustomSkeleton circle />
              ) : user?.data ? (
                <div className="space-y-4">
                  <NavLinks
                    navLink={{
                      label: "Settings",
                      link: "/settings",
                    //   href: "/settings",
                      icon: <IoMdSettings size={22} />,
                    }}
                  />
                  <div>
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="w-full md:hidden lg:block rounded-full"
                    >
                      Logout
                    </Button>
                    <LogOutIcon
                      size={22}
                      className="hidden md:block lg:hidden m-auto"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MenuToggle;