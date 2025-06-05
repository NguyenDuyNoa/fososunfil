import { useMutation } from "@tanstack/react-query";
import apiOrder from "@/services/order/order.service";

export const useUpdateCartQuantity = () => {
  return useMutation({
    mutationFn: (data: any) =>
      apiOrder.updateCartQuantity(data.id_cart, data.quantity),
  });
};
