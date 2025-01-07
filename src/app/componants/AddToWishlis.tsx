"use client";
import { useWishlsit } from "../context/wishlistContext";
import { Heart } from "lucide-react";


const AddToWishlist = ({ gameId }: { gameId: string }) => {
  const { handleAddToWishlist, wishlist } = useWishlsit();
  const isInWishlist = wishlist.includes(gameId);
  return (
    <Heart
    aria-label="Toggle Favorite"
    onClick={() => handleAddToWishlist(gameId)}
    className={`${
      isInWishlist ? "text-gray-200 bg-red-500" : "text-gray-600 bg-white"
    }  w-8 h-8 cursor-pointer rounded-2xl p-1.5`}
    size={20}
    />
  );
};

export default AddToWishlist;