import { IMAGES } from "@/constants/Images";
import Image from "next/image";
import React from "react";

const Promo = ({ promotion }: { promotion: any }) => {
  return (
    <div className="flex flex-col gap-3 xl:gap-8 px-8 py-3 xl:p-8 bg-white rounded-lg">
      <h2 className="text-lg xl:text-2xl font-semibold text-primary-new">
        Khuyến mãi
      </h2>
      <div className="flex flex-col gap-3 xl:gap-5">
        {promotion?.map((item: any) => (
          <div key={item?.id} className="flex items-center gap-2">
            <Image src={IMAGES.sale} alt="sale" width={24} height={24} className="flex-shrink-0"/>
            <p className="text-sm xl:text-base text-grey-700 font-normal">{item?.title}</p>
          </div>
        ))}
        {/* <div className="flex items-center gap-2">
          <Image src={IMAGES.sale} alt="sale" width={24} height={24} />
          <p className="text-sm xl:text-base text-grey-700 font-normal">
            Chiết khấu lên đến <strong className="font-bold">10%</strong> khi
            mua hàng trên ứng dụng
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image src={IMAGES.sale} alt="sale" width={24} height={24} />
          <p className="text-sm xl:text-base text-grey-700 font-normal">
            <strong className="font-bold"> Mua 10 tặng 2</strong> áp dụng cho
            hoá đơn từ 1,000,000 đ
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image src={IMAGES.sale} alt="sale" width={24} height={24} />
          <p className="text-sm xl:text-base text-grey-700 font-normal">
            Khuyến mãi kép lên đến{" "}
            <strong className="font-bold">100,000 đ</strong> khi mua kèm{" "}
            <u className="text-brand-600 font-bold">Bộ lọc dầu ASAKASHI</u>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image src={IMAGES.sale} alt="sale" width={24} height={24} />
          <p className="text-sm xl:text-base text-grey-700 font-normal">
          Tích điểm thưởng và nhận voucher giảm giá với hoá đơn bất kỳ
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Promo;
