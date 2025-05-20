import ProductCard from "@/components/productCard";
import SwiperCarousel from "@/components/SwiperCarousel";
import { IMAGES } from "@/constants/Images";
import Image from "next/image";

const productImages = [
  IMAGES.product16,
  IMAGES.product8,
  IMAGES.product6,
  IMAGES.product4,
  IMAGES.product,
  IMAGES.product11,
  IMAGES.product7,
  IMAGES.product8,
];

const productCards = Array(8)
  .fill(0)
  .map((_, index) => (
    <ProductCard key={index} imageSrc={productImages[index]} />
  ));

const BannerProduct = () => {
  return (
    <div className="rounded-xl bg-brand-600 overflow-hidden">
      <div className="relative h-[500px] w-full flex justify-center items-center bg-bannerProduct bg-cover bg-center bg-no-repeat">
        <div className="absolute top-10 left-0 rounded-r-full bg-gradient-to-r from-warning-lighter to-warning-light px-12 py-2.5">
          <p className="text-2xl font-bold text-error-darker uppercase">
            mới cực hot!
          </p>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-10 flex flex-col gap-5 max-w-[60%]">
          <div className="relative inline-block text-[80px] font-extrabold uppercase tracking-tighter select-none">
            <h2
              className="absolute top-0 left-0 text-[#1250EF]"
              style={{ WebkitTextStroke: "8px #1250EF" }}
            >
              tải app nhận quà
            </h2>

            <h2 className="relative text-white">
              tải app nhận quà
            </h2>
          </div>

          <p className="text-[32px]/[48px] font-medium text-warning-light">
            Tích điểm ngay trên app{" "}
            <span className="font-extrabold">SUNFIL1</span>
            <br />
            *100K = 10 điểm
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-[50%]">
          <Image
            src={IMAGES.banner3}
            width={1000}
            height={1000}
            alt="banner"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="p-12 pb-10">
        <SwiperCarousel
          items={productCards}
          slidesPerView={6}
          spaceBetween={8}
           navigationButtonBgColor="bg-brand-100"
          navigationButtonIconColor="text-brand-800"
          className="banner-product-swiper z-10"
        />
      </div>
    </div>
  );
};

export default BannerProduct;
