import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiOrder from "@/services/order/order.service";
import { useToastStore } from "@/stores/useToastStore";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { setToast } = useToastStore.getState();
  
  return useMutation({
    mutationFn: (data: any) => apiOrder.removeFromCart(data.id_cart),
    onSuccess: (response) => {
      if (response.data && response.data.result === true) {
        setToast(true, "success", response.data.message || "Đã xóa sản phẩm", 2500);
      } else {
        setToast(true, "error", response.data?.message || "Không thể xóa sản phẩm", 2500);
      }
      queryClient.invalidateQueries({ queryKey: ["listCart"] });
    },
    onError: (error) => {
      setToast(true, "error", "Lỗi khi xóa sản phẩm", 2500);
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  });
};
