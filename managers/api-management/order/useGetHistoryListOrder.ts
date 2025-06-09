import apiOrder from "@/services/order/order.service";
import { useQuery } from "@tanstack/react-query";

export const useGetHistoryListOrder = (
  data: any,
  page: number = 1,
  limit: number = 10
) => {
  const fetchData = async () => {
    const response = await apiOrder.getHistoryListOrder(data, page, limit);
    return response.data.data;
  };
  return useQuery({
    queryKey: ["getHistoryListOrder", data, page, limit],
    queryFn: fetchData,
  });
};
