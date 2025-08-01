import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

interface SearchHistoryItem {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  state?: string;
  country: string;
  searchTimeStamp: number;
}

export default function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useLocalStorage<
    SearchHistoryItem[]
  >("search", []);

  const queryClient = useQueryClient();

  // generate cache
  const searchHistoryQuery = useQuery({
    queryKey: ["search"],
    queryFn: () => searchHistory,
    initialData: searchHistory,
  });

  // add
  const addSearchHistoryItem = useMutation({
    mutationFn: async (
      searchItem: Omit<SearchHistoryItem, "id" | "searchTimeStamp">
    ) => {
      const newSearchItem: SearchHistoryItem = {
        ...searchItem,
        id: `${searchItem.lat}-${searchItem.lon}-${Date.now()}`,
        searchTimeStamp: Date.now(),
      };

      // remove duplicates
      const filteredHistory = searchHistory.filter(
        (item) => !(item.lat === searchItem.lat && item.lon === searchItem.lon)
      );

      // maintain only 5 searches
      const newHistory = [newSearchItem, ...filteredHistory].slice(0, 5);
      setSearchHistory(newHistory);
      return newHistory;
    },
    onError: (error) => {
      // An error happened!
    },
    onSuccess: (newHistory) => {
      // Boom baby!
      queryClient.setQueryData(["search"], newHistory);
    },
  });

  // clear
  const clearSearchHistory = useMutation({
    mutationFn: async () => {
      setSearchHistory([]);
    },

    onError: (error) => {
      // An error happened!
    },

    onSuccess: () => {
      queryClient.setQueryData(["search"], []);
    },
  });

  return {
    history: searchHistoryQuery.data ?? [],
    addSearchHistoryItem,
    clearSearchHistory,
  };
}
