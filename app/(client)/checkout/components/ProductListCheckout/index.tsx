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

interface ProductListCheckoutProps {
  products: Product[];
  updateQuantity: (id: number, newQuantity: number) => void;
  removeProduct: (id: number) => void;
}

const ProductListCheckout: React.FC<ProductListCheckoutProps> = ({
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
    <div className="w-full h-fit bg-white xl:rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold p-6">Danh sách sản phẩm</h2>
      <div className="divide-y divide-[#919EAB33] divide-dashed flex flex-col xl:gap-0 px-3 xl:px-0 pb-4">
        {products.map((product) => (
          <>
            <div key={product.id} className="xl:hidden flex flex-col">
              <div className="flex gap-4 pt-2 pb-3 px-1">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="object-cover w-16 h-16 rounded-xl"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-primary-new">
                    {product.name}
                  </p>

                  <div className="flex gap-2 justify-between items-center">
                    <span className="text-sm font-normal text-primary-new">
                      x{product.quantity}
                    </span>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-normal text-disable-50 line-through">
                        {product.price.toLocaleString()}{" "}
                        <span className="underline">đ</span>
                      </p>
                      <p className="text-base font-normal text-error-dark">
                        {product.price.toLocaleString()}{" "}
                        <span className="underline">đ</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 py-2 pl-5">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="object-cover w-12 h-12 rounded-xl"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-primary-new">
                    {product.name}
                  </p>

                  <div className="flex gap-2 justify-between items-center">
                    <span className="text-sm font-normal text-primary-new">
                      x{product.quantity}
                    </span>
                    <span className="px-2 py-0.5 w-fit rounded-full border border-error-dark text-error-dark text-xs font-normal">
                      Quà tặng
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div key={product.id} className="hidden xl:flex flex-col">
              <div className="flex items-center p-3">
                <div className="flex items-center w-full gap-4">
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
                <div className="flex-shrink-0 font-normal text-sm text-primary-new">
                  x{product.quantity}
                </div>

                <div className="w-[110px] px-2 text-right flex-shrink-0 font-normal text-sm text-primary-new">
                  {(product.price * product.quantity).toLocaleString()}{" "}
                  <span className="underline">đ</span>
                </div>
              </div>
              <div className="flex items-center py-3 pl-20">
                <div className="flex items-center w-full gap-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="object-cover w-12 h-12 rounded-xl"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-primary-new">
                      {product.name}
                    </p>
                    <span className="px-2 py-0.5 w-fit rounded-full border border-error-dark text-error-dark text-xs font-normal">
                      Quà tặng
                    </span>
                  </div>
                </div>
                <div className="pr-3 flex-shrink-0 font-normal text-sm text-primary-new">
                  x{product.quantity}
                </div>

                <div className="w-[110px] px-2 flex-shrink-0"></div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductListCheckout;
