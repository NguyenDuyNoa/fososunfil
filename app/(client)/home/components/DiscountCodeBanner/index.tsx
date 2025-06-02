import Image from "next/image";

const DiscountCodeBanner = ({ banner }: { banner: any }) => {
  return (
    <div className="container">
      {/* <div className="py-1.5 xl:py-3 flex xl:gap-3 justify-center items-center bg-discountCodeBanner bg-cover bg-center bg-no-repeat w-full rounded-xl">
        <div className="relative">
          <Image
            src={IMAGES.union}
            alt="union"
            width={158}
            height={124}
            className="w-[70px] xl:w-[158px] h-full"
          />
          <div className="text-error-main absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-[60%] rotate-[-15deg]">
            <h4 className="text-[8px] xl:text-xl whitespace-nowrap">Giảm giá</h4>
            <span className="text-xl xl:text-5xl font-bold">35%</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 xl:gap-3 justify-center items-center">
          <div className="flex items-center gap-2 xl:gap-4">
            <h4 className="text-white text-xs xl:text-2xl font-semibold">
              Nhập mã
            </h4>
            <p className="py-1 px-2 xl:py-2 xl:px-4 bg-brand-800 text-white text-xs xl:text-[32px]/[34px] font-semibold uppercase border xl:border-[3px] border-brand-200 rounded-lg xl:rounded-xl">
              Nguoimoi
            </p>
          </div>
          <p className="text-white text-[8px] xl:text-base font-normal italic">
            *Áp dụng cho khách hàng mới với hoá đơn từ 1 triệu.
          </p>
        </div>
      </div> */}
      <Image
        src={banner?.image}
        alt="banner"
        width={1280}
        height={1000}
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  );
};

export default DiscountCodeBanner;
