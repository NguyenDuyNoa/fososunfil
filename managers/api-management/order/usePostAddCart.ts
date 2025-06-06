import apiOrder from "@/services/order/order.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/stores/useToastStore";

export const usePostAddCart = (quantity: number) => {
  const queryClient = useQueryClient();
  const { setToast } = useToastStore.getState();

  return useMutation({
    mutationFn: (item_id: number) =>
      apiOrder.addCart({ item_id: item_id, quantity: quantity}),
    onSuccess: (response) => {
      if (response.data && response.data.result === true) {
        setToast(true, "success", response.data.message || "Đã thêm vào giỏ hàng", 2500);
      } else {
        setToast(true, "error", response.data?.message || "Không thể thêm vào giỏ hàng", 2500);
      }
      queryClient.invalidateQueries({ queryKey: ["listCart"] });
    },
    onError: (error) => {
      setToast(true, "error", "Lỗi khi thêm vào giỏ hàng", 2500);
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  });
};
