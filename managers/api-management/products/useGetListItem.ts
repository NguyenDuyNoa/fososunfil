import apiProducts from "@/services/products/products.services";
import { useQuery } from "@tanstack/react-query";
import { FilterState } from "@/types/products/IProducts";
import { useState } from "react";

interface SortState {
  is_new?: number;
  is_hot?: number;
}

export const useGetListItemProduct = (
  slug: string, 
  filter: FilterState,
  sort: SortState = {},
  sort_price: "asc" | "desc" | number = -1,
  page: number = 1,
  limit: number = 10
) => {
    const [isNext, setIsNext] = useState(false);
    const fetchListItem = async () => {
        const { data } = await apiProducts.getListItem(slug, filter, sort, sort_price, page, limit);
        if (data && data.result) {
            if(data.next === 1) {
                setIsNext(true);
            } else {
                setIsNext(false);
            }
            return data.data as any;
        } else {
            return undefined;
        }
    };

    const query = useQuery<any>({
        queryKey: ["getListItemProduct", slug, filter, sort, sort_price, page],
        queryFn: fetchListItem,
        enabled: !!slug,
    });

    return {
        ...query,
        isNext,
    };
};
