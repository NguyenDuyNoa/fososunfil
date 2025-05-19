import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/Images";
import LongArrowIcon from "@/components/icons/LongArrowIcon";

const StoreLocatorBanner = () => {
  return (
    <div className="3xl:py-8 3xl:px-12 py-5 px-6 bg-brand-50 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image src={IMAGES.location} alt="location" width={48} height={48} className="3xl:size-12 size-10"/>
        <p className="3xl:text-[32px]/[32px] text-2xl font-medium text-primary-new">
          Xem hệ thống 88 cửa hàng trên toàn quốc
        </p>
      </div>
      <button className="group flex gap-2 items-center bg-white rounded-full 3xl:px-6 px-4 3xl:py-3 py-2 text-brand-600 3xl:text-2xl text-xl font-semibold transition-all duration-300 hover:bg-brand-600 hover:text-white hover:shadow-lg">
        Xem ngay
        <LongArrowIcon className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
      </button>
    </div>
  );
};

export default StoreLocatorBanner;
