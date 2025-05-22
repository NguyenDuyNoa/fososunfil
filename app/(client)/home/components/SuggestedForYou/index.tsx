import SwiperCarousel from "@/components/SwiperCarousel";
import { IMAGES } from "@/constants/Images";
import React from "react";
import Image from "next/image";
import ProductCard from "@/components/productCard";
import DoubleArrowRightIcon from "@/components/icons/DoubleArrowRight";
import Link from "next/link";
import { useResizeStore } from "@/stores/useResizeStore";

const breakpoints = {
  320: { slidesPerView: 1.5 },
  640: { slidesPerView: 2 },
  768: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
  1280: { slidesPerView: 4 },
};

const productImages = [
  IMAGES.product5,
  IMAGES.product6,
  IMAGES.product7,
  IMAGES.product8,
  IMAGES.product9,
  IMAGES.product10,
  IMAGES.product11,
  IMAGES.product12,
];

const productCards = Array(8)
  .fill(0)
  .map((_, index) => (
    <ProductCard key={index} imageSrc={productImages[index]} />
  ));

const SuggestedForYou = () => {
  const { isVisibleMobile } = useResizeStore();
  console.log(isVisibleMobile);
  return (
    <div className="relative container w-full rounded-md">
      <div className="flex flex-col gap-3 xl:gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={IMAGES.like}
              alt=""
              width={40}
              height={40}
              className="size-6 xl:size-10"
            />
            <h2 className="text-base xl:text-2xl font-bold text-primary-new capitalize">
              Dành cho bạn
            </h2>
          </div>
          <div className="py-2 xl:px-3 rounded-[20px] flex items-center gap-1 xl:gap-2 cursor-pointer transition-all duration-300 xl:hover:bg-brand-500 xl:hover:bg-opacity-10 group">
            <Link
              href="/products"
              className="text-[8px] xl:text-base font-semibold text-brand-500 whitespace-nowrap group-hover:font-bold"
            >
              Xem tất cả{" "}
            </Link>
            <DoubleArrowRightIcon className="text-brand-500 size-3 xl:size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
        <div className="flex gap-2 xl:gap-6 w-full h-full">
          <div className="w-[40%] xl:w-[30%] flex-1">
            <Image
              src={IMAGES.banner2}
              alt=""
              width={500}
              height={600}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-[calc(60%-12px)] xl:w-[calc(70%-24px)] flex-1">
            <SwiperCarousel
              items={productCards}
              slidesPerView={isVisibleMobile ? 1.5 : 4}
              spaceBetween={isVisibleMobile ? 8 : 12}
              // autoplay={true}
              // autoplayDelay={2000}
              breakpoints={breakpoints}
              className="flash-sale-swiper z-10 h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedForYou;
