export interface OrderItem {
  item_id: number;
  quantity: number;
  price: number;
  discount_percent_item: string;
  promotion_item_gift_id: number;
  psi_gift_id: number;
}

export interface OrderData {
  customer_name_delivery: string;
  phone_delivery: string;
  email_delivery: string;
  province_delivery: string;
  district_delivery: string;
  ward_delivery: string;
  address_delivery: string;
  promotion: number[];
  cost_delivery: number;
  discount_percent: number;
  discount_direct: number;
  items: OrderItem[];
  type_bills: number;
}

export interface OrderResponse {
  order_id?: number | string;
  status?: string;
  message?: string;
  [key: string]: any;
}
