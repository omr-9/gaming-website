'use client';

import { useGetGamesWithIds } from "@/lib/queryFunctions";
import GameSkeleton from "@/app/componants/GameSkeleton";
import Empty from "@/app/componants/defaults/Empty";
import GameCard from "@/app/componants/GameCard";
import { useWishlsit } from "@/app/context/wishlistContext";
import GridContainer from "@/app/componants/defaults/GridContainer";



const page = () => {
  const { wishlist } = useWishlsit();
  const { games, isLoading } = useGetGamesWithIds(wishlist);
  console.log(games);
  return (
    <div className=" mt-10 flex flex-col gap-4 ">
      <h1 className=" text-2xl font-semibold md:text-3xl lg:text-4xl mb-4" >  My WishList ❤️ </h1>
      <div className="gap-5 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <GameSkeleton />
        ) : games ? (
          games?.map((game: any, i) => (
            <GameCard 
            screenBig
              key={i}
              wishlist={true}
              game={{
                ...game.data,
                short_screenshots: game.screenshots
              }}
            />
          ))
        ) : (
          <Empty
            message="You have not added anything to your wishlist yet !"
            link="/games"
            linkText="Browse More Games"
          />
        )}
      </div>
    </div>
  );
};

export default page;
