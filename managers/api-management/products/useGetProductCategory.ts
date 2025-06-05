import apiProducts from "@/services/products/products.services";
import { useQuery } from "@tanstack/react-query";

export const useGetListCategory = (params: any) => {

    const fetchListCategory = async () => {
        const { data } = await apiProducts.getListCategory(params);

        if (data && data.result) {
            return data.data as any;
        } else {
            return undefined;
        }
    };

    return useQuery<any>({
        queryKey: ["getProductCategory", params],
        queryFn: fetchListCategory,
        enabled: !!params,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
    });
};
