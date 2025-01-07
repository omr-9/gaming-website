import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import MotionItem from "./defaults/MotionItem";

const CardInfo = ({
  title,
  image,
  desc,
  textBtn,
  btnClasses,
}: {
  title: string;
  image: string;
  desc: string;
  textBtn: string;
  btnClasses?: string;
}) => {
  return (
    <MotionItem initial={{ opacity: 0 , y:20}} whileInView={{ opacity: 1,y:0, transition: { duration: 1 }}} className="absolute space-y-4 left-5 sm:left-10  md:left-20 top-20 max-w-sm md:max-w-md flex flex-col items-start  ">
      <div className="w-64 h-20 sm:w-96 sm:h-40 relative ">
        <Image alt={title} src={image} fill className="object-left object-contain" />
      </div>
      <div>
      <h1 className=" font-semibold text-lg sm:text-lg md:text-2xl text-white">{title}</h1>
      <p className="text-sm sm:text-base text-gray-200">{desc}</p>
      </div>
      <Button className={`rounded-full mt-5 ${btnClasses || ""}`}>
        {textBtn || `Find Out More`}
      </Button>
    </MotionItem>
  );
};

export default CardInfo;
