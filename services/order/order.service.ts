import { OrderData, OrderResponse } from "@/types/order/IOrder";
import axios from "@/utils/axios/axios-customize";

const apiOrder = {
  //Lấy khuyến mãi
  postPromotionOrder(data: any) {
    return axios.post("/api_web/Api_order/getPromotionOrder", data);
  },

  //Xử lý đơn hàng
  postHandlingOrder(data: OrderData): Promise<OrderResponse> {
    return axios.post("/api_web/Api_order/handlingOrder", data);
  },

  //Lấy danh sách tỉnh thành
  getListProvince() {
    return axios.get(`/api_web/Api_category_product/getListProvince`);
  },

  getListDistrict(province_id: string) {
    return axios.get(
      `/api_web/Api_category_product/getListDistrict?province_id=${province_id}`
    );
  },

  getListWard(district_id: string) {
    return axios.get(
      `/api_web/Api_category_product/getListWard?district_id=${district_id}`
    );
  },

  addCart(data: any) {
    return axios.post(`/api_web/Api_order/add_cart`, data);
  },

  getListCart() {
    return axios.get("/api_web/Api_order/getListCart");
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartQuantity(id: string | number, quantity: number) {
    return axios.post(`/api_web/Api_order/updateQuantityItemCart`, {
      id_cart: id,
      quantity: quantity,
    });
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(id: string | number) {
    return axios.get(`/api_web/Api_order/deleteItemCart?id_cart=${id}`);
  },

  getHistoryListOrder(data: any, page: number = 1, limit: number = 10) {
    return axios.post("/api_web/Api_order/getListOrder", {
      ...data,
      page,
      limit,
    });
  },
};

export default apiOrder;
