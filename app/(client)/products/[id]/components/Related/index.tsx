import ProductCard from "@/components/productCard";
import React from "react";
import { IMAGES } from "@/constants/Images";

const Related = () => {
  return (
    <div className="flex flex-col gap-8 p-8 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-primary-new">
        Sản phẩm liên quan
      </h2>
      <div className="grid grid-cols-1 gap-1">
        <ProductCard
          isHorizontal
          imageSrc={IMAGES.product11}
          buttonText="Mua ngay"
        />
        <ProductCard
          isHorizontal
          imageSrc={IMAGES.product}
          buttonText="Mua ngay"
        />
        <ProductCard
          isHorizontal
          imageSrc={IMAGES.product10}
          buttonText="Mua ngay"
        />
        <ProductCard
          isHorizontal
          imageSrc={IMAGES.product8}
          buttonText="Mua ngay"
        />
        <ProductCard
          isHorizontal
          imageSrc={IMAGES.product3}
          buttonText="Mua ngay"
        />
      </div>
    </div>
  );
};

export default Related;
