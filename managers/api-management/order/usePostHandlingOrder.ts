import apiOrder from "@/services/order/order.service";
import { OrderData, OrderResponse } from "@/types/order/IOrder";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface OrderStatus {
  isProcessing: boolean;
  isSuccess: boolean;
  isError: boolean;
  orderId: number | string | null;
}

export const usePostHandlingOrder = () => {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    isProcessing: false,
    isSuccess: false,
    isError: false,
    orderId: null,
  });

  const mutation = useMutation<OrderResponse, Error, OrderData>({
    mutationFn: apiOrder.postHandlingOrder,
    onMutate: () => {
      setOrderStatus({
        isProcessing: true,
        isSuccess: false,
        isError: false,
        orderId: null,
      });
    },
    onSuccess: (data) => {
      setOrderStatus({
        isProcessing: false,
        isSuccess: true,
        isError: false,
        orderId: data?.order_id || data?.id || null,
      });
      toast.success("Đặt hàng thành công!");
      // Kiểm tra kết quả và chuyển hướng nếu result = 1
      if (data?.data?.result === 1) {
        router.push("/successful-order");
      }
    },
    onError: (error) => {
      setOrderStatus({
        isProcessing: false,
        isSuccess: false,
        isError: true,
        orderId: null,
      });
      toast.error("Đặt hàng thất bại. Vui lòng thử lại sau!");
    },
  });

  return {
    ...mutation,
    orderStatus,
  };
};
