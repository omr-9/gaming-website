'use client'
import ButtonSvg from "@/components/ButtonSvg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ButtonGame = ({
  className,
  text,
  link,
  icon,
  onClick,
  disabled = false,
}: {
  className?: string;
  text: string;
  link: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={`${
        className || ""
      } hover:text-rose-400 duration-200 relative py-2 px-6 flex-initial gap-2 text-center bg-gray-400 m-auto `}
    >
      {ButtonSvg(false)}
      <span className="relative">
        {link ? <Link href={link}>{text}</Link> : text}
      </span>
      {icon && icon}
    </Button>
  );
};

export default ButtonGame;
