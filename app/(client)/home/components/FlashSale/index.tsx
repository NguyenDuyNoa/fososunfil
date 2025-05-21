import DoubleArrowRightIcon from "@/components/icons/DoubleArrowRight";
import ProductCard from "@/components/productCard";
import SwiperCarousel from "@/components/SwiperCarousel";
import { IMAGES } from "@/constants/Images";
import { useResizeStore } from "@/stores/useResizeStore";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Countdown from "./Countdown";

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
  
  const breakpoints = {
    320: { slidesPerView: 2.5 },
    640: { slidesPerView: 3 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 6 },
  };

const FlashSale = () => {
  const { isVisibleMobile } = useResizeStore();

  // Thiết lập thời gian kết thúc cụ thể: 12:30, ngày 15 tháng 5 năm 2025
  const endTime = useMemo(() => {
    const specificEndTime = new Date("2025-05-22T12:30:00");
    return specificEndTime;
  }, []);

  // Callback function khi đếm ngược hoàn thành
  const handleCountdownComplete = () => {
    console.log("Flash sale đã kết thúc!");
  };

  return (
    <div className={`${!isVisibleMobile ? "container" : ""}`}>
      <div className="relative p-3 xl:p-12 bg-gradient-to-r from-[#FFEDD933] to-[#FFE8CE4D] w-full h-fit lg:rounded-xl overflow-hidden">
        <div className="flex flex-col gap-5 z-[5] relative">
          <div className="flex justify-between gap-2 z-10">
            <div className="flex items-center gap-3 xl:gap-5">
              <div className="flex items-center gap-2">
                <Image
                  src={IMAGES.flashSale}
                  alt=""
                  width={40}
                  height={40}
                  className="size-6 lg:size-10"
                />
                <h2 className="text-base xl:text-2xl font-bold uppercase text-primary-new">
                  Flash Sale
                </h2>
              </div>
              <Countdown
                endTime={endTime}
                onComplete={handleCountdownComplete}
              />
            </div>
            <div className="py-1 xl:px-3 rounded-[20px] flex items-center gap-1 xl:gap-2 cursor-pointer transition-all duration-300 xl:hover:bg-error-main hover:bg-opacity-10 group">
              <Link
                href="/products"
                className="text-[8px] xl:text-base font-semibold text-error-main whitespace-nowrap group-hover:font-bold"
              >
                Xem tất cả{" "}
              </Link>
              <DoubleArrowRightIcon className="text-error-main size-3 xl:size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
          <SwiperCarousel
            items={productCards}
            slidesPerView={isVisibleMobile ? 2.5 : 6}
            spaceBetween={isVisibleMobile ? 8 : 16}
            autoplay={true}
            breakpoints={breakpoints}
            autoplayDelay={2000}
            className="flash-sale-swiper z-10"
          />
        </div>
        <div className="bg-[#FFDDB5] absolute -top-1/2 left-0 w-1/2 h-full rounded-[50%] blur-3xl z-[2] pointer-events-none"></div>
        <div className="bg-[#FFDDB5] absolute -bottom-1/2 right-0 w-1/2 h-full rounded-[50%] blur-3xl z-[2] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default FlashSale;
