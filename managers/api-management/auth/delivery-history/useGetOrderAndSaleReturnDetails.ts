import apiAuth from "@/services/auth/auth.services";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderAndSaleReturnDetails = (orderId: number, typeId?: number) => {
  const fetchData = async () => {
    const response = await apiAuth.getOrderAndSaleReturnDetails({
      orderId,
      typeId,
    });
    return response.data;
  };
  return useQuery({
    queryKey: ["getOrderAndSaleReturnDetails", orderId, typeId],
    queryFn: fetchData,
    enabled: !!orderId, // Chỉ gọi API khi có orderId
  });
};
