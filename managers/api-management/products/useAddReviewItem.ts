import { useMutation } from "@tanstack/react-query";
import apiProducts from "@/services/products/products.services";
import { toast } from "react-hot-toast";

export const useAddReviewItem = () => {
  return useMutation({
    mutationFn: apiProducts.addReviewItem,
    onSuccess: () => {
      toast.success("Đánh giá thành công");
    },
    onError: () => {
      toast.error("Đánh giá thất bại");
    },
  });
};
