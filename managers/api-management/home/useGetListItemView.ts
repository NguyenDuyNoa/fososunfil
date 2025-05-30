import apiHome from "@/services/home/home.services";
import { useQuery } from "@tanstack/react-query";

export const useGetListItemView = (item_id: string[]) => {
  const fetchListItemView = async () => {
    const { data } = await apiHome.getListItemView(item_id);
    if (data && data.result) {
      return data.item as any;
    } else {
      return undefined;
    }
  };

  return useQuery({
    queryKey: ["getListItemView", item_id],
    queryFn: fetchListItemView,
  });
};