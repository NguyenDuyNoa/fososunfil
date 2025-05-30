import { useQuery } from "@tanstack/react-query";
import apiProducts from "@/services/products/products.services";

export const useGetCategoryFilter = (slug: string) => {
  return useQuery({
    queryKey: ["categoryFilter", slug],
    queryFn: () => apiProducts.categoryFilter(slug),
  });
};