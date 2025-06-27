import { IMAGES } from "@/constants/Images";
import Image from "next/image";
import React from "react";

const Promo = ({ promotion }: { promotion: any }) => {
  if (promotion?.length === 0) return null;
  return (
    <div className="w-[491px] flex flex-col bg-white rounded-lg border-2 border-error-main overflow-hidden">
      <h2 className="text-lg xl:text-2xl font-semibold text-white bg-error-main p-2 xl:px-4">
        Khuyến mãi
      </h2>
      <div className="flex flex-col gap-3 xl:gap-5 p-2 xl:p-4">
        {promotion?.map((item: any) => (
          <div key={item?.id} className="flex items-center gap-2">
            <Image src={IMAGES.sale} alt="sale" width={24} height={24} className="flex-shrink-0"/>
            <p className="text-sm xl:text-base text-grey-700 font-normal">{item?.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promo;
