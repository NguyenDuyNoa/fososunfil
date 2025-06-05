import IconShopping from "@/components/icon/IconShopping";
import CloseIcon from "@/components/icons/CloseIcon";
import { IMAGES } from "@/constants/Images";
import { useCartStore } from "@/stores/useCartStore";
import { CartItem } from "@/types/cart/ICart";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

// Biến static để theo dõi việc fetch dữ liệu giỏ hàng
let hasInitiallyFetchedCart = false;

const Cart = () => {
  const {
    isCartOpen,
    closeCart,
    openCart,
    items,
    totalItems,
    totalPrice,
    isLoading,
    fetchCart,
    removeFromCartAPI,
  } = useCartStore();
  const pathname = usePathname();
  const isCartPage = pathname === "/cart";
  const fetchedRef = useRef(false);
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isCartPage && !hasInitiallyFetchedCart) {
      fetchCart();
      hasInitiallyFetchedCart = true;
    }
  }, [fetchCart, isCartPage]);

  useEffect(() => {
    if (isCartOpen && !isCartPage && !fetchedRef.current) {
      fetchedRef.current = true;
    } else if (!isCartOpen) {
      setTimeout(() => {
        fetchedRef.current = false;
      }, 300);
    }
  }, [isCartOpen, isCartPage]);

  // Xử lý đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Kiểm tra nếu không phải là nút "Thêm vào giỏ" hoặc "Mua ngay"
      const isAddToCartButton = target.closest('button')?.textContent?.includes('Thêm vào giỏ');
      const isBuyNowButton = target.closest('button')?.textContent?.includes('Mua ngay');
      
      if (!target.closest(".cart-dropdown") && isCartOpen && !isAddToCartButton && !isBuyNowButton) {
        closeCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, closeCart]);

  const handleMouseEnter = useCallback(() => {
    if (isCartPage || isCartOpen) return;
    openCart();
  }, [isCartOpen, openCart, isCartPage]);

  const handleMouseLeave = useCallback(() => {
    if (isCartOpen) {
      closeCart();
    }
  }, [isCartOpen, closeCart]);

  const handleRemoveItem = useCallback(
    (id: string | number) => {
      removeFromCartAPI(id);
    },
    [removeFromCartAPI]
  );

  const handleCloseDropdown = useCallback(() => {
    closeCart();
  }, [closeCart]);

  // Render một item trong giỏ hàng
  const renderCartItem = useCallback(
    (item: CartItem) => {
      const imageUrl = Array.isArray(item.images)
        ? item.images[0]
        : item.images;

      const handleItemRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleRemoveItem(item.id);
      };

      return (
        <div key={`${item.id}-${item.quantity}`} className="flex gap-4 py-1">
          <Image
            src={imageUrl}
            alt={item.name}
            width={64}
            height={64}
            className="object-cover w-16 h-16 rounded-xl"
          />
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-sm font-semibold text-primary-new line-clamp-2">
              {item.name}
            </p>

            <div className="flex gap-2 justify-between items-center">
              <span className="text-sm font-normal text-primary-new">
                x{item.quantity}
              </span>
              <div className="flex items-center gap-2">
                {Number(item.price) > Number(item.price_discount) &&
                  Number(item.price_discount) > 0 && (
                    <p className="text-xs font-normal text-disable-50 line-through">
                      {Number(item.price).toLocaleString()}{" "}
                      <span className="underline">đ</span>
                    </p>
                  )}
                <p className="text-base font-normal text-error-dark">
                  {Number(item.price_discount || item.price).toLocaleString()}{" "}
                  <span className="underline">đ</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              className="bg-grey-200 rounded p-1 hover:bg-gray-200 transition-all duration-300 group"
              onClick={handleItemRemove}
            >
              <CloseIcon className="size-4 text-primary-new group-hover:text-red-400 transition-all duration-300" />
            </button>
          </div>
        </div>
      );
    },
    [handleRemoveItem]
  );

  // Render nội dung giỏ hàng
  const renderCartContent = useCallback(() => {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-4 items-center justify-center py-4">
           <Image
            src={IMAGES.cartEmpty}
            alt="Giỏ hàng trống"
            width={200}
            height={200}
          />
          <p className="text-sm text-secondary-new">Đang tải giỏ hàng...</p>
        </div>
      );
    }

    if (!items || items.length === 0) {
      return (
        <div className="flex flex-col gap-4 items-center justify-center py-4">
          <Image
            src={IMAGES.cartEmpty}
            alt="Giỏ hàng trống"
            width={200}
            height={200}
          />
          <p className="text-sm text-secondary-new">
            Giỏ hàng của bạn đang trống
          </p>
        </div>
      );
    }

    return items.map(renderCartItem);
  }, [isLoading, items, renderCartItem]);

  return (
    <div
      className="relative cart-dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/cart"
        className="hidden xl:flex items-center gap-2 cursor-pointer relative hover:bg-brand-50 rounded-full py-1 px-2"
      >
        <IconShopping fill="#0154C5" className="size-9" />
        <span className="text-sm font-medium whitespace-nowrap text-primary-new">
          Giỏ hàng
        </span>
        <div className="absolute -top-3 left-[22px] bg-error-main rounded-full size-6 flex items-center justify-center">
          <span className="text-white text-xs font-medium mt-0.5">
            {totalItems}
          </span>
        </div>
      </Link>
      <Link
        href="/cart"
        className="xl:hidden flex items-center gap-2 cursor-pointer relative bg-[#0154C5] p-2 rounded-full"
      >
        <IconShopping fill="white" className="size-5" />
        <div className="absolute top-0 right-0 bg-error-main rounded-full size-4 flex items-center justify-center">
          <span className="text-white text-[10px]/[16px] font-medium mt-0.5">
            {totalItems}
          </span>
        </div>
      </Link>

      {/* Đoạn đệm để ngăn dropdown bị đóng khi di chuột từ giỏ hàng xuống dropdown */}
      {isCartOpen && (
        <div className="absolute top-full left-0 right-0 h-5 z-20"></div>
      )}

      {isCartOpen && (
        <div
          className={`absolute top-[calc(100%+14px)] right-0 w-[400px] max-h-[70vh] z-20 border border-gray-200 py-5 px-4 bg-white rounded-xl flex flex-col gap-4 cart-dropdown transform transition-all duration-500 ease-in-out ${
            isCartOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
          }`}
        >
          {/* Arrow pointing to cart */}
          <div className="absolute -top-[9px] right-5 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200"></div>

          <div className="flex items-center gap-2 justify-between">
            <h3 className="text-lg font-semibold whitespace-nowrap text-primary-new">
              Giỏ hàng
            </h3>
            <span className="text-sm font-normal text-secondary-new">
              {totalItems} sản phẩm
            </span>
          </div>
          <hr className="border-[#919EAB3D]" />

          <div className="flex flex-col gap-3 overflow-y-auto max-h-[250px] cart-items-container">
            {renderCartContent()}
          </div>

          {!isLoading && items && items.length > 0 && (
            <>
              <hr className="border-[#919EAB3D] border-dashed" />
              <div className="flex items-center gap-2 justify-between">
                <p className="text-xl font-semibold whitespace-nowrap text-primary-new">
                  Tổng cộng
                </p>
                <span className="text-xl font-semibold text-error-dark">
                  {Number(totalPrice).toLocaleString()}{" "}
                  <span className="underline">đ</span>
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href="/cart"
                  className="text-center text-base font-bold text-white bg-brand-500 hover:bg-brand-400 transition-all duration-300 rounded-lg py-3 px-4"
                  onClick={handleCloseDropdown}
                >
                  Đặt hàng ngay
                </Link>
                <button
                  className="bg-white hover:bg-brand-50 text-brand-500 border border-transparent hover:border-brand-500 rounded-lg py-3 px-4 transition-all duration-300"
                  onClick={handleCloseDropdown}
                >
                  Tiếp tục mua hàng
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
