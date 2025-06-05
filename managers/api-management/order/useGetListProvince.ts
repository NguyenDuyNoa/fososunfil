import apiOrder from "@/services/order/order.service";
import { useQuery } from "@tanstack/react-query";

export const useGetListProvince = ( ) => {
  const fetchListProvince = async () => {
    const { data } = await apiOrder.getListProvince();
    if (data) {
        return data as any;
    } else {
        return undefined;
    }
  };

  return useQuery({
    queryKey: ["listProvince"],
    queryFn: fetchListProvince,
  });
};
