import apiOrder from "@/services/order/order.service";
import { useQuery } from "@tanstack/react-query";

export const useGetHistoryListOrder = (
  data: any,
  page: number = 1,
  limit: number = 5
) => {
  const fetchData = async () => {
    const response = await apiOrder.getHistoryListOrder(data, page, limit);
    return response.data; // Trả về toàn bộ dữ liệu bao gồm data và next
  };
  
  return useQuery({
    queryKey: ["getHistoryListOrder", data, page, limit],
    queryFn: fetchData,
  });
};
