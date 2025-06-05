import { useMutation } from "@tanstack/react-query";
import apiOrder from "@/services/order/order.service";

export const useRemoveFromCart = () => {
  return useMutation({
    mutationFn: (data: any) => apiOrder.removeFromCart(data.id_cart),
  });
};
