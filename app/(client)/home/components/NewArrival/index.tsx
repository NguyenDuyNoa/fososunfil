import DoubleArrowRightIcon from "@/components/icons/DoubleArrowRight";
import ProductCard from "@/components/productCard";
import SwiperCarousel from "@/components/SwiperCarousel";
import { IMAGES } from "@/constants/Images";
import Image from "next/image";
import Link from "next/link";

const productImages = [
  IMAGES.product12,
  IMAGES.product11,
  IMAGES.product10,
  IMAGES.product9,
  IMAGES.product8,
  IMAGES.product7,
  IMAGES.product6,
  IMAGES.product5,
];

const productCards = Array(8)
  .fill(0)
  .map((_, index) => <ProductCard key={index} imageSrc={productImages[index]} />);
  
const NewArrival = () => {
  return (
    <div className="relative 3xl:p-12 2xl:p-9 xl:p-6 p-4 bg-brand-600 w-full h-fit rounded-xl overflow-hidden">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between gap-2 z-10">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Image src={IMAGES.package} alt="" width={40} height={40} />
              <h2 className="text-[32px]/[32px] font-bold text-white capitalize">
                Hàng mới về
              </h2>
            </div>
          </div>
          <div className="py-1 px-3 rounded-[20px] flex items-center gap-2 cursor-pointer transition-all duration-300 hover:bg-brand-100 hover:bg-opacity-10 group">
            <Link href="/products" className="text-base font-semibold text-brand-100 whitespace-nowrap group-hover:font-bold">
              Xem tất cả{" "}
            </Link>
            <DoubleArrowRightIcon className="text-brand-100 size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
        <SwiperCarousel
          items={productCards}
          slidesPerView={6}
          spaceBetween={16}
          navigationButtonBgColor="bg-brand-100"
          navigationButtonIconColor="text-brand-800"
          className="flash-sale-swiper z-10"
        />
      </div>
    </div>
  );
};

export default NewArrival;

