import { useQuery } from "@tanstack/react-query";
import apiProducts from "@/services/products/products.services";

export const useGetReview = (item_id: string, page: number = 1, limit: number = 1) => {
  return useQuery({
    queryKey: ["getReview", page, limit],
    queryFn: () => apiProducts.getReview(item_id, page, limit),
  });
};
