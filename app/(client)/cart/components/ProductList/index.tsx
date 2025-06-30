"use client";
import React from "react";
import Image from "next/image";
import CloseIcon from "@/components/icons/CloseIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";

// interface Product {
//   id: number | string;
//   name: string;
//   price: number;
//   quantity: number;
//   images: string;
//   price_discount?: number;
// }

interface ProductListProps {
  products: any[];
  updateQuantity: (id: number | string, newQuantity: number) => void;
  removeProduct: (id: number | string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  updateQuantity,
  removeProduct,
}) => {
  const increaseQuantity = (id: number | string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      updateQuantity(id, Number(product.quantity) + 1);
    }
  };

  const decreaseQuantity = (id: number | string) => {
    const product = products.find((p) => p.id === id);
    if (product && product.quantity > 1) {
      updateQuantity(id, product.quantity - 1);
    }
  };

  const handleQuantityChange = (
    id: number | string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      updateQuantity(id, value);
    } else if (e.target.value === "") {
      updateQuantity(id, 1);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="w-full xl:w-[75%] h-fit bg-white xl:rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold p-6">Danh sách sản phẩm</h2>
      <div className="hidden xl:flex bg-grey-100">
        <div className="text-sm font-semibold text-secondary-new w-full p-4">
          Sản phẩm
        </div>
        <div className="text-sm font-semibold text-secondary-new w-[100px] p-4 flex-shrink-0">
          Đơn giá
        </div>
        <div className="text-sm font-semibold text-secondary-new w-[130px] p-4 flex-shrink-0">
          Số lượng
        </div>
        <div className="text-sm font-semibold text-secondary-new w-[110px] p-4 flex-shrink-0">
          Thành tiền
        </div>
        <div className="text-sm font-semibold text-secondary-new w-[68px] p-4 flex-shrink-0"></div>
      </div>
      <div className="divide-y divide-[#919EAB33] divide-dashed flex flex-col gap-3 xl:gap-0 px-3 xl:px-0">
        {products.length > 0 ? (
          products.filter(product => product.type_gift == 0).map((product) => (
            <React.Fragment key={product.id}>
              <div className="flex gap-2 py-4 xl:hidden">
                <div className="flex gap-3 w-full">
                  <Image
                    src={product.images}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="object-cover w-16 h-16 rounded-xl"
                  />
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-semibold text-[#36443F]">
                        {product.name}
                      </p>
                      <div className="font-medium text-sm text-disable-50">
                        Đơn giá:{" "}
                        <span className="text-error-dark text-base font-semibold">
                          {Number(product?.price_discount)?.toLocaleString()} đ
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                      <div className="h-[34px] p-1 flex items-center border border-[#919EAB33] rounded-full">
                        <button
                          className="p-1"
                          onClick={() => decreaseQuantity(product.id)}
                        >
                          <MinusIcon className="size-4" />
                        </button>
                        <input
                          type="text"
                          className="w-10 text-center text-sm font-semibold text-primary-new focus:outline-none"
                          value={product.quantity}
                          onChange={(e) => handleQuantityChange(product.id, e)}
                          onFocus={handleFocus}
                        />
                        <button
                          className="p-1"
                          onClick={() => increaseQuantity(product.id)}
                        >
                          <PlusIcon className="size-4" />
                        </button>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-secondary-new">
                          Thành tiền:
                        </p>
                        <p className="text-sm font-medium text-primary-new">
                          {(product.price * product.quantity).toLocaleString()}{" "}
                          <span className="underline">đ</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="bg-grey-200 rounded p-1.5 hover:bg-gray-200 transition-all duration-300 group w-fit h-fit"
                  onClick={() => removeProduct(product.id)}
                >
                  <CloseIcon className="text-primary-new group-hover:text-red-400 transition-all duration-300" />
                </button>
              </div>

              <div className="hidden xl:flex items-center hover:bg-grey-200 transition-all duration-300">
                <div className="flex items-center w-full p-4 gap-4">
                  <Image
                    src={product.images}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="object-cover w-16 h-16 rounded-xl"
                  />
                  <p className="text-sm font-semibold text-primary-new">
                    {product.name}
                  </p>
                </div>
                <div className="w-[100px] p-4 flex-shrink-0 font-normal text-sm text-primary-new whitespace-nowrap">
                  {Number(product?.price_discount)?.toLocaleString()} đ
                </div>
                <div className="w-[130px] p-4 flex-shrink-0">
                  <div className="h-[34px] p-1 flex items-center border border-[#919EAB33] rounded-full">
                    <button
                      className="p-1 group rounded-full hover:bg-white transition-all duration-300"
                      onClick={() => decreaseQuantity(product.id)}
                    >
                      <MinusIcon className="size-4" />
                    </button>
                    <input
                      type="text"
                      className="w-10 text-center text-sm font-semibold text-primary-new focus:outline-none bg-transparent"
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(product.id, e)}
                      onFocus={handleFocus}
                    />
                    <button
                      className="p-1 group rounded-full hover:bg-white transition-all duration-300"
                      onClick={() => increaseQuantity(product.id)}
                    >
                      <PlusIcon className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="w-[110px] p-4 flex-shrink-0 font-normal text-sm text-primary-new whitespace-nowrap">
                  {(product.price_discount * product.quantity).toLocaleString()}{" "}
                  <span className="underline">đ</span>
                </div>
                <div className="w-[68px] p-4 flex-shrink-0">
                  <button
                    className="bg-grey-200 rounded p-1.5 hover:bg-gray-200 transition-all duration-300 group"
                    onClick={() => removeProduct(product.id)}
                  >
                    <CloseIcon className="text-primary-new group-hover:text-red-400 transition-all duration-300" />
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))
        ) : (
          <div className="p-6 text-center text-secondary-new">
            Giỏ hàng của bạn đang trống
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
