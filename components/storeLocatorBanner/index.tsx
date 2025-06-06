import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/Images";
import LongArrowIcon from "@/components/icons/LongArrowIcon";

const StoreLocatorBanner = () => {
  return (
    <div className="bg-brand-50">
      <div className="container py-4 xl:py-4 flex flex-col gap-1 lg:flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={IMAGES.location}
            alt="location"
            width={48}
            height={48}
            className="size-7 xl:size-10"
          />
          <p className="text-base xl:text-2xl font-medium text-primary-new">
            Xem hệ thống 88 cửa hàng trên toàn quốc
          </p>
        </div>
        <button className="group flex gap-2 items-center bg-white rounded-full xl:px-6 xl:py-3 px-4 py-2 text-brand-600 text-sm xl:text-xl font-semibold transition-all duration-300 hover:bg-brand-600 hover:text-white hover:shadow-lg">
          Xem ngay
          <LongArrowIcon className="size-5 xl:size-6 transition-transform duration-300 group-hover:translate-x-2" />
        </button>
      </div>
    </div>
  );
};

export default StoreLocatorBanner;
