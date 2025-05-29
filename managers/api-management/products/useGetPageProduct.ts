import apiProducts from "@/services/products/products.services";
import { useQuery } from "@tanstack/react-query";

export const useGetPageProduct = (
  slug: string,
  page: number = 1,
  limit: number = 10
) => {
  const fetchPageProduct = async () => {
    const { data } = await apiProducts.getPageProduct(slug, page, limit);

    if (data && data.result) {
      return data as any;
    } else {
      return undefined;
    }
  };

  return useQuery<any>({
    queryKey: ["getPageProduct", slug, page, limit],
    queryFn: fetchPageProduct,
    enabled: !!slug,
  });
};
