import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  products: Product[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ products }) => {
  // Tính tổng tiền
  const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  
  // Giả sử chưa có giảm giá
  const discount = 0;
  
  // Thành tiền sau giảm giá
  const finalPrice = totalPrice - discount;

  return (
    <div className="sticky top-24 w-full xl:w-[25%] h-fit rounded-xl shadow-md bg-white
                before:content-[''] xl:before:absolute before:bottom-[64px] before:-left-5 before:-translate-y-1/2 before:border-r before:border-grey-300
                    before:w-8 before:h-8 before:bg-[#F4F6F8] before:rounded-full before:z-50
                    after:content-[''] xl:after:absolute after:bottom-[64px] after:-right-5 after:-translate-y-1/2 after:border-l after:border-grey-300
                    after:w-8 after:h-8 after:bg-[#F4F6F8] after:rounded-full after:z-50">
      <h2 className="text-xl font-semibold p-6 text-primary-new">
        Tóm tắt đơn hàng
      </h2>

      <div className="flex flex-col gap-4 px-6 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary-new text-sm font-normal">Tổng tiền</span>
          <span className="text-primary-new text-sm font-normal">
            {totalPrice.toLocaleString()} <span className="underline">đ</span>
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary-new text-sm font-normal">Giảm giá</span>
          <span className="text-primary-new text-sm font-normal">
            {discount > 0 ? `${discount.toLocaleString()} đ` : "-"}
          </span>
        </div>
        <div className="border-t border-[#919EAB33] border-dashed pt-4 flex justify-between items-center text-base font-semibold">
          <span className="font-xl font-semibold text-primary-new">Thành tiền</span>
          <span className="text-error-main text-xl font-semibold">
            {finalPrice.toLocaleString()} <span className="underline">đ</span>
          </span>
        </div>
      </div>

      <div className="mt-6 mx-6 px-3 border border-[#919EAB33] rounded">
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
      </div>

      <div className="mt-6 px-6 pb-6 border-t border-[#919EAB33] border-dashed ">
        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base font-bold text-center">
          Mua hàng
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
