import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";

interface Product {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  price_discount?: number;
  type_gift?: number;
}

interface OrderSummaryProps {
  products: Product[];
  type: "cart" | "checkout";
  onClick?: () => void;
  isLoading?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  products,
  type,
  onClick,
  isLoading = false,
}) => {
  const [bottomPosition, setBottomPosition] = useState<number>(128);
  const summaryRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Tính tổng tiền
  const totalPrice = products.reduce(
    (sum, product) => sum + (product.type_gift == 0 ? (product.price_discount || 0) * product.quantity : 0),
    0
  );

  // Giả sử chưa có giảm giá
  const discount = 0;

  // Thành tiền sau giảm giá
  const finalPrice = totalPrice - discount;

  useEffect(() => {
    if (summaryRef.current && footerRef.current) {
      const calculatePosition = () => {
        const footerHeight = footerRef.current?.offsetHeight || 0;
        setBottomPosition(footerHeight - 32);
      };

      calculatePosition();

      // Sử dụng ResizeObserver để theo dõi thay đổi kích thước
      const resizeObserver = new ResizeObserver(calculatePosition);
      resizeObserver.observe(footerRef.current);

      return () => {
        if (footerRef.current) {
          resizeObserver.unobserve(footerRef.current);
        }
        resizeObserver.disconnect();
      };
    }
  }, [type, products]);

  return (
    <div
      ref={summaryRef}
      className={`sticky top-24 w-full xl:w-[25%] h-fit xl:rounded-xl shadow-md bg-white
                before:content-[''] xl:before:absolute before:-left-5 before:-translate-y-1/2 before:border-r before:border-grey-300
                    before:w-8 before:h-8 before:bg-[#F4F6F8] before:rounded-full before:z-50 xl:before:bottom-[var(--bottom-position)]
                    after:content-[''] xl:after:absolute after:-right-5 after:-translate-y-1/2 after:border-l after:border-grey-300
                    after:w-8 after:h-8 after:bg-[#F4F6F8] after:rounded-full after:z-50 xl:after:bottom-[var(--bottom-position)]`}
      style={
        {
          "--bottom-position": `${bottomPosition}px`,
        } as React.CSSProperties
      }
    >
      <h2 className="text-xl font-semibold p-6 text-primary-new">
        Tóm tắt đơn hàng
      </h2>

      <div className="flex flex-col gap-4 px-6 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary-new text-sm font-normal">
            Tổng tiền
          </span>
          <span className="text-primary-new text-sm font-normal">
            {totalPrice.toLocaleString()} <span className="underline">đ</span>
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary-new text-sm font-normal">
            Giảm giá
          </span>
          <span className="text-primary-new text-sm font-normal">
            {discount > 0 ? `${discount.toLocaleString()} đ` : "-"}
          </span>
        </div>
        {type === "checkout" && (
          <div className="flex justify-between">
            <span className="text-secondary-new text-sm font-normal">
              Phí vận chuyển
            </span>
            <span className="text-primary-new text-sm font-normal gap-2 flex">
              {/* <span className="line-through text-disable-50">32.000 đ</span>{" "} */}
              Miễn phí
            </span>
          </div>
        )}

        <div className="border-t border-[#919EAB33] border-dashed pt-4 flex justify-between items-center text-base font-semibold">
          <span className="font-xl font-semibold text-primary-new">
            Thành tiền
          </span>
          <span className="text-error-main text-xl font-semibold">
            {finalPrice.toLocaleString()} <span className="underline">đ</span>
          </span>
        </div>
      </div>

      {/* <div className="mt-6 mx-6 px-3 border border-[#919EAB33] rounded">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            className="w-full py-[15px] text-base font-normal focus:outline-none"
          />
          <button className="whitespace-nowrap text-brand-700 font-bold text-sm hover:underline">
            Áp dụng
          </button>
        </div>
      </div> */}

      <div
        className="hidden xl:flex mt-6 p-6 border-t border-[#919EAB33] border-dashed flex-col gap-6"
        ref={footerRef}
      >
        {type === "checkout" && (
          <p className="text-sm font-medium text-secondary-new">
            Bằng việc tiến hành đặt mua hàng, bạn đã đồng ý với{" "}
            <Link href="#" className="text-brand-500">
              Điều khoản dịch vụ{" "}
            </Link>
            của SUNFIL1.
          </p>
        )}
        <button
          onClick={onClick}
          disabled={isLoading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base font-bold text-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading
            ? "Đang xử lý..."
            : type === "cart"
            ? "Mua hàng"
            : "Đặt hàng"}
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white xl:hidden py-[18px] px-5 flex justify-between items-center gap-2.5 rounded-t-xl shadow-[0_4px_32px_0_#00000028]">
        <div className="flex flex-col gap-2">
          <span className="text-secondary-new text-base leading-4 font-medium">
            Tổng thanh toán
          </span>
          <p className="text-error-main text-xl leading-5 font-semibold">
            {totalPrice.toLocaleString()} <span className="underline">đ</span>
          </p>
        </div>
        <button
          onClick={onClick}
          disabled={isLoading}
          className={`whitespace-nowrap h-fit py-3.5 px-9 bg-brand-500 hover:bg-brand-700 text-white rounded-lg text-base font-bold text-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading
            ? "Đang xử lý..."
            : type === "cart"
            ? "Mua hàng"
            : "Đặt hàng"}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
