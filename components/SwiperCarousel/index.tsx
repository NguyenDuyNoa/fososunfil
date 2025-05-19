import React, { ReactNode, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

type BreakpointOptions = {
  [width: number]: {
    slidesPerView: number;
    spaceBetween?: number;
  };
};

interface SwiperCarouselProps {
  items: ReactNode[];
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
}

const SwiperCarousel = ({
  items,
  slidesPerView = 1,
  spaceBetween = 8,
  autoplay = false,
  loop = false,
  autoplayDelay = 3000,
  showNavigation = true,
  breakpoints,
  className = "",
  navigationButtonBgColor = "bg-[#3592FD33]",
  navigationButtonIconColor = "text-brand-500",
}: SwiperCarouselProps) => {
  const swiperRef = useRef<any>(null);

  const modules = [Navigation];
  if (autoplay) {
    modules.push(Autoplay);
  }

  const defaultBreakpoints = {
    320: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 6 },
    // 1536: { slidesPerView: 6 },
  };

  return (
    <div className="relative h-full">
      <Swiper
        modules={modules}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
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
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>{item}</SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && (
        <>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className={`absolute top-1/2 -translate-y-1/2 -left-4 size-8 3xl:size-10 rounded-full ${navigationButtonBgColor} flex items-center justify-center z-20`}
          >
            <ArrowRightIcon
              className={`${navigationButtonIconColor} size-6 rotate-180`}
            />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className={`absolute top-1/2 -translate-y-1/2 -right-4 size-8 3xl:size-10 rounded-full ${navigationButtonBgColor} flex items-center justify-center z-20`}
          >
            <ArrowRightIcon className={`${navigationButtonIconColor} size-6`} />
          </button>
        </>
      )}
    </div>
  );
};

export default SwiperCarousel;
