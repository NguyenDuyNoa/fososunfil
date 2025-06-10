import apiOrder from "@/services/order/order.service";
import { ICartStore } from "@/types/cart/ICart";
import { create } from "zustand";
import { useToastStore } from "./useToastStore";
import { useRouter } from "next/navigation";

const { setToast } = useToastStore.getState();

export const useCartStore = create<ICartStore>()((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isCartOpen: false,
  isLoading: false,
  shouldRedirectToCart: false,

  // Các phương thức UI
  toggleCart: () =>
    set((state) => ({
      isCartOpen: !state.isCartOpen,
    })),

  closeCart: () => set({ isCartOpen: false }),

  openCart: () => set({ isCartOpen: true }),

  resetRedirect: () => set({ shouldRedirectToCart: false }),

  // Các phương thức API
  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const { data } = await apiOrder.getListCart();
      if (data && data.arrItemList) {
        const cartItems = data.arrItemList;

        const totalItems = cartItems.reduce(
          (total: number, item: any) => total + parseInt(item.quantity || 1),
          0
        );

        const totalPrice = cartItems.reduce((total: number, item: any) => {
          const price =
            parseFloat(item.price_discount || 0) > 0
              ? parseFloat(item.price_discount || 0)
              : parseFloat(item.price || 0);
          return total + price * parseInt(item.quantity || 1);
        }, 0);

        set({
          items: cartItems,
          totalItems,
          totalPrice,
          isLoading: false,
        });

        return cartItems;
      }
      set({ isLoading: false });
      return [];
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
      set({ isLoading: false });
      return [];
    }
  },

  addToCartAPI: async (productId, quantity = 1) => {
    set({ isLoading: true });
    try {
      const response = await apiOrder.addCart({ item_id: productId, quantity });
      if (response.data && response.data.result === true) {
        setToast(true, "success", "Thành công", 2500, response?.data?.message);
        await get().fetchCart();
        set({ isCartOpen: true });
      } else {
        setToast(true, "error", "Có lỗi xảy ra", 2500, response?.data?.message);
        set({ isLoading: false });
      }

      return true;
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      setToast(true, "error", "Không thể thêm sản phẩm vào giỏ hàng", 2500, "");
      set({ isLoading: false });
      return false;
    }
  },

  addToCartBuyNow: async (productId, quantity = 1) => {
    set({ isLoading: true });
    try {
      const response = await apiOrder.addCart({ item_id: productId, quantity });
      if (response.data && response.data.result === true) {
        setToast(true, "success", "Thành công", 2500, response?.data?.message);
        await get().fetchCart();
        set({ shouldRedirectToCart: true });
      } else {
        setToast(true, "error", "Có lỗi xảy ra", 2500, response?.data?.message);
        set({ isLoading: false });
      }

      return true;
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      setToast(true, "error", "Không thể thêm sản phẩm vào giỏ hàng", 2500, "");
      set({ isLoading: false });
      return false;
    }
  },

  updateQuantityAPI: async (productId, quantity) => {
    try {
      const response = await apiOrder.updateCartQuantity(productId, quantity);

      if (response.data && response.data.result === true) {
        // Chỉ lấy dữ liệu mới mà không đặt isLoading = true
        const { data } = await apiOrder.getListCart();
        if (data && data.arrItemList) {
          const cartItems = data.arrItemList;

          const totalItems = cartItems.reduce(
            (total: number, item: any) => total + parseInt(item.quantity || 1),
            0
          );

          const totalPrice = cartItems.reduce((total: number, item: any) => {
            const price =
              parseFloat(item.price_discount || 0) > 0
                ? parseFloat(item.price_discount || 0)
                : parseFloat(item.price || 0);
            return total + price * parseInt(item.quantity || 1);
          }, 0);

          set({
            items: cartItems,
            totalItems,
            totalPrice,
          });
        }
      }

      return true;
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
      return false;
    }
  },

  removeFromCartAPI: async (productId) => {
    set({ isLoading: true });
    try {
      const response = await apiOrder.removeFromCart(productId);

      if (response.data && response.data.result === true) {
        setToast(true, "success", "Thành công", 2500, response?.data?.message);
        await get().fetchCart();
      } else {
        setToast(true, "error", "Thất bại", 2500, response?.data?.message);
        set({ isLoading: false });
      }

      return true;
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      setToast(true, "error", "Có lỗi xảy ra", 2500);
      set({ isLoading: false });
      return false;
    }
  },
}));
