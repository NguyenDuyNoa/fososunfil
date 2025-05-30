"use client";
import AboutCardFeel from "@/components/card/about/AboutCardFeel";
import TitleDash from "@/components/title/TitleDash";
import TitleHighlight from "@/components/title/TitleHighlight";
import { uuidv4 } from "@/lib/uuid";
import { useResizeStore } from "@/stores/useResizeStore";
import { useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const data = [
  {
    id: uuidv4(),
    name: "Mr. Jone Ambrose",
    date: "20 - 07 - 21",
    description:
      "“Lorem Ipsum has been the industry by standard dummy text ever to since the 1500s, it’s  type and scram”",
    start: 5,
    image: "/example/about/use1.png",
  },
  {
    id: uuidv4(),
    name: "Mr. Jone Ambrose",
    date: "20 - 07 - 21",
    description:
      "“Lorem Ipsum has been the industry by standard dummy text ever to since the 1500s, it’s  type and scram”",
    start: 5,
    image: "/example/about/use2.png",
  },
  {
    id: uuidv4(),
    name: "Mr. Jone Ambrose",
    date: "20 - 07 - 21",
    description:
      "“Lorem Ipsum has been the industry by standard dummy text ever to since the 1500s, it’s  type and scram”",
    start: 5,
    image: "/example/about/use1.png",
  },
  {
    id: uuidv4(),
    name: "Mr. Jone Ambrose",
    date: "20 - 07 - 21",
    description:
      "“Lorem Ipsum has been the industry by standard dummy text ever to since the 1500s, it’s  type and scram”",
    start: 5,
    image: "/example/about/use2.png",
  },
];
const SectionFeelAbout = () => {
  const swiperRef = useRef<any>();
  const { isVisibleMobile } = useResizeStore();
  return (
    <div
      className='bg-[url("/background/about/bg-slider.png")] lg:h-screen h-full bg-cover bg-center bg-no-repeat 
        flex flex-col gap-12 justify-center lg:py-0 pt-[64px] pb-[96px] custom-px-responsive'
      id="feel-customer-about-us"
    >
      <div className="container flex flex-col gap-12">
        <div className="flex flex-col items-start gap-6">
          <TitleHighlight
            title="Cảm nhận của khách hàng"
            highlightClassName="hidden"
            titleClassName="text-white"
          />
          <TitleDash
            textClassName="text-[#FFFFFFCC]/80"
            dashClassName="md:max-w-[76px] md:min-w-[76px] border-white md:mt-0 mt-3"
            text="It is a long established fact that a reader will be distracted by the service."
          />
        </div>
        <div className="relative w-full select-none">
          <Swiper
            spaceBetween={30}
            modules={[Autoplay]}
            slidesPerView={isVisibleMobile ? 1 : 2}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 3000,
              waitForTransition: false,
              stopOnLastSlide: true,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            lazyPreloadPrevNext={1500}
            speed={1500}
            lazyPreloaderClass="swiper-lazy-preloader"
            className={`swiper-product-about xxl:h-[290px] lg:h-[270px] h-auto w-full`}
          >
            {data &&
              data?.map((item: any, index: any) => (
                <SwiperSlide key={item.id} className="py-2">
                  <AboutCardFeel {...item} index={index} />
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="absolute z-[1] lg:flex flex  lg:top-1/2 top-full lg:-translate-y-1/2 md:translate-y-[50%] translate-y-[40%] left-1/2 -translate-x-[50%] lg:justify-between lg:w-full">
            <div className="w-full relative flex justify-start xl:left-[-1.8%] lg:left-[-3%]">
              <button
                className="hover:scale-105 transition-all duration-150 ease-linear z-30 3xl:size-14 size-12 backdrop-blur-sm lg:bg-[#37373780]/50 lg:hover:bg-[#37373780]/80 rounded-full flex items-center justify-center outline-none"
                onClick={() => swiperRef.current.slidePrev()}
              >
                <GrPrevious className="lg:text-2xl text-3xl text-white" />
              </button>
            </div>
            <div className="w-full relative flex justify-end xl:right-[-1.8%] lg:right-[-3%]">
              <button
                className="hover:scale-105 transition-all duration-150 ease-linear z-30 3xl:size-14 size-12 backdrop-blur-sm lg:bg-[#37373780]/50 lg:hover:bg-[#37373780]/80 rounded-full flex items-center justify-center outline-none"
                onClick={() => {
                  swiperRef.current.slideNext();
                }}
              >
                <GrNext className="lg:text-2xl text-3xl text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionFeelAbout;
