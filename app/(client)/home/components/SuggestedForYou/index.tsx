import SwiperCarousel from "@/components/SwiperCarousel";
import { IMAGES } from "@/constants/Images";
import { useResizeStore } from "@/stores/useResizeStore";
import Image from "next/image";

const breakpoints = {
  320: { slidesPerView: 1.5 },
  640: { slidesPerView: 2 },
  768: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
  1280: { slidesPerView: 4 },
};

const SuggestedForYou = ({ imageForYou, itemRelated }: { imageForYou: any, itemRelated: any }) => {
  const { isVisibleMobile } = useResizeStore();
console.log(imageForYou?.image)
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
          {/* <div className="py-2 xl:px-3 rounded-[20px] flex items-center gap-1 xl:gap-2 cursor-pointer transition-all duration-300 xl:hover:bg-brand-500 xl:hover:bg-opacity-10 group">
            <Link
              href="/products"
              className="text-[8px] xl:text-base font-semibold text-brand-500 whitespace-nowrap group-hover:font-bold"
            >
              Xem tất cả{" "}
            </Link>
            <DoubleArrowRightIcon className="text-brand-500 size-3 xl:size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div> */}
        </div>
        <div className="flex gap-2 xl:gap-6 w-full h-full xl:h-[460px]">
          <div className="w-[40%] xl:w-[30%] flex-1">
            <Image
              src={imageForYou?.image || IMAGES.banner2}
              alt=""
              width={500}
              height={600}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-[calc(60%-12px)] xl:w-[calc(70%-24px)] flex-1">
            <SwiperCarousel
              items={itemRelated as any}
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
