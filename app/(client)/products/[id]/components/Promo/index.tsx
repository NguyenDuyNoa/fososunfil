import { IMAGES } from "@/constants/Images";
import Image from "next/image";
import React from "react";

const Promo = () => {
  return (
    <div className="flex flex-col gap-8 p-8 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-primary-new">
        Khuyến mãi
      </h2>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <Image src={IMAGES.sale} alt="sale" width={24} height={24} />
          <p className="text-base text-grey-700 font-normal">
            Chiết khấu lên đến <strong className="font-bold">10%</strong> khi
            mua hàng trên ứng dụng
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image src={IMAGES.sale} alt="sale" width={24} height={24} />
          <p className="text-base text-grey-700 font-normal">
            <strong className="font-bold"> Mua 10 tặng 2</strong> áp dụng cho
            hoá đơn từ 1,000,000 đ
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image src={IMAGES.sale} alt="sale" width={24} height={24} />
          <p className="text-base text-grey-700 font-normal">
            Khuyến mãi kép lên đến{" "}
            <strong className="font-bold">100,000 đ</strong> khi mua kèm{" "}
            <u className="text-brand-600 font-bold">Bộ lọc dầu ASAKASHI</u>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image src={IMAGES.sale} alt="sale" width={24} height={24} />
          <p className="text-base text-grey-700 font-normal">
          Tích điểm thưởng và nhận voucher giảm giá với hoá đơn bất kỳ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Promo;
