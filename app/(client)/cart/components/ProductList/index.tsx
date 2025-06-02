"use client";
import React from "react";
import Image from "next/image";
import CloseIcon from "@/components/icons/CloseIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ProductListProps {
  products: Product[];
  updateQuantity: (id: number, newQuantity: number) => void;
  removeProduct: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  updateQuantity,
  removeProduct,
}) => {
  const increaseQuantity = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      updateQuantity(id, product.quantity + 1);
    }
  };

  const decreaseQuantity = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product && product.quantity > 1) {
      updateQuantity(id, product.quantity - 1);
    }
  };

  const handleQuantityChange = (
    id: number,
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
          products.map((product) => (
            <>
              <div className="flex gap-2 px-4 xl:hidden">
                <div className="flex gap-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="object-cover w-16 h-16 rounded-xl"
                  />
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-semibold text-primary-new">
                        {product.name}
                      </p>
                      <div className="w-[100px] p-4 flex-shrink-0 font-normal text-sm text-primary-new">
                        Đơn giá: {product.price.toLocaleString()} đ
                      </div>
                    </div>
                    <div className="flex gap-2 justify-between">
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
                    </div>
                  </div>
                </div>
                <button
                  className="bg-grey-200 rounded p-1.5 hover:bg-gray-200 transition-all duration-300 group"
                  onClick={() => removeProduct(product.id)}
                >
                  <CloseIcon className="text-primary-new group-hover:text-red-400 transition-all duration-300" />
                </button>
              </div>

              <div key={product.id} className="hidden xl:flex items-center">
                <div className="flex items-center w-full p-4 gap-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="object-cover w-16 h-16 rounded-xl"
                  />
                  <p className="text-sm font-semibold text-primary-new">
                    {product.name}
                  </p>
                </div>
                <div className="w-[100px] p-4 flex-shrink-0 font-normal text-sm text-primary-new">
                  {product.price.toLocaleString()} đ
                </div>
                <div className="w-[130px] p-4 flex-shrink-0">
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
                </div>
                <div className="w-[110px] p-4 flex-shrink-0 font-normal text-sm text-primary-new">
                  {(product.price * product.quantity).toLocaleString()}đ
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
            </>
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
