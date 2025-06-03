"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceHighlights from "@/components/serviceHighlights";
import StoreLocatorBanner from "@/components/storeLocatorBanner";
import { IMAGES } from "@/constants/Images";
import { useResizeStore } from "@/stores/useResizeStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import OrderSummary from "../cart/components/OrderSummary";
import ProductList from "../cart/components/ProductList";
import DeliveryInformation from "./components/DeliveryInformation";
import ProductListCheckout from "./components/ProductListCheckout";

const items = [
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

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CheckoutPage = () => {
  const { isVisibleMobile, isVisibleTablet } = useResizeStore();

  // Dữ liệu sản phẩm mẫu
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer (52046262)",
      price: 299000,
      quantity: 2,
      image: IMAGES.product,
    },
    {
      id: 2,
      name: "Lọc nhớt Oil Filter - Chevrolet Cruze, Orlando, Captiva (93745067)",
      price: 159000,
      quantity: 1,
      image: IMAGES.product1,
    },
    {
      id: 3,
      name: "Bugi Iridium - Chevrolet Spark (96964137)",
      price: 235000,
      quantity: 3,
      image: IMAGES.product2,
    },
    {
      id: 4,
      name: "Bugi Iridium - Chevrolet Spark (96964137)",
      price: 235000,
      quantity: 3,
      image: IMAGES.product4,
    },
    {
      id: 5,
      name: "Bugi Iridium - Chevrolet Spark (96964137)",
      price: 235000,
      quantity: 3,
      image: IMAGES.product5,
    },
  ]);

  // Hàm cập nhật số lượng sản phẩm
  const updateProductQuantity = (id: number, newQuantity: number) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  // Hàm xóa sản phẩm
  const removeProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 xl:gap-8 pt-4 xl:pt-6">
      <div className="container">
        <Breadcrumbs items={items} />
      </div>
      {products.length > 0 ? (
        <div
          className={`flex flex-col xl:flex-row gap-4 xl:gap-10 w-full ${
            isVisibleMobile || isVisibleTablet ? "" : "container"
          }`}
        >
          <div className="flex flex-col gap-4 xl:gap-6 w-full xl:w-[75%]">
            <ProductListCheckout
              products={products}
              updateQuantity={updateProductQuantity}
              removeProduct={removeProduct}
            />
            <DeliveryInformation />
          </div>

          <OrderSummary products={products} type="checkout" />
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
