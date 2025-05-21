import { IMAGES } from "@/constants/Images";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  imageSrc?: string;
  classNameImage?: string;
  isBanner?: boolean;
  className?: string;
  isHorizontal?: boolean;
  buttonText?: string;
}

const ProductCard = ({
  imageSrc = IMAGES.product,
  classNameImage,
  isBanner = false,
  className,
  isHorizontal = false,
  buttonText = "Mua hàng",
}: ProductCardProps) => {
  return (
    <Link
      href={`/products/loc-gio-dong-co-air-filter-chevrolet-colorado-trailblazer-52046262`}
      className={`flex ${
        isHorizontal ? "flex-row h-fit" : "flex-col h-full"
      } w-full h-fit xl:mb-1 bg-white rounded-lg border border-[#919EAB33] shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12),0px_0px_2px_0px_rgba(145,158,171,0.20)] group overflow-hidden hover:shadow-[0px_16px_32px_-4px_rgba(145,158,171,0.2)] cursor-pointer ${className}`}
    >
      <div
        className={`p-1 rounded-sm ${
          isHorizontal ? "w-1/2 h-fit" : "flex-1"
        } flex items-center justify-center overflow-hidden`}
      >
        <div className="overflow-hidden w-full aspect-square rounded-sm">
          <Image
            src={imageSrc}
            alt="product"
            width={400}
            height={400}
            className="w-full aspect-square object-cover rounded-sm transition-transform duration-300 group-hover:-translate-y-2"
          />
        </div>
      </div>
      <div
        className={`flex flex-col gap-3 xl:gap-4 ${
          isHorizontal
            ? "w-1/2 justify-center p-4 pt-2"
            : "xl:pt-2 xl:p-4 p-2"
        }`}
      >
        {!isBanner && (
          <div className="w-fit flex gap-[3px] xl:gap-1.5 items-center py-[2px] px-1 xl:px-2.5 bg-gradient-to-r from-warning-light to-warning-main rounded-full">
            <div className="flex items-center justify-center size-4 bg-[#FFF1DC] rounded-full">
              <Image
                src={IMAGES.fire}
                alt="fire"
                width={16}
                height={16}
                className="size-2.5 xl:size-4"
              />
            </div>
            <span className="text-[8px] xl:text-sm font-semibold text-error-darker">
              Giá cực sốc
            </span>
          </div>
        )}

        <h4 className="text-primary-new group-hover:text-[#0375F3] text-sm xl:text-base font-semibold line-clamp-2">
          Lọc gió động cơ Air Filter – Chevrolet Colorado, Trailblazer
          (52046262)
        </h4>
        <div className="flex flex-col gap-2">
          <div className="text-error-dark font-semibold text-sm xl:text-xl">
            <span>299,000 </span>
            <span className="underline">đ</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center text-[#919EAB] font-normal text-[10px] xl:text-sm ">
              <p className="line-through">329,000</p>
              <span className="underline">đ</span>
            </div>

            <span className="text-error-dark text-[10px] xl:text-sm font-medium">-10%</span>
          </div>
          {!isBanner && (
            <button className="w-full bg-brand-50 text-brand-600 text-xs xl:text-sm font-bold px-3 py-1 xl:py-2 rounded-lg hover:bg-brand-100 transition-colors duration-300">
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
