import apiSearch from "@/services/search/search.service";
import { useQuery } from "@tanstack/react-query";

export const useGetSearchHistory = (name_search: string) => {
  const fetchSearchHistory = async () => {
    if (!name_search || name_search.trim() === '') {
      return [];
    }
    
    const response = await apiSearch.getSearchHistory(name_search);
    if (response.status === 200) {
      return response.data.item;
    }
    return [];
  };
  
  return useQuery({
    queryKey: ["searchHistory", name_search],
    queryFn: fetchSearchHistory,
    enabled: !!name_search && name_search.trim() !== '',
  });
};