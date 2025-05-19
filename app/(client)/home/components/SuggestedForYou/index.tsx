import SwiperCarousel from "@/components/SwiperCarousel";
import { IMAGES } from "@/constants/Images";
import React from "react";
import Image from "next/image";
import ProductCard from "@/components/productCard";
import DoubleArrowRightIcon from "@/components/icons/DoubleArrowRight";
import Link from "next/link";

const breakpoints = {
  320: { slidesPerView: 1 },
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
  return (
    <div className="relative 3xl:p-12 2xl:p-10 xl:p-8 p-4 w-full rounded-md">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={IMAGES.like} alt="" width={40} height={40} />
            <h2 className="text-[32px]/[32px] font-bold text-[#1C252E] capitalize">
              Dành cho bạn
            </h2>
          </div>
          <div className="py-1 px-3 rounded-[20px] flex items-center gap-2 cursor-pointer transition-all duration-300 hover:bg-brand-500 hover:bg-opacity-10 group">
            <Link
              href="/products"
              className="text-base font-semibold text-brand-500 whitespace-nowrap group-hover:font-bold"
            >
              Xem tất cả{" "}
            </Link>
            <DoubleArrowRightIcon className="text-brand-500 size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
        <div className="flex gap-6 w-full h-full">
          <div className="w-[30%] flex-1">
            <Image
              src={IMAGES.banner2}
              alt=""
              width={500}
              height={600}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-[calc(70%-24px)]">
            <SwiperCarousel
              items={productCards}
              slidesPerView={4}
              spaceBetween={16}
              breakpoints={breakpoints}
              className="viewed-products-swiper h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedForYou;
