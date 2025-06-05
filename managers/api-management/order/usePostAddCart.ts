import apiOrder from "@/services/order/order.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostAddCart = (quantity: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item_id: number) =>
      apiOrder.addCart({ item_id: item_id, quantity: quantity}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
