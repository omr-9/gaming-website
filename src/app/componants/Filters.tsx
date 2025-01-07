"use client";
import { useGetGame } from "@/lib/queryFunctions";
import React, { useState } from "react";
import { Game } from "../types";
import GameCard from "./GameCard";
import Empty from "./defaults/Empty";
import GameSkeleton from "./GameSkeleton";
import GridContainer from "./defaults/GridContainer";
import { CustomPagination } from "./CustomPagination";
const Filters = ({ genres }: { genres: any }) => {
  const [page, setPage] = useState(1);
  const [activeGenre, setActiveGenre] = useState<number[]>([]);

  const { games, isLoading } = useGetGame({
    page,
    filters:
      activeGenre.length > 0
        ? [{ filterName: "genres", option: activeGenre.join(",") }]
        : [],
  });
  const totalPages = Math.ceil(games?.count / 21);
  return (
   
      <GridContainer cols={11} className="relative gap-5 ">
        <div className="lg:sticky lg:h-screen inset-0 col-span-full lg:col-span-2">
          <div className="flex flex-row lg:flex-col gap-3  bg-[#333839] py-2 px-4 rounded-lg overflow-scroll hide-scrollbar ">
            {genres.map((genre: any, i: number) => (
              <button
                className={`${
                  activeGenre.includes(genre.id)
                    ? "bg-rose-400 text-white"
                    : "bg-[#333839] text-gray-300"
                } py-1 px-2 rounded-lg hover:bg-rose-400 hover:text-white duration-200}`}
                onClick={() =>
                  activeGenre.includes(genre.id)
                    ? setActiveGenre(
                        activeGenre.filter((id) => id !== genre.id)
                      )
                    : setActiveGenre([...activeGenre, genre.id])
                }
                key={i}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
        <GridContainer cols={3} className="col-span-9 gap-5">
            {isLoading? (<GameSkeleton />) : games?.data.results.length > 0 ? (games?.data.results.map((game: Game) => (
                <GameCard
                screenBig
                wishlist   
                key={game.id}
                game={game}
                />
                
            ))) : (<Empty message="Sorry, no games found in this page" />)}
        </GridContainer>
        <CustomPagination setPage={setPage} count={totalPages} page={page} />
      </GridContainer>
    // </div>
  );
};

export default Filters;
