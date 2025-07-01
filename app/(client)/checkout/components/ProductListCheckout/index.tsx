"use client";
import Image from "next/image";
import React from "react";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

interface ProductListCheckoutProps {
  products: any[];
}

const ProductListCheckout: React.FC<ProductListCheckoutProps> = ({
  products,
}) => {
  return (
    <div className="w-full h-fit bg-white xl:rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold p-6">Danh sách sản phẩm</h2>
      <div className="divide-y divide-[#919EAB33] divide-dashed flex flex-col xl:gap-0 px-3 xl:px-0 pb-4">
        {products.map((product) => (
          <React.Fragment key={product.id}>
            <div className="xl:hidden flex flex-col">
              <div className="flex gap-4 pt-2 pb-3 px-1">
                <Image
                  src={product.images}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="object-cover w-16 h-16 rounded-xl"
                />
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-sm font-semibold text-primary-new">
                    {product.name}
                  </p>

                  <div className="flex gap-2 justify-between items-center">
                    <span className="text-sm font-normal text-primary-new">
                      x{product.quantity}
                    </span>
                    <div className="flex items-center gap-2">
                      {product.price_discount !== product.price && (
                        <p className="text-xs font-normal text-disable-50 line-through">
                          {Number(product.price_discount).toLocaleString()}{" "}
                          <span className="underline">đ</span>
                        </p>
                      )}
                      <p className="text-base font-normal text-error-dark">
                        {Number(product.price).toLocaleString()}{" "}
                        <span className="underline">đ</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {product.children &&
                product.children.map((child: any) => (
                  <div className="flex gap-4 py-2 pl-5">
                    <Image
                      src={child.images}
                      alt={child.name}
                      width={48}
                      height={48}
                      className="object-cover w-12 h-12 rounded-xl"
                    />
                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-sm font-semibold text-primary-new">
                        {child.name}
                      </p>

                      <div className="flex gap-2 justify-between items-center">
                        <span className="text-sm font-normal text-primary-new">
                          x{child.quantity}
                        </span>
                        <span className="px-2 py-0.5 w-fit rounded-full border border-error-dark text-error-dark text-xs font-normal">
                          Quà tặng
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="hidden xl:flex flex-col">
              <div className="flex items-center p-3">
                <div className="flex items-center w-full gap-4">
                  <Image
                    src={product.images}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="object-cover w-16 h-16 rounded-xl"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-primary-new">
                      {product.name}
                    </p>
                    {product.type_gift == 1 && (
                      <span className="px-2 py-0.5 w-fit rounded-full border border-error-dark text-error-dark text-xs font-normal">
                        Quà tặng
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 font-normal text-sm text-primary-new">
                  x{product.quantity}
                </div>
                {product.type_gift == 0 ? (
                  <div className="w-[110px] px-2 text-right flex-shrink-0 font-normal text-sm text-primary-new">
                    {(
                      product.price_discount * product.quantity
                    ).toLocaleString()}{" "}
                    <span className="underline">đ</span>
                  </div>
                ):(
                  <div className="w-[110px] flex-shrink-0">
                   
                  </div>
                )}
              </div>
              {product.children &&
                product.children.map((child: any) => (
                  <div className="flex items-center py-3 pl-20">
                    <div className="flex items-center w-full gap-4">
                      <Image
                        src={child.images}
                        alt={child.name}
                        width={48}
                        height={48}
                        className="object-cover w-12 h-12 rounded-xl"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-primary-new">
                          {child.name}
                        </p>
                        <span className="px-2 py-0.5 w-fit rounded-full border border-error-dark text-error-dark text-xs font-normal">
                          Quà tặng
                        </span>
                      </div>
                    </div>
                    <div className="pr-3 flex-shrink-0 font-normal text-sm text-primary-new">
                      x{child.quantity}
                    </div>

                    <div className="w-[110px] px-2 flex-shrink-0"></div>
                  </div>
                ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductListCheckout;
