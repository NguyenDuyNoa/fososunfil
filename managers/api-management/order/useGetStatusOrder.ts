import { useQuery } from "@tanstack/react-query";
import apiOrder from "@/services/order/order.service";

export const useGetStatusOrder = () => {
  const fetchStatusOrder = async () => {
    const response = await apiOrder.getStatusOrder();
    return response.data.data;
  };
  return useQuery({
    queryKey: ["getStatusOrder"],
    queryFn: fetchStatusOrder,
  });
};
