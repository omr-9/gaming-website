"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";

const NavLinks = ({
  navLink,
}: {
  navLink: { link: string; label: string; icon: ReactElement };
}) => {
  const { label, icon } = navLink;
  const pathName = usePathname();
  // console.log(pathName === navLink.link)
  const isActive = pathName === navLink.link;
  return (
    <Link
      href={navLink.link}
      className={`flex gap-2 items-center p-2 rounded-md duration-200 hover:text-rose-400 my-2 ${
        isActive ? "text-rose-400" : "text-gray-50"
      }`}
    >
      {React.cloneElement(icon, { className: "w-5 h-5" })}
      <span className="hidden lg:block">{label}</span>
    </Link>
  );
};

export default NavLinks;
