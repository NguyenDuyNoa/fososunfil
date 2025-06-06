import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiOrder from "@/services/order/order.service";
import { useToastStore } from "@/stores/useToastStore";

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();
  const { setToast } = useToastStore.getState();
  
  return useMutation({
    mutationFn: (data: any) =>
      apiOrder.updateCartQuantity(data.id_cart, data.quantity),
    onSuccess: (response) => {
      if (response.data && response.data.result === true) {
        setToast(true, "success", response.data.message || "Đã cập nhật số lượng", 2500);
      } else {
        setToast(true, "error", response.data?.message || "Không thể cập nhật số lượng", 2500);
      }
      queryClient.invalidateQueries({ queryKey: ["listCart"] });
    },
    onError: (error) => {
      setToast(true, "error", "Lỗi khi cập nhật số lượng", 2500);
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  });
};
