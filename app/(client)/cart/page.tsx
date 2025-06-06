"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceHighlights from "@/components/serviceHighlights";
import StoreLocatorBanner from "@/components/storeLocatorBanner";
import { IMAGES } from "@/constants/Images";
import { useCartStore } from "@/stores/useCartStore";
import { useResizeStore } from "@/stores/useResizeStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import OrderSummary from "./components/OrderSummary";
import ProductList from "./components/ProductList";

const breadcrumbItems = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Giỏ hàng",
    href: "/cart",
  },
];

interface Product {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  children?: Product[];
  gift?: number;
}

const CartPage = () => {
  const router = useRouter();
  const { isVisibleMobile, isVisibleTablet } = useResizeStore();
  const { items, isLoading, fetchCart, updateQuantityAPI, removeFromCartAPI } =
    useCartStore();
  const [products, setProducts] = useState<Product[]>(items as any);
  const [loadingItems, setLoadingItems] = useState<
    Record<string | number, boolean>
  >({});
  
  // Sử dụng useRef để lưu trữ các timeout cho debounce
  const timeoutRef = useRef<Record<string | number, NodeJS.Timeout>>({});

  // Sử dụng API từ store để lấy dữ liệu giỏ hàng
  useEffect(() => {
    const loadCart = async () => {
      await fetchCart();
    };
    loadCart();
  }, [fetchCart]);

  // Cập nhật state products khi items thay đổi
  useEffect(() => {
    setProducts(items as any);
  }, [items]);

  // Hàm cập nhật số lượng sản phẩm với debounce
  const updateProductQuantity = async (
    id: number | string,
    newQuantity: number
  ) => {
    try {
      // Đánh dấu sản phẩm đang được cập nhật
      setLoadingItems((prev) => ({ ...prev, [id]: true }));

      // Cập nhật số lượng cục bộ trước để UI phản hồi ngay lập tức
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === id ? { ...product, quantity: newQuantity } : product
        )
      );

      // Xóa timeout cũ nếu có
      if (timeoutRef.current[id]) {
        clearTimeout(timeoutRef.current[id]);
      }

      // Tạo timeout mới để gọi API sau 500ms
      timeoutRef.current[id] = setTimeout(async () => {
        try {
          // Gọi API để cập nhật số lượng
          await updateQuantityAPI(id, newQuantity);
        } catch (error) {
          console.error("Lỗi khi cập nhật số lượng:", error);
        } finally {
          // Kết thúc trạng thái loading cho sản phẩm
          setLoadingItems((prev) => ({ ...prev, [id]: false }));
        }
      }, 500);
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Hàm xóa sản phẩm
  const removeProduct = async (id: number | string) => {
    try {
      // Đánh dấu sản phẩm đang được xóa
      setLoadingItems((prev) => ({ ...prev, [id]: true }));
      await removeFromCartAPI(id);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Xóa các timeout khi component unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRef.current).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, []);

  return (
    <div className="flex flex-col gap-8 pt-6">
      <div className="container">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : products?.length > 0 ? (
        <div
          className={`flex flex-col xl:flex-row gap-10 w-full ${
            isVisibleMobile || isVisibleTablet ? "" : "container"
          }`}
        >
          <ProductList
            products={products}
            updateQuantity={updateProductQuantity}
            removeProduct={removeProduct}
          />
          <OrderSummary
            products={products}
            type="cart"
            onClick={() => router.push("/checkout")}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center gap-9 w-full container">
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
              className="w-full xl:w-[480px] text-center bg-brand-500 text-base font-bold text-white px-4 py-3 rounded-lg"
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

export default CartPage;
