import apiOrder from "@/services/order/order.service";
import { useQuery } from "@tanstack/react-query";

// Tách hàm xử lý dữ liệu giỏ hàng để tái sử dụng
export const processCartData = (data: any) => {
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
    
    return {
      items: cartItems,
      totalItems,
      totalPrice
    };
  } else {
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0
    };
  }
};

export const useGetListCart = () => {
  const fetchListCart = async () => {
    const { data } = await apiOrder.getListCart();
    return processCartData(data);
  };
  
  return useQuery({
    queryKey: ["listCart"],
    queryFn: fetchListCart,
  });
};