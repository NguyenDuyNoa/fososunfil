"use client";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import { ProductItem } from "@/types/products/IProducts";
import { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCardWithAuthCheck from "../productCard/withAuthCheck";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";

type BreakpointOptions = {
  [width: number]: {
    slidesPerView: number;
    spaceBetween?: number;
  };
};

interface SwiperCarouselProps {
  items: ProductItem[];
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  loop?: boolean;
  autoplayDelay?: number;
  showNavigation?: boolean;
  breakpoints?: BreakpointOptions;
  className?: string;
  navigationButtonBgColor?: string;
  navigationButtonIconColor?: string;
  isFlashSale?: boolean;
  imageFull?: boolean;
}

const SwiperCarousel = ({
  items,
  slidesPerView,
  spaceBetween = 8,
  autoplay = false,
  loop = false,
  autoplayDelay = 3000,
  showNavigation = true,
  breakpoints,
  className = "",
  navigationButtonBgColor = "bg-[#3592FD33]",
  navigationButtonIconColor = "text-brand-500",
  isFlashSale = false,
  imageFull = false,
}: SwiperCarouselProps) => {
  const swiperRef = useRef<any>(null);

  const modules = [Navigation];
  if (autoplay) {
    modules.push(Autoplay);
  }

  const defaultBreakpoints = {
    320: { slidesPerView: 1.5 },
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 4 },
    1440: { slidesPerView: 5 },
    1600: { slidesPerView: 6 },
  };

  return (
    <div className="relative h-full mb-[2px]">
      <Swiper
        modules={modules}
        spaceBetween={spaceBetween}
        loop={loop}
        autoplay={
          autoplay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
              }
            : undefined
        }
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={breakpoints || defaultBreakpoints}
        className={`swiper-carousel ${className}`}
        slidesPerView={slidesPerView && !breakpoints ? slidesPerView : undefined}
      >
        {items && items.length > 0
          ? items.map((item: ProductItem, index: number) => (
              <SwiperSlide className="!h-auto" key={item.id || index}>
                <ProductCardWithAuthCheck
                  product={item}
                  isFlashSale={isFlashSale}
                  imageFull={imageFull}
                />
              </SwiperSlide>
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <SwiperSlide className="!h-auto" key={`skeleton-${index}`}>
                <ProductCardSkeleton />
              </SwiperSlide>
            ))}
      </Swiper>

      {showNavigation && items && items.length > (slidesPerView || 1) && (
        <>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className={`hidden absolute top-1/2 -translate-y-1/2 -left-4 size-8 3xl:size-10 rounded-full ${navigationButtonBgColor} xl:flex items-center justify-center z-20`}
          >
            <ArrowRightIcon
              className={`${navigationButtonIconColor} size-6 rotate-180`}
            />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className={`hidden absolute top-1/2 -translate-y-1/2 -right-4 size-8 3xl:size-10 rounded-full ${navigationButtonBgColor} xl:flex items-center justify-center z-20`}
          >
            <ArrowRightIcon className={`${navigationButtonIconColor} size-6`} />
          </button>
        </>
      )}
    </div>
  );
};

export default SwiperCarousel;
