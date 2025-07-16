import apiAuth from "@/services/auth/auth.services";
import { useQuery } from "@tanstack/react-query";

interface OrderAndSaleParams {
  datefrom: string;
  dateto: string;
  page?: number;
  limit?: number;
}

export const useGetOrderAndSaleReturnAmount = (params?: Partial<OrderAndSaleParams>) => {
    const fetchData = async () => {
        const response = await apiAuth.getOrderAndSaleReturnAmount({
            datefrom: params?.datefrom || "01/01/2025",
            dateto: params?.dateto || "01/07/2025",
            page: params?.page || 1,
            limit: params?.limit || 10,
        });
        return response.data;
    };
    return useQuery({
        queryKey: ["getOrderAndSaleReturnAmount", params?.page, params?.limit, params?.datefrom, params?.dateto],
        queryFn: fetchData,
    });
};