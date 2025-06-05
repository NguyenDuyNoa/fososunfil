import apiOrder from "@/services/order/order.service";
import { useMutation } from "@tanstack/react-query";

export const usePostPromotionOrder = () => {
  return useMutation({
    mutationFn: apiOrder.postPromotionOrder,
  });
};