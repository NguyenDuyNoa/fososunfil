import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, EffectFade } from "swiper/modules";
import MenuContent from "@/components/Menu/MenuContent";
import { MenuItem } from "@/types/categories/ICategoryes";
import { IMAGES } from "@/constants/Images";
import Image from "next/image";

type BannerItem = {
  id: string;
  image: string;
};

type BannerWithSidebarProps = {
  bannerSlides: BannerItem[];
  items: MenuItem[];
  IsProducts?: boolean;
};
const HeroBanner = ({
  bannerSlides,
  items,
  IsProducts = false,
}: BannerWithSidebarProps) => {
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  // Đóng dropdown chỉ khi ra khỏi container hoàn toàn
  const handleMouseLeave = () => {
    setIsOpen(false);
    setActiveItem(null);
  };
  return (
    <div className="w-full container flex lg:bg-white rounded-b-xl lg:shadow-sm relative lg:h-[600px]">
      {/* Sidebar bên trái */}
      <MenuContent
        activeItem={activeItem}
        items={items}
        IsProducts={IsProducts}
        setActiveItem={setActiveItem}
        onClose={handleMouseLeave}
        onHover={() => setIsOpen(true)}
        classNameContent="hidden lg:block relative bg-white rounded-bl-xl xxl:min-h-[600px] xl:min-h-[550px]"
        isBanner={true}
        classNameActiveItem="rounded-tr-none"
      />

      <div className="flex-1 flex flex-col gap-2 w-full h-full lg:overflow-hidden rounded-lg lg:rounded-br-xl">
        <div
          className="hidden lg:flex w-full h-full overflow-hidden bg-cover bg-center items-center justify-between px-4 md:px-6 lg:px-10 py-6 gap-4"
          style={{
            backgroundImage: "url('/home/TopBanner/bgTopBanner.png')",
          }}
        >
          <div className="w-1/2 whitespace-nowrap overflow-hidden text-ellipsis h-full flex flex-col justify-center">
            <h2 className="text-[32px]/[24px] font-bold text-white">
              Bộ lọc dầu xe hơi cao cấp
            </h2>
            <h1
              className="text-[64px]/[24px] italic font-extrabold leading-[1.1] my-3"
              style={{
                background:
                  "var(--gradient-warning-light, linear-gradient(135deg, var(--warning-lighter, #FFF5CC) 0%, var(--warning-light, #FFD666) 100%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mua 10 tặng 2
            </h1>
            <p className="italic text-base text-[#1C252E]">
              *Số lượng có hạn
            </p>
          </div>

          <div className="relative w-1/2 h-full">
            <Image
              src="/home/TopBanner/image1.png"
              alt="Lọc dầu xe"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <Image
          src={IMAGES.imageUrl}
          alt=""
          width={1000}
          height={1000}
          className="object-cover rounded-lg w-full lg:hidden h-[170px]"
        />
        <div className="flex items-center justify-center gap-1.5 lg:hidden">
          <span className="w-2.5 h-[3px] rounded-full bg-grey-400"></span>
          <span className="w-5 h-[3px] rounded-full bg-brand-600"></span>
          <span className="w-2.5 h-[3px] rounded-full bg-grey-400"></span>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
