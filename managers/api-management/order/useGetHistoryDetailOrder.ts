import { useQuery } from "@tanstack/react-query";
import apiOrder from "@/services/order/order.service";

export const useGetHistoryDetailOrder = (id: string) => {
  const fetchHistoryDetailOrder = async () => {
    const response = await apiOrder.getHistoryDetailOrder(id);
    return response.data;
  };
  return useQuery({
    queryKey: ["getHistoryDetailOrder", id],
    queryFn: fetchHistoryDetailOrder,
  });
};
