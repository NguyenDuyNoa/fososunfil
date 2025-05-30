import SwiperCarousel from "@/components/SwiperCarousel";
import { IMAGES } from "@/constants/Images";
import { useGetListItemView } from "@/managers/api-management/home/useGetListItemView";
import { useResizeStore } from "@/stores/useResizeStore";
import { getViewedProducts } from "@/utils/localStorage";
import Image from "next/image";
import { useEffect, useState } from "react";

const breakpoints = {
  320: { slidesPerView: 2.5 },
  640: { slidesPerView: 3 },
  768: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
  1280: { slidesPerView: 6 },
};

const ViewedProducts = () => {
  const { isVisibleMobile } = useResizeStore();
  const [viewedProductIds, setViewedProductIds] = useState<string[]>([]);
  const { data: productCards } = useGetListItemView(viewedProductIds);
  
  useEffect(() => {
    const ids = getViewedProducts();
    setViewedProductIds(ids);
  }, []);
  if (productCards?.length === 0) return null;
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
