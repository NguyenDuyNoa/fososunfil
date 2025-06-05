"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import SwiperCarousel from "@/components/SwiperCarousel";
import { IMAGES } from "@/constants/Images";
import { useGetListData } from "@/managers/api-management/home/useGetListData";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Giỏ hàng",
    href: "/cart",
  },
  {
    label: "Thanh toán",
    href: "/checkout",
  },
];

const SuccessfulOrderPage = () => {
  const { data: listData } = useGetListData();

  return (
    <div className="container flex flex-col gap-4 xl:gap-8 pt-4 xl:pt-6">
      <Breadcrumbs items={items} />
      <div className="flex flex-col justify-center items-center gap-10 w-full">
        <Image
          src={IMAGES.successfulOrder}
          alt="cartEmpty"
          width={480}
          height={360}
        />
        <h3 className="text-2xl leading-7 font-semibold text-primary-new">
          Cảm ơn quý khách đã đặt hàng!{" "}
        </h3>
        <p className="text-secondary-new text-base font-normal text-center">
          Chúng tôi sẽ liên hệ quý khách để xác nhận đơn
          <br /> hàng trong thời gian sớm nhất.
        </p>
        <div className="flex gap-3">
          <button className="w-[240px] text-center bg-white border border-brand-500 text-base font-bold text-brand-500 px-4 py-3 rounded-lg">
            Xem chi tiết đơn hàng
          </button>
          <Link
            href="/"
            className="group w-[240px] text-center bg-brand-500 text-base font-bold text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2"
          >
            Tiếp tục mua sắm
            <ArrowRightIcon className="size-6 group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>
      </div>
      <div className="py-12 flex flex-col gap-5">
        <h3 className="text-2xl font-semibold text-primary-new capitalize">
          Có thể bạn cũng quan tâm
        </h3>
        <SwiperCarousel
          items={listData?.itemRelated}
          spaceBetween={8}
          showNavigation={true}
        />
      </div>
    </div>
  );
};

export default SuccessfulOrderPage;
