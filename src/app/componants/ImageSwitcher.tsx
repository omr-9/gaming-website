"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { GoPeople } from "react-icons/go";
import { Game, Images } from "../types";
// import { Game, Images } from "@/types";
const ImageSwisher = ({ images, game }: { images: Images; game: Game }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((a) => (a + 1) % images.results?.length);
    }, 1000);
    return () => clearInterval(t);
  }, [game, images?.results?.length]);

  return (
    <div className=" flex flex-col gap-4 py-3 items-center px-6 rounded-xl bg-gray-800 overflow-hidden">
      <div className=" flex items-center gap-2 justify-between">
        <h1 className=" text-base text-white">{game.name}</h1>
        <p className=" text-xs text-muted-foreground mt-1">
          Released {game.released}
        </p>
      </div>
      <div className=" w-80 h-36 rounded-xl overflow-hidden relative ">
        {images.results?.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            animate={{ opacity: activeIndex === index ? 1 : 0 }}
            className=" absolute inset-0"
            style={{ zIndex: activeIndex === index ? 1 : 0 }}
          >
            <Image
              fill
              src={image.image}
              alt={`${image}`}
              className=" object-cover"
            />
          </motion.div>
        ))}
      </div>
      <p className=" text-sm flex items-center gap-2 self-start text-muted-foreground mt-1">
        <GoPeople />
        Review count {game.reviews_count}
      </p>
    </div>
  );
};

export default ImageSwisher;