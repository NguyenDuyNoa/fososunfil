import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/productCard";
import SwiperCarousel from "@/components/SwiperCarousel";
import { IMAGES } from "@/constants/Images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
            Tiếp tục mua sắm
          </button>
          <Link
            href="/"
            className="w-[240px] text-center bg-brand-500 text-base font-bold text-white px-4 py-3 rounded-lg"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
      <div className="py-12 flex flex-col gap-5">
        <h3 className="text-2xl font-semibold text-primary-new capitalize">Có thể bạn cũng quan tâm</h3>
        {/* <SwiperCarousel
          items={detailItem?.map((product: any, index: number) => (
            <ProductCard
              key={index}
              // isHorizontal
              imageSrc={product.imageSrc}
              buttonText={product.buttonText}
            />
          ))}
          breakpoints={breakpoints}
          slidesPerView={2.5}
          spaceBetween={8}
          showNavigation={false}
        /> */}
      </div>
    </div>
  );
};

export default SuccessfulOrderPage;
