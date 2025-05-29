import { IMAGES } from "@/constants/Images";
import Image from "next/image";
import React from "react";
import DoubleArrowRightIcon from "@/components/icons/DoubleArrowRight";
import ProductCard from "@/components/productCard";
import SwiperCarousel from "@/components/SwiperCarousel";
import { useResizeStore } from "@/stores/useResizeStore";

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

const breakpoints = {
  320: { slidesPerView: 2.5 },
  640: { slidesPerView: 3 },
  768: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
  1280: { slidesPerView: 6 },
};

const productCards = Array(8)
  .fill(0)
  .map((_, index) => <ProductCard key={index} imageSrc={productImages[index]} />);

const ViewedProducts = () => {
  const { isVisibleMobile } = useResizeStore();

  return (
    <div className="relative container w-full rounded-md">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <Image
            src={IMAGES.viewed}
            alt=""
            width={40}
            height={40}
            className="size-6 xl:size-10"
          />
          <h2 className="text-base xl:text-2xl font-semibold text-primary-new capitalize">
            Sản phẩm vừa xem
          </h2>
        </div>

        <SwiperCarousel
          items={productCards as any}
          slidesPerView={isVisibleMobile ? 2.5 : 6}
          spaceBetween={isVisibleMobile ? 8 : 16}
          breakpoints={breakpoints}
          className="viewed-products-swiper"
        />
      </div>
    </div>
  );
};

export default ViewedProducts;
