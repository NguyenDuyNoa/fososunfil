import { IMAGES } from "@/constants/Images";
import Image from "next/image";
import React from "react";
import DoubleArrowRightIcon from "@/components/icons/DoubleArrowRight";
import ProductCard from "@/components/productCard";
import SwiperCarousel from "@/components/SwiperCarousel";

const productImages = [
  IMAGES.product9,
  IMAGES.product10,
  IMAGES.product11,
  IMAGES.product12,
  IMAGES.product13,
  IMAGES.product14,
  IMAGES.product15,
  IMAGES.product16,
];

const productCards = Array(8)
  .fill(0)
  .map((_, index) => <ProductCard key={index} imageSrc={productImages[index]} />);

const ViewedProducts = () => {
  return (
    <div className="relative w-full rounded-md">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <Image src={IMAGES.viewed} alt="" width={40} height={40} />
          <h2 className="text-[32px]/[32px] font-bold text-[#1C252E] capitalize">
            Sản phẩm vừa xem
          </h2>
        </div>

        <SwiperCarousel
          items={productCards}
          slidesPerView={6}
          spaceBetween={16}
          className="viewed-products-swiper"
        />
      </div>
    </div>
  );
};

export default ViewedProducts;
