import apiHome from "@/services/home/home.services";
import { useQuery } from "@tanstack/react-query";

export const useGetListData = () => {
  const fetchListData = async () => {
    const { data } = await apiHome.getListData();
    if (data && data.result) {
        return data as any;
    } else {
        return undefined;
    }
  };

  return useQuery({
    queryKey: ["listData"],
    queryFn: fetchListData,
  });
};
