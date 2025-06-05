import apiOrder from "@/services/order/order.service";
import { useQuery } from "@tanstack/react-query";

export const useGetListCart = () => {
  const fetchListCart = async () => {
    const { data } = await apiOrder.getListCart();

    if (data) {
      return data.arrItemList as any;
    } else {
      return undefined;
    }
  };
  return useQuery({
    queryKey: ["listCart"],
    queryFn: fetchListCart,
  });
};