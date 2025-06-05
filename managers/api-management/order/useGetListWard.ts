import apiOrder from "@/services/order/order.service";
import { useQuery } from "@tanstack/react-query";

export const useGetListWard = (district_id: string | undefined) => {
  const fetchListWard = async () => {
    if (!district_id) return { data: [] };
    
    const { data } = await apiOrder.getListWard(district_id);
    if (data ) {
      return data as any;
    } else {
      return undefined;
    }
  };

  return useQuery({
    queryKey: ["listWard", district_id],
    queryFn: fetchListWard,
    enabled: !!district_id,
  });
};
