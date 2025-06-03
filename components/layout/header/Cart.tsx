import IconShopping from "@/components/icon/IconShopping";
import Link from "next/link";

const Cart = () => {
  return (
    <>
      <Link
        href="/cart"
        className="hidden xl:flex items-center gap-2 cursor-pointer relative hover:bg-brand-50 rounded-full py-1 px-2"
      >
        <IconShopping fill="#0154C5" className="size-9" />
        <span className="text-sm font-medium whitespace-nowrap text-primary-new">
          Giỏ hàng
        </span>
        <div className="absolute -top-3 left-[22px] bg-error-main rounded-full size-6 flex items-center justify-center">
          <span className="text-white text-xs font-medium mt-0.5">12</span>
        </div>
      </Link>
      <Link href="/cart" className="xl:hidden flex items-center gap-2 cursor-pointer relative bg-[#0154C5] p-2 rounded-full">
        <IconShopping fill="white" className="size-5" />
        <div className="absolute top-0 right-0 bg-error-main rounded-full size-4 flex items-center justify-center">
          <span className="text-white text-[10px]/[16px] font-medium mt-0.5">
            12
          </span>
        </div>
      </Link>
    </>
  );
};

export default Cart;
