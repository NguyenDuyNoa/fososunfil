import { IMAGES } from "@/constants/Images";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStores";
import { useCartStore } from "@/stores/useCartStore";
import { useDialogStore } from "@/stores/useDialogStore";
import { convertToSlug } from "@/utils/format/ConvertToSlug";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface ProductCardProps {
  imageSrc?: string;
  classNameImage?: string;
  isBanner?: boolean;
  className?: string;
  isHorizontal?: boolean;
  buttonText?: string;
  product?: any;
  imageFull?: boolean;
  isFlashSale?: boolean;
  isHome?: boolean;
  isRelated?: boolean;
  handleOpenDialog?: (value: string, type_device: string) => void;
}

const ProductCard = ({
  imageSrc = IMAGES.no_image,
  classNameImage,
  isBanner = false,
  className,
  isHorizontal = false,
  buttonText = "Mua hàng",
  product,
  imageFull = false,
  isFlashSale = false,
  isHome = false,
  isRelated = false,
  handleOpenDialog,
}: ProductCardProps) => {
  const { closeCart, addToCartAPI, fetchCart, addToCartBuyNow, shouldRedirectToCart, resetRedirect } = useCartStore();
  const { informationUser } = useAuthStore();
  const router = useRouter();
  const { setOpenDialogCustom, setStatusDialog, setProductData } =
    useDialogStore();
  
  const [imgSrc, setImgSrc] = useState(product?.images || imageSrc);

  const productSlug = product?.slug || convertToSlug(product?.name) || "";

  const handleImageError = useCallback(() => {
    setImgSrc(IMAGES.no_image);
  }, []);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!informationUser) {
      handleOpenDialog && handleOpenDialog("login", "desktop");
      return;
    }

    if (product) {
      try {
        await addToCartAPI(product.id, product?.quantity || 1);
      } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
      }
    }
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!informationUser) {
      handleOpenDialog && handleOpenDialog("login", "desktop");
      return;
    }

    // Đối với desktop, tiếp tục hành vi mua ngay trực tiếp
    if (window.innerWidth >= 1280) {
      if (product) {
        await addToCartBuyNow(product.id, product?.quantity || 1);
      }
    }
    // Đối với mobile, mở bottom sheet chọn số lượng
    else {
      if (product) {
        setProductData(product);
        setStatusDialog("quantity_selection");
        setOpenDialogCustom(true);
      }
    }
  };

  useEffect(() => {
    if (shouldRedirectToCart) {
      router.push("/cart");
      resetRedirect();
    }
  }, [shouldRedirectToCart, router, resetRedirect]);

  return (
    <div
      className={cn(
        "flex w-full h-fit xl:mb-1 bg-white rounded-lg border border-[#919EAB33] shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12),0px_0px_2px_0px_rgba(145,158,171,0.20)] group overflow-hidden hover:shadow-[0px_16px_32px_-4px_rgba(145,158,171,0.2)]",
        isHorizontal ? "flex-row h-fit" : "flex-col h-full",
        className
      )}
    >
      <Link
        href={`/${product?.slug_category}/${productSlug}-${product?.id}`}
        className={cn(
          "flex items-center justify-center overflow-hidden p-1 rounded-sm",
          isHorizontal ? "w-1/2" : "",
          imageFull ? "flex-1" : ""
        )}
      >
        <div className="overflow-hidden w-full aspect-square rounded-sm">
          <Image
            src={imgSrc}
            alt="product"
            width={400}
            height={400}
            className="w-full aspect-square object-cover rounded-sm transition-transform duration-300 group-hover:-translate-y-2"
            onError={handleImageError}
          />
        </div>
      </Link>

      <div
        className={cn(
          "flex flex-col justify-between gap-2",
          isHorizontal ? "w-1/2 justify-center p-4 pt-2" : "xl:pt-2 xl:p-4 p-2",
          imageFull ? "" : "flex-1",
          isHome && "xl:p-2"
        )}
      >
        <div
          className={cn(`flex flex-col gap-3 xl:gap-4`, isHome && "xl:gap-2")}
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

          <Link
            href={`/${product?.slug_category}/${productSlug}-${product?.id}`}
            className={cn(
              `text-primary-new group-hover:text-[#0375F3] text-sm xl:text-base h-10 xl:h-12 font-semibold line-clamp-2`,
              isHome && "xl:text-sm xl:h-10"
            )}
          >
            {product?.name}
          </Link>
          <div className="flex flex-col gap-2">
            <div
              className={cn(
                `text-error-dark font-semibold text-sm xl:text-xl`,
                isHome && "xl:text-sm"
              )}
            >
              {Number(product?.price_promotion) > 0 ? (
                <>
                  <span>
                    {Number(product?.price_promotion).toLocaleString() ||
                      "299,000"}{" "}
                  </span>
                  <span className="underline">đ</span>
                </>
              ) : (
                <span>Liên hệ</span>
              )}
            </div>
            {Number(product?.percent) &&
            Number(product?.price_promotion) !== 0 ? (
              <div className="flex items-center gap-2.5">
                <div className="flex items-center text-[#919EAB] font-normal text-[10px] xl:text-sm ">
                  <p className="line-through">
                    {Number(product?.price).toLocaleString() || "329,000"}
                  </p>
                  <span className="underline">đ</span>
                </div>

                <span className="text-error-dark text-[10px] xl:text-sm font-medium">
                  -{product?.percent}%
                </span>
              </div>
            ) : null}
            {isFlashSale && (
              <div className="py-1 flex flex-col gap-2">
                <div className="relative">
                  <div className="opacity-20 z-10 h-1.5 rounded-full bg-gradient-to-r from-error-main to-error-dark"></div>
                  <div className="absolute top-0 left-0 w-[80%] z-20 ">
                    <div className="relative h-1.5 rounded-full bg-gradient-to-r from-error-main to-error-dark">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center size-[18px] bg-[#FFF1DC] rounded-full">
                        <Image
                          src={IMAGES.fire}
                          alt="fire"
                          width={16}
                          height={16}
                          className="size-2.5 xl:size-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[10px]/[12px] font-normal text-grey-700">
                  Đã bán 88 sản phẩm
                </p>
              </div>
            )}
          </div>
        </div>
        {!isBanner && (
          <>
            {!isRelated ? (
              <div className="hidden xl:flex justify-between gap-3">
                <button
                  className="whitespace-nowrap w-full bg-brand-50 text-brand-600 text-xs xl:text-sm font-bold px-2 py-1 xl:py-2 rounded-lg hover:bg-brand-100 transition-colors duration-300"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ
                </button>
                <button
                  className="whitespace-nowrap w-full bg-brand-500 text-white text-xs xl:text-sm font-bold px-2 py-1 xl:py-2 rounded-lg hover:bg-brand-400 transition-colors duration-300"
                  onClick={handleBuyNow}
                >
                  Đặt hàng
                </button>
              </div>
            ) : (
              <button
                className="whitespace-nowrap w-full bg-brand-50 text-brand-600 text-xs xl:text-sm font-bold px-2 py-1 xl:py-2 rounded-lg hover:bg-brand-100 transition-colors duration-300"
                onClick={handleBuyNow}
              >
                Đặt hàng
              </button>
            )}
            <button
              className="xl:hidden whitespace-nowrap w-full bg-brand-50 text-brand-600 text-xs font-bold px-3 py-1 rounded transition-colors duration-300"
              onClick={handleBuyNow}
            >
              Đặt hàng
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
