import { IMAGES } from "@/constants/Images";
import Image from "next/image";
import React, { useMemo } from "react";
import DoubleArrowRightIcon from "@/components/icons/DoubleArrowRight";
import ProductCard from "@/components/productCard";
import SwiperCarousel from "@/components/SwiperCarousel";
import Countdown from "./Countdown";
import Link from "next/link";

const productImages = [
  IMAGES.product1,
  IMAGES.product2,
  IMAGES.product3,
  IMAGES.product4,
  IMAGES.product5,
  IMAGES.product6,
  IMAGES.product7,
  IMAGES.product8,
];

const productCards = Array(8)
  .fill(0)
  .map((_, index) => (
    <ProductCard key={index} imageSrc={productImages[index]} />
  ));

const FlashSale = () => {
  // Thiết lập thời gian kết thúc cụ thể: 12:30, ngày 15 tháng 5 năm 2025
  const endTime = useMemo(() => {
    const specificEndTime = new Date("2025-05-19T12:30:00");
    return specificEndTime;
  }, []);

  // Callback function khi đếm ngược hoàn thành
  const handleCountdownComplete = () => {
    console.log("Flash sale đã kết thúc!");
  };

  return (
    <div className="relative 3xl:p-12 2xl:p-9 xl:p-6 p-4 bg-gradient-to-r from-[#FFEDD933] to-[#FFE8CE4D] w-full h-fit rounded-xl overflow-hidden">
      <div className="flex flex-col gap-5 z-[5] relative">
        <div className="flex justify-between gap-2 z-10">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="flex items-center gap-2">
              <Image src={IMAGES.flash} alt="" width={40} height={40} />
              <h2 className="text-base md:text-2xl xl:text-[32px]/[24px] font-bold uppercase text-[#1C252E]">
                Flash Sale
              </h2>
            </div>
            <Countdown endTime={endTime} onComplete={handleCountdownComplete} />
          </div>
          <div className="py-1 px-3 rounded-[20px] flex items-center gap-2 cursor-pointer transition-all duration-300 hover:bg-error-main hover:bg-opacity-10 group">
            <Link href="/products" className="text-[8px] md:text-xs xl:text-base font-semibold text-error-main whitespace-nowrap group-hover:font-bold">
              Xem tất cả{" "}
            </Link>
            <DoubleArrowRightIcon className="text-error-main size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
        {/* <div className="relative z-10"> */}
        <SwiperCarousel
          items={productCards}
          slidesPerView={6}
          spaceBetween={16}
          autoplay={true}
          autoplayDelay={2000}
          className="flash-sale-swiper z-10"
        />
        {/* </div> */}
      </div>
      <div className="bg-[#FFDDB5] absolute -top-1/2 left-0 w-1/2 h-full rounded-[50%] blur-3xl z-[2]"></div>
      <div className="bg-[#FFDDB5] absolute -bottom-1/2 right-0 w-1/2 h-full rounded-[50%] blur-3xl z-[2]"></div>
    </div>
  );
};

export default FlashSale;
