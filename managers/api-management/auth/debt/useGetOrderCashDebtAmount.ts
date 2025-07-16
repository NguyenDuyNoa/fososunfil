import apiAuth from "@/services/auth/auth.services";
import { useQuery } from "@tanstack/react-query";

interface OrderCashDebtParams {
  datefrom: string;
  dateto: string;
}
export const useGetOrderCashDebtAmount = (
  data: Partial<OrderCashDebtParams>
) => {
  const fetchData = async () => {
    const response = await apiAuth.getOrderCashDebtAmount({
      datefrom: data?.datefrom || "01/01/2025",
      dateto: data?.dateto || "01/07/2025",
    });
    return response.data;
  };
  return useQuery({
    queryKey: ["getOrderCashDebtAmount", data?.datefrom, data?.dateto],
    queryFn: fetchData,
  });
};
