import Image from "next/image";
import Link from "next/link";
import React from "react";
import SwiperCard from "./SwiperCard";
import { Game } from "../types";
import AddToWishList from "./AddToWishlis";

const GamesSlider = ({
  games,
  title,
  slidesPerView = 1,
  smSlidesPerView = 2,
  mdSlidesPerView = 3,
  lgSlidesPerView = 4,
  screenBig,
}: {
  games: Game[];
  title: string;
  slidesPerView?: number;
  smSlidesPerView?: number;
  mdSlidesPerView?: number;
  lgSlidesPerView?: number;
  screenBig?: boolean;
}) => {
  return (
    <div className="mt-4 md:mt-8 lg:mt-14 flex flex-col gap-6">
      <h1 className="font-bold text-2xl lg:text-4xl text-white">{title}</h1>
      <SwiperCard
        haveBreakpoints
        slidesPerView={slidesPerView}
        smSlidesPerView={smSlidesPerView}
        mdSlidesPerView={mdSlidesPerView}
        lgSlidesPerView={lgSlidesPerView}
        className="h-full"
        items={games.map((game: Game) => {
          return {
            card: screenBig ? (
              <div className="flex items-center rounded-2xl overflow-hidden bg-gray-800 ">
                <div className="flex flex-col w-[60%] px-3">
                  <h1 className="text-2xl md:text-3xl font-semibold pb-3 border-b-2 border-neutral-100 text-white">
                    {game.name}
                  </h1>
                  <p className="text-sm md:text-base text-gray-400 mt-2 line-clamp-4 pt-3">
                    {game.description_raw}
                  </p>
                </div>
                <div className="w-[40%] h-72 md:h-80 relative">
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    className="object-cover"
                    fill
                  />
                </div>
              </div>
            ) : (
              <div className="relative group">
                <div className="group-hover:after:w-full after:inset-0 after:absolute after:h-full  after:duration-200 after:rounded-xl  after:w-0 after:top-0 after:left-0 after:bg-rose-400/50 w-full h-96 relative overflow-hidden rounded-2xl">
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    className="object-cover group-hover:scale-125 duration-500 group-hover:rotate-6"
                    fill
                  />
                </div>
                <Link
                  href={`/game/${game.slug}`}
                  className="text-base line-clamp-1 mt-2 cursor-pointer hover:underline font-semibold text-white"
                >
                  {game.name}
                </Link>
                <div className="absolute top-2 left-4">
                  <AddToWishList gameId={game.id.toString()} />
                </div>
              </div>
            ),
          };
        })}
      />
    </div>
  );
};

export default GamesSlider;
