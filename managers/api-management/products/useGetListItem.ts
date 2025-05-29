import apiProducts from "@/services/products/products.services";
import { useQuery } from "@tanstack/react-query";
import { FilterState } from "@/types/products/IProducts";

interface SortState {
  is_new?: number;
  is_hot?: number;
}

export const useGetListItemProduct = (
  slug: string, 
  filter: FilterState,
  sort: SortState = {},
  sort_price: "asc" | "desc" | number = -1
) => {
    const fetchListItem = async () => {
        const { data } = await apiProducts.getListItem(slug, filter, sort, sort_price);
        if (data && data.result) {
            return data.data as any;
        } else {
            return undefined;
        }
    };

    return useQuery<any>({
        queryKey: ["getListItemProduct", slug, filter, sort, sort_price],
        queryFn: fetchListItem,
        enabled: !!slug,
    });
};
