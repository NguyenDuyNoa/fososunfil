import SwiperCarousel from "@/components/SwiperCarousel";
import { IMAGES } from "@/constants/Images";
import { useResizeStore } from "@/stores/useResizeStore";
import Image from "next/image";

const breakpoints = {
  320: { slidesPerView: 2.5 },
  640: { slidesPerView: 3 },
  768: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
  1280: { slidesPerView: 4.5 },
};

const NewArrival = ({ itemNew }: { itemNew: any }) => {
  const { isVisibleMobile, isVisibleTablet } = useResizeStore();
  if (itemNew?.length === 0) return null;
  return (
    <div className={`${!isVisibleMobile && !isVisibleTablet ? "container" : ""}`}>
      <div className="relative p-3 xl:p-12 bg-brand-600 w-full h-fit xl:rounded-xl overflow-hidden">
        <div className="flex flex-col gap-5 relative">
          <div className="flex justify-between gap-2 z-10">
            <div className="flex items-center gap-2">
              <Image
                src={IMAGES.package}
                alt=""
                width={40}
                height={40}
                className="size-6 lg:size-10"
              />
              <h2 className="text-base xl:text-2xl font-bold text-white capitalize">
                Hàng mới về
              </h2>
            </div>
            {/* <div className="py-1 xl:px-3 rounded-[20px] flex items-center gap-1 xl:gap-2 cursor-pointer transition-all duration-300 xl:hover:bg-brand-100 xl:hover:bg-opacity-10 group">
              <Link
                href="/products"
                className="text-[8px] xl:text-base font-semibold text-brand-100 whitespace-nowrap group-hover:font-bold"
              >
                Xem tất cả{" "}
              </Link>
              <DoubleArrowRightIcon className="text-brand-100 size-3 xl:size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </div> */}
          </div>
          <SwiperCarousel
            items={itemNew as any}
            spaceBetween={isVisibleMobile ? 8 : 16}
            navigationButtonBgColor="bg-brand-100"
            navigationButtonIconColor="text-brand-800"
            className="flash-sale-swiper z-10"
            breakpoints={breakpoints}
          />
          <div className="hidden xl:block absolute right-0 top-0 w-[200px] h-full bg-gradient-to-r from-[#025FCA00] to-[#025FCA] z-10 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
