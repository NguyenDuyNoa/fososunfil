import ProductCard from "@/components/productCard";
import React from "react";
import { IMAGES } from "@/constants/Images";
import SwiperCarousel from "@/components/SwiperCarousel";

const products = [
  {
    imageSrc: IMAGES.product11,
    buttonText: "Mua ngay"
  },
  {
    imageSrc: IMAGES.product,
    buttonText: "Mua ngay"
  },
  {
    imageSrc: IMAGES.product10,
    buttonText: "Mua ngay"
  },
  {
    imageSrc: IMAGES.product8,
    buttonText: "Mua ngay"
  },
  {
    imageSrc: IMAGES.product3,
    buttonText: "Mua ngay"
  }
];

const breakpoints = {
  320: { slidesPerView: 2.5 },
  640: { slidesPerView: 3 },
  768: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
  1280: { slidesPerView: 4 },
};

const Related = ({ detailItem }: { detailItem: any }) => {
  return (
    <div className="flex flex-col gap-3 xl:gap-8 p-3 xl:p-8 bg-white rounded-lg">
      <h2 className="text-lg xl:text-2xl font-semibold text-primary-new">
        Sản phẩm liên quan
      </h2>
      
      {/* Mobile View */}
      <div className="block xl:hidden">
        <SwiperCarousel
          items={detailItem?.map((product: any, index: number) => (
            <ProductCard
              key={index}
              // isHorizontal
              imageSrc={product.imageSrc}
              buttonText={product.buttonText}
            />
          ))}
          breakpoints={breakpoints}
          slidesPerView={2.5}
          spaceBetween={8}
          showNavigation={false}
        />
      </div>

      {/* Desktop View */}
      <div className="hidden xl:grid grid-cols-1 gap-4">
        {detailItem?.map((product: any, index: number) => (
          <ProductCard
            key={index}
            isHorizontal
            product={product}
            buttonText="Mua ngay"
          />
        ))}
      </div>
    </div>
  );
};

export default Related;
