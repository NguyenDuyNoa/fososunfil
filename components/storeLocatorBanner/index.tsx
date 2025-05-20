import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/Images";
import LongArrowIcon from "@/components/icons/LongArrowIcon";

const StoreLocatorBanner = () => {
  return (
    <div className="bg-brand-50">
      <div className="container py-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={IMAGES.location}
            alt="location"
            width={48}
            height={48}
            className="size-12"
          />
          <p className="text-[28px]/[32px] font-medium text-primary-new">
            Xem hệ thống 88 cửa hàng trên toàn quốc
          </p>
        </div>
        <button className="group flex gap-2 items-center bg-white rounded-full px-6 py-3 text-brand-600 text-2xl font-semibold transition-all duration-300 hover:bg-brand-600 hover:text-white hover:shadow-lg">
          Xem ngay
          <LongArrowIcon className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
        </button>
      </div>
    </div>
  );
};

export default StoreLocatorBanner;
