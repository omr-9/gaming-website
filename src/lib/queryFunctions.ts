"use client";
import { getUser } from "@/app/actions/auth";
import { getGamesByIds, searchGames } from "@/app/api/api";
import { useQuery } from "@tanstack/react-query";
export const useGetUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
  return { user, isLoading };
};

export const useGetGamesWithIds = (ids: string[]) => {
  const { data: games, isLoading } = useQuery({
    queryKey: [`games-${ids}`],
    queryFn: () => getGamesByIds(ids),
  });
  return { games, isLoading };
};

export const useGetGame = ({
  query = "",
  page = 1,
  pageSize = 21,
  filters = [],
  isDisabled = false,
}: {
  query?: string;
  page?: number;
  pageSize?: number;
  filters?: {firstName:string, option:string}[] | any;
  isDisabled?: boolean;
}) => {

  const { data: games, isLoading } = useQuery({
    queryKey: [`games-${page}-${JSON.stringify(filters)}-${query}`],
    queryFn: async () => await  searchGames(query, page, filters, pageSize),
    enabled: !isDisabled
  });
  return { games, isLoading };
};
