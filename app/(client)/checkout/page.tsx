"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceHighlights from "@/components/serviceHighlights";
import StoreLocatorBanner from "@/components/storeLocatorBanner";
import { IMAGES } from "@/constants/Images";
import { usePostHandlingOrder } from "@/managers/api-management/order/usePostHandlingOrder";
import { useCartStore } from "@/stores/useCartStore";
import { useResizeStore } from "@/stores/useResizeStore";
import { OrderData } from "@/types/order/IOrder";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import OrderSummary from "../cart/components/OrderSummary";
import DeliveryInformation from "./components/DeliveryInformation";
import ProductListCheckout from "./components/ProductListCheckout";

const breadcrumbs = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Giỏ hàng",
    href: "/cart",
  },
  {
    label: "Thanh toán",
    href: "/checkout",
  },
];

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

const CheckoutPage = () => {
  const { isVisibleMobile, isVisibleTablet } = useResizeStore();
  const deliveryInfoRef = useRef<any>(null);
  const { items, fetchCart } = useCartStore();
  const [products, setProducts] = useState<any[]>([]);

   // Sử dụng API từ store để lấy dữ liệu giỏ hàng
   useEffect(() => {
    const loadCart = async () => {
      await fetchCart();
    };
    loadCart();
  }, []);

  // Cập nhật state products khi items thay đổi
  useEffect(() => {
    setProducts(items as any);
  }, [items]);
  
  const {
    mutate: handleOrder,
    isPending,
    orderStatus,
  } = usePostHandlingOrder();

  // Hàm xử lý đặt hàng
  const handlePlaceOrder = () => {
    if (!deliveryInfoRef.current) {
      toast.error("Không thể lấy thông tin giao hàng");
      return;
    }

    const deliveryInfo = deliveryInfoRef.current.getDeliveryInfo();

    if (!deliveryInfo) {
      toast.error("Vui lòng điền đầy đủ thông tin giao hàng");
      return;
    }

    const { customerName, phone, email, province, district, ward, address , note} =
      deliveryInfo;

    // Tạo dữ liệu đơn hàng
    const orderData: OrderData = {
      customer_name_delivery: customerName,
      phone_delivery: phone,
      email_delivery: email || "",
      province_delivery: province,
      district_delivery: district,
      ward_delivery: ward,
      address_delivery: address,
      promotion: [], // Mã khuyến mãi
      cost_delivery: 0,
      discount_percent: 0,
      discount_direct: 0,
      note: note || "",
      type_bills: deliveryInfo.needInvoice ? 1 : 0,
      items: [
        ...products.map((product) => ({
          item_id: product.item_id,
          quantity: product.quantity,
          price: product.price,
          discount_percent_item: product.discount,
          promotion_item_gift_id: product.promotion_item_gift_id,
          psi_gift_id: product.psi_gift_id,
        })),
        ...products.flatMap((product) =>
          product.children && product.children.length > 0
            ? product.children.map((child: any) => ({
                item_id: child.item_id,
                quantity: child.quantity,
                price: child.price,
                discount_percent_item: child.discount,
                promotion_item_gift_id: child.promotion_item_gift_id,
                psi_gift_id: child.psi_gift_id,
              }))
            : []
        ),
      ],
    };

    // Gọi hàm xử lý đơn hàng
    handleOrder(orderData, {
      onSuccess: (data) => {
        console.log(data)
        // Kiểm tra kết quả trả về và gọi fetchCart nếu result = 1
        if (data?.data?.result == true) {
          fetchCart();
        }
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 xl:gap-8 pt-4 xl:pt-6">
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      {products.length > 0 ? (
        <div
          className={`flex flex-col xl:flex-row gap-4 xl:gap-6 2xl:gap-10 w-full ${
            isVisibleMobile || isVisibleTablet ? "" : "container"
          }`}
        >
          <div className="flex flex-col gap-4 xl:gap-6 w-full xl:w-[75%]">
            <ProductListCheckout products={products} />
            <DeliveryInformation ref={deliveryInfoRef} />
          </div>

          <OrderSummary
            products={products}
            type="checkout"
            onClick={handlePlaceOrder}
            isLoading={orderStatus.isProcessing}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center gap-9 w-full">
            <Image
              src={IMAGES.cartEmpty}
              alt="cartEmpty"
              width={480}
              height={360}
            />
            <div className="flex flex-col gap-3 items-center">
              <h3 className="text-2xl leading-7 font-semibold text-primary-new">
                Giỏ hàng trống
              </h3>
              <p className="text-secondary-new text-base font-normal">
                Bạn chưa có sản phẩm nào trong giỏ hàng.
              </p>
            </div>
            <Link
              href="/"
              className="w-[480px] text-center bg-brand-500 text-base font-bold text-white px-4 py-3 rounded-lg"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
          <div className="container">
            <ServiceHighlights />
          </div>
        </>
      )}

      <StoreLocatorBanner />
    </div>
  );
};

export default CheckoutPage;
