import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/Images";

const DiscountCodeBanner = () => {
  return (
    <div className="relative py-7 flex flex-col 3xl:gap-4 gap-3 justify-center items-center bg-discountCodeBanner bg-cover bg-center bg-no-repeat w-full rounded-xl">
      <div className="absolute top-1/2 -translate-y-1/2 left-[25%]">
        <Image src={IMAGES.union} alt="union" width={158} height={124} />
        <div className="text-error-main absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-[60%] rotate-[-15deg]">
          <h4 className="text-xl whitespace-nowrap">Giảm giá</h4>
          <span className="text-5xl font-bold">35%</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <h4 className="text-white text-2xl font-semibold">Nhập mã</h4>
        <p className="py-2 px-4 bg-brand-800 text-white text-[32px]/[34px] font-semibold uppercase border-[3px] border-brand-200 rounded-xl">Nguoimoi</p>
      </div>
      <p className="text-white font-base font-normal italic">*Áp dụng cho khách hàng mới với hoá đơn từ 1 triệu.</p>
    </div>
  );
};

export default DiscountCodeBanner;
