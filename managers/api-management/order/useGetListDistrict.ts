import apiOrder from "@/services/order/order.service";
import { useQuery } from "@tanstack/react-query";

export const useGetListDistrict = (province_id: string | undefined) => {
  const fetchListDistrict = async () => {
    if (!province_id) return { data: [] };
    
    const { data } = await apiOrder.getListDistrict(province_id);
    if (data) {
        return data as any;
    } else {
        return undefined;
    }
  };

  return useQuery({
    queryKey: ["listDistrict", province_id],
    queryFn: fetchListDistrict,
    enabled: !!province_id,
  });
};
