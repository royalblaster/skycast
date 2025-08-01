import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";
import type { Coordinates } from "@/lib/types";
interface Favorite {
  id: string;
  name: string;
  lat: number;
  lon: number;
  state?: string;
  country: string;
  addedAt: number;
}

export default function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<Favorite[]>(
    "favorites",
    []
  );

  const queryClient = useQueryClient();

  // generate cache
  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity,
  });

  const truncateTo2Decimals = (val: number) => Math.trunc(val * 100) / 100;

  // add
  const addFavorite = useMutation({
    mutationFn: async (favorite: Omit<Favorite, "id" | "addedAt">) => {
      const newFavorite: Favorite = {
        ...favorite,
        id: `${favorite.lat}-${favorite.lon}`,
        addedAt: Date.now(),
      };

      const truncatedLat = truncateTo2Decimals(newFavorite.lat);
      const truncatedLon = truncateTo2Decimals(newFavorite.lon);

      const newFavorites = [
        ...favorites.filter(
          (city) =>
            truncateTo2Decimals(city.lat) !== truncatedLat &&
            truncateTo2Decimals(city.lon) !== truncatedLon
        ),
        newFavorite,
      ];

      setFavorites(newFavorites);
      return newFavorites;
    },
    onError: (error) => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  // remove
  const removeFavorite = useMutation({
    mutationFn: async ({ lat, lon }: Coordinates) => {
      const truncatedLat = truncateTo2Decimals(lat);
      const truncatedLon = truncateTo2Decimals(lon);

      const newFavorites = favorites.filter(
        (city) =>
          truncateTo2Decimals(city.lat) !== truncatedLat &&
          truncateTo2Decimals(city.lon) !== truncatedLon
      );

      setFavorites(newFavorites);
      return newFavorites;
    },
    onError: (error) => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return {
    favorites: favoritesQuery.data ?? [],
    addFavorite,
    removeFavorite,
    isFavorite: (lat: number, lon: number) =>
      favorites.some(
        (city) =>
          truncateTo2Decimals(city.lat) === truncateTo2Decimals(lat) &&
          truncateTo2Decimals(city.lon) === truncateTo2Decimals(lon)
      ),
  };
}
