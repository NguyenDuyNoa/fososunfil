import apiProducts from "@/services/products/products.services";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailItem = (item_id: string) => {
  const fetchDetailItem = async () => {
    const { data } = await apiProducts.getDetailItem(item_id);
    return data;
  };

  return useQuery({
    queryKey: ["getDetailItem", item_id],
    queryFn: fetchDetailItem,
  });
};
