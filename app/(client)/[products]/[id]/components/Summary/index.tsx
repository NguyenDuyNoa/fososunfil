import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { IMAGES } from "@/constants/Images";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import { useState } from "react";

const StarDrawing = (
  <path d="M13.6331 16.5003C13.4999 16.5008 13.3684 16.4694 13.2498 16.4086L8.9998 14.1836L4.7498 16.4086C4.6118 16.4812 4.4562 16.5136 4.3007 16.5021C4.1452 16.4906 3.99603 16.4358 3.87016 16.3438C3.74429 16.2517 3.64675 16.1263 3.58865 15.9816C3.53054 15.8369 3.5142 15.6788 3.54147 15.5253L4.3748 10.8336L0.941469 7.50027C0.83435 7.39338 0.758362 7.25933 0.721659 7.11252C0.684955 6.9657 0.688923 6.81167 0.733135 6.66694C0.781435 6.51883 0.870282 6.38723 0.989594 6.28707C1.10891 6.18691 1.2539 6.12219 1.40814 6.10027L6.15814 5.4086L8.2498 1.1336C8.31804 0.992712 8.42458 0.87389 8.55723 0.79075C8.68987 0.707609 8.84326 0.663513 8.9998 0.663513C9.15635 0.663513 9.30973 0.707609 9.44238 0.79075C9.57502 0.87389 9.68156 0.992712 9.7498 1.1336L11.8665 5.40027L16.6165 6.09194C16.7707 6.11386 16.9157 6.17857 17.035 6.27874C17.1543 6.3789 17.2432 6.5105 17.2915 6.6586C17.3357 6.80333 17.3396 6.95737 17.3029 7.10418C17.2662 7.251 17.1903 7.38504 17.0831 7.49194L13.6498 10.8253L14.4831 15.5169C14.5129 15.6732 14.4973 15.8347 14.4382 15.9823C14.3792 16.13 14.2791 16.2577 14.1498 16.3503C13.9989 16.456 13.8172 16.5088 13.6331 16.5003Z" />
);

const customStyles = {
  itemShapes: StarDrawing,
  activeFillColor: "#FFAB00",
  inactiveFillColor: "#919EAB",
};

// Add styles to hide number input spinners
const hideNumberInputSpinners = `
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

const ProductSummary = ({ data }: { data: any }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < 1234) {
      // Assuming 1234 is the max available quantity
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value >= 1 && value <= 1234) {
        // Assuming 1234 is the max available quantity
        setQuantity(value);
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };
  console.log(typeof data);
  console.log(data);
  return (
    <>
      <style>{hideNumberInputSpinners}</style>
      {data ? (
        <div className="flex flex-col gap-4 xl:gap-8 flex-1 xl:w-1/2 px-3 xl:px-0 pb-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1 xl:hidden">
              <Rating
                value={data?.reviewItem?.totalRating}
                readOnly
                style={{ maxWidth: 100 }}
                itemStyles={customStyles}
              />
              <p className="text-sm text-primary-new">
                {data?.reviewItem?.totalRating}{" "}
                <span className="text-secondary-new">
                  {" "}
                  ({data?.reviewItem?.totalReview})
                </span>
              </p>
            </div>
            <h2 className="text-xl xl:text-[32px]/[48px] text-[#374151] font-semibold">
              {data?.name}
            </h2>
            <div className="flex items-center gap-3">
              <div className="xl:flex items-center gap-1 hidden">
                <Rating
                  value={data?.reviewItem?.totalRating}
                  readOnly
                  style={{ maxWidth: 100 }}
                  itemStyles={customStyles}
                />
                <p className="text-sm text-primary-new">
                  {data?.reviewItem?.totalRating}{" "}
                  <span className="text-secondary-new">
                    {" "}
                    ({data?.reviewItem?.totalReview})
                  </span>
                </p>
              </div>
              {/* <div className="xl:pl-3 flex items-center gap-1 xl:border-l xl:border-[#919EAB33]">
              <span className="text-sm text-secondary-600 font-normal">
                EAN:{" "}
              </span>
              <span className="text-sm text-primary-new font-medium">
                4059191689859
              </span>
            </div> */}
              <div className="pl-3 flex items-center gap-1 border-l border-[#919EAB33]">
                <span className="text-sm text-secondary-600 font-medium">
                  Thương hiệu:{" "}
                </span>
                <span className="text-sm text-brand-700 font-medium underline">
                  {data?.brand?.name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl xl:text-[32px]/[38px] font-bold text-error-dark">
                {data?.price_promotion?.toLocaleString()}{" "}
                <span className="underline">đ</span>
              </h3>
              <div className="flex items-center gap-3 xl:pl-3 xl:border-l xl:border-[#919EAB33]">
                <h3 className="text-sm xl:text-2xl/[24px] font-normal line-through text-[#919EAB]">
                  {Number(data?.price).toLocaleString()}{" "}
                  <span className="underline">đ</span>
                </h3>
                <span className="text-xs xl:text-sm text-white font-bold py-1 px-2 xl:px-3 rounded-full bg-error-main">
                  -{data?.percent}%
                </span>
              </div>
            </div>
            {/* <p className="text-base font-medium italic text-secondary-new">
            Giá bán đã bao gồm 8% VAT
          </p> */}
          </div>
          <div className="flex flex-col gap-2 xl:gap-4">
            <div className="flex items-center gap-2 xl:gap-4">
              <Image
                src={IMAGES.checkOne}
                alt="check"
                width={24}
                height={24}
                className="size-5 xl:size-6"
              />
              <p className="text-sm xl:text-base font-normal text-grey-700">
                Tăng hiệu suất động cơ, hiệu năng bền bỉ
              </p>
            </div>
            <div className="flex items-center gap-2 xl:gap-4">
              <Image
                src={IMAGES.checkOne}
                alt="check"
                width={24}
                height={24}
                className="size-5 xl:size-6"
              />
              <p className="text-sm xl:text-base font-normal text-grey-700">
                Tăng tuổi thọ động cơ, tiết kiệm chi phí
              </p>
            </div>
            <div className="flex items-center gap-2 xl:gap-4">
              <Image
                src={IMAGES.checkOne}
                alt="check"
                width={24}
                height={24}
                className="size-5 xl:size-6"
              />
              <p className="text-sm xl:text-base font-normal text-grey-700">
                Tốt cho sức khỏe, Thân thiện với môi trường
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col xl:flex-row items-center gap-3 xl:gap-6 w-full">
              <div className="flex items-center gap-6 justify-between w-full xl:w-auto">
                <h4 className="text-base font-medium text-secondary-new whitespace-nowrap">
                  Số lượng
                </h4>
                <div className="flex items-center rounded-lg border border-[#DFE4EA] overflow-hidden min-w-[122px]">
                  <button
                    className="p-2 flex justify-center items-center h-full border-r border-[#DFE4EA]"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                  >
                    <MinusIcon
                      className={`size-4 ${
                        quantity <= 1 ? "text-[#919EAB66]" : "text-[#919EABCC]"
                      }`}
                    />
                  </button>
                  <div className="flex-1 h-full flex justify-center items-center py-1">
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      onFocus={handleFocus}
                      className="w-full text-center text-sm xl:text-base font-medium text-primary-new focus:outline-none"
                      min="1"
                      max="1234"
                    />
                  </div>
                  <button
                    className="p-2 flex justify-center items-center h-full border-l border-[#DFE4EA]"
                    onClick={handleIncrement}
                    disabled={quantity >= 1234}
                  >
                    <PlusIcon
                      className={`size-4 ${
                        quantity >= 1234
                          ? "text-[#919EAB66]"
                          : "text-[#919EABCC]"
                      }`}
                    />
                  </button>
                </div>
              </div>
              <h4 className="w-full xl:w-auto flex justify-end text-xs xl:text-base font-medium text-secondary-new">
                còn 1234 sản phẩm
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={IMAGES.flashSale}
                alt=""
                width={40}
                height={40}
                className="size-5 xl:size-6"
              />
              <p className="text-sm xl:text-base font-medium text-grey-700">
                Có 20 người thêm vào giỏ hàng & 4 người đang xem
              </p>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white xl:static px-3 py-2 xl:px-0 xl:py-0 z-20 flex flex-col gap-2.5 xl:gap-4 w-full xl:w-[491px]">
              <button className="bg-brand-500 rounded-lg py-3 text-white text-sm xl:text-base font-bold">
                Mua ngay
              </button>
              <div className="flex items-center gap-3 xl:gap-4">
                <button className="w-full flex items-center gap-2 justify-center border border-brand-500 rounded-lg py-3 text-brand-500 text-sm xl:text-base font-medium">
                  <Image
                    src={IMAGES.cart}
                    alt="check"
                    width={24}
                    height={24}
                    className="size-5 xl:size-6"
                  />
                  Thêm vào giỏ hàng
                </button>
                <button className="w-full border border-brand-500 rounded-lg py-3 text-brand-500 text-sm xl:text-base font-medium">
                  Xem OEM
                </button>
              </div>
            </div>
            <div className="hidden xl:flex items-center gap-6">
              <div className="flex items-center gap-3">
                <p className="text-sm font-normal text-secondary-900">
                  Chia sẻ
                </p>
                <div className="flex items-center gap-2">
                  <Image
                    src={IMAGES.messenger}
                    alt="messenger"
                    width={24}
                    height={24}
                  />
                  <Image
                    src={IMAGES.facebook}
                    alt="facebook"
                    width={24}
                    height={24}
                  />
                  <Image
                    src={IMAGES.instagram}
                    alt="instagram"
                    width={24}
                    height={24}
                  />
                  <Image src={IMAGES.zalo} alt="zalo" width={24} height={24} />
                </div>
                <hr className="w-7 border-[#919EAB33] rotate-90" />
                <div className="flex items-center gap-2">
                  <Image
                    src={IMAGES.heart}
                    alt="heart"
                    width={24}
                    height={24}
                  />
                  <p className="text-sm font-medium text-primary-new">
                    Đã thích{" "}
                    <span className="text-secondary-600 font-normal">(12)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 xl:gap-8 flex-1 xl:w-1/2 px-3 xl:px-0 pb-3">
          <div className="flex flex-col gap-3">
            <Skeleton className="w-full h-[96px]" />
            <div className="flex gap-3">
              <Skeleton className="w-[122px] h-[20px]" />
              <Skeleton className="w-[122px] h-[20px]" />
            </div>
          </div>
          <div className="flex gap-4">
            <Skeleton className="w-[160px] h-[40px]" />
            <Skeleton className="w-[190px] h-[40px]" />
          </div>
          <div className="flex flex-col gap-2 xl:gap-4">
            <Skeleton className="w-[2/3] h-[24px]" />
            <Skeleton className="w-[2/3] h-[24px]" />
            <Skeleton className="w-[2/3] h-[24px]" />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col xl:flex-row items-center gap-3 xl:gap-6 w-full">
              <div className="flex items-center gap-6 justify-between w-full xl:w-auto">
                <Skeleton className="w-[80px] h-[32px]" />
                <Skeleton className="w-[120px] h-[32px]" />
                <Skeleton className="w-[150px] h-[32px]" />
              </div>
            </div>
            <Skeleton className="w-full h-[24px]" />
            <div className="flex flex-col gap-2.5 xl:gap-4">
              <Skeleton className="w-full h-[48px]" />
              <div className="flex items-center gap-3 xl:gap-4">
                <Skeleton className="w-full h-[50px]" />
                <Skeleton className="w-full h-[50px]" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="w-[180px] h-[24px]" />
                <Skeleton className="w-[120px] h-[24px]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSummary;
