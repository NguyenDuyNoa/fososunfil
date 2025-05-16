import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, EffectFade } from "swiper/modules";
import MenuContent from "@/components/Menu/MenuContent";
import { MenuItem } from "@/types/categories/ICategoryes";
import Image from "next/image";

// type SidebarItem = {
//   id: string;
//   name: string;
//   icon: React.ReactNode;
// };

type BannerItem = {
  id: string;
  // title: string;
  // highlight: string;
  // subtext?: string;
  image: string;
};

type BannerWithSidebarProps = {
  // sidebarItems: SidebarItem[];
  bannerSlides: BannerItem[];
  items: MenuItem[];
  IsProducts?: boolean;
};
const HeroBanner = ({
  // sidebarItems,
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
    <div className="w-full flex bg-white rounded-b-xl shadow-sm relative h-[600px] ">
      {/* Sidebar bên trái */}
      <MenuContent
        activeItem={activeItem}
        items={items}
        IsProducts={IsProducts}
        setActiveItem={setActiveItem}
        onClose={handleMouseLeave}
        onHover={() => setIsOpen(true)}
        classNameContent="relative  bg-white rounded-bl-xl"
        isBanner={true}
        classNameActiveItem="rounded-tr-none"
      />

      <div className="flex-1  w-full h-full overflow-hidden rounded-br-xl">
        {/* <Swiper
          effect={"fade"}
          modules={[Autoplay, EffectFade]}
          autoplay={{ delay: 1000 }}
          loop
          slidesPerView={1}
          className="h-full w-full"
        >
          {bannerSlides?.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img
                src={slide.image}
                alt="banner-image"
                className="w-full h-full objtec-fill"
              />
            </SwiperSlide>
          ))}
        </Swiper> */}
        {/* <div
          className="w-full h-full overflow-hidden bg-cover bg-center flex items-center justify-between px-10"
          style={{
            backgroundImage: "url('/home/TopBanner/bgTopBanner.png')",
          }}
        >
         
          <div className="flex-1  h-full pt-[10%]">
            <h2 className="text-[40px] leading-6 font-bold text-white">
              Bộ lọc dầu xe hơi cao cấp
            </h2>
            <h1
              // className="text-8xl leading-tight italic font-extrabold bg-linear-text-banner bg-clip-text text-transparent my-3"
              className="text-8xl italic font-extrabold leading-[1.1] my-3"
              style={{
                background:
                  "var(--gradient-warning-light, linear-gradient(135deg, var(--warning-lighter, #FFF5CC) 0%, var(--warning-light, #FFD666) 100%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mua 10 tặng 2
            </h1>
            <p className="italic text-2xl  text-[#1C252E]">*Số lượng có hạn</p>
          </div>
     
          <div className="relative size-[500px]">
            <Image
              src="/home/TopBanner/image1.png"
              alt="Lọc dầu xe"
              fill
              className="object-cover"
            />
          </div>
        </div> */}
        <div
          className="w-full h-full overflow-hidden bg-cover bg-center flex items-center justify-between px-4 md:px-6 lg:px-10 py-6 gap-4"
          style={{
            backgroundImage: "url('/home/TopBanner/bgTopBanner.png')",
          }}
        >
          {/* Text bên trái */}
          <div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis h-full pt-[10%]">
            <h2 className="xxl:text-[40px]  text-2xl font-bold text-white">
              Bộ lọc dầu xe hơi cao cấp
            </h2>
            <h1
              className="3xl:text-8xl xxl:text-[80px] text-6xl italic font-extrabold leading-[1.1] my-3"
              style={{
                background:
                  "var(--gradient-warning-light, linear-gradient(135deg, var(--warning-lighter, #FFF5CC) 0%, var(--warning-light, #FFD666) 100%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mua 10 tặng 2
            </h1>
            <p className="italic 3xl:text-2xl xl:text-2xl text-lg text-[#1C252E]">
              *Số lượng có hạn
            </p>
          </div>

          {/* Ảnh bên phải */}
          <div className="relative 2xl:size-[500px] xxl:size-[400px] size-[350px]">
            <Image
              src="/home/TopBanner/image1.png"
              alt="Lọc dầu xe"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
