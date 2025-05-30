import MenuContent from "@/components/Menu/MenuContent";
import { IMAGES } from "@/constants/Images";
import { MenuItem } from "@/types/categories/ICategoryes";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

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

  const handleMouseLeave = () => {
    setIsOpen(false);
    setActiveItem(null);
  };

  return (
    <div className="w-full container ">
      {/* Sidebar bên trái */}
      <div className="xl:bg-white flex lg:bg-white rounded-b-xl lg:shadow-sm relative lg:h-[600px]">
        <MenuContent
          autoActiveFirstItem={false}
          IsProducts={IsProducts}
          onClose={handleMouseLeave}
          onHover={() => setIsOpen(true)}
          classNameContent="hidden xl:block relative bg-white rounded-bl-xl xl:min-h-[550px]"
          isBanner={true}
          classNameActiveItem="rounded-tr-none"
        />

        <div className="flex-1 flex flex-col gap-2 w-full h-full xl:overflow-hidden rounded-br-xl">
          {/* <div
            className="relative hidden xl:flex w-full h-full overflow-hidden bg-cover bg-center items-center justify-between px-4 md:px-6 lg:px-10 py-6 gap-4"
            style={{
              backgroundImage: "url('/home/TopBanner/banner.png')",
            }}
          >
            <div className="relative z-[2] w-1/2 whitespace-nowrap overflow-hidden text-ellipsis h-full flex flex-col pt-20">
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

            <div className="relative z-[2] w-1/2 h-full">
              <Image
                src="/home/TopBanner/image1.png"
                alt="Lọc dầu xe"
                fill
                className="object-cover"
              />
            </div>
            <Image
              src="/home/TopBanner/Car.png"
              alt="Lọc dầu xe"
              fill
              className="object-cover absolute bottom-0 right-0 left-0"
            />
          </div> */}
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full h-full"
          >
            {bannerSlides?.map((item: any) => (
              <SwiperSlide key={item.id}>
                <Image
                  src={item.image}
                  alt=""
                  width={1000}
                  height={1000}
                  className="object-cover rounded-lg w-full h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center justify-center gap-1.5 xl:hidden">
            <span className="w-2.5 h-[3px] rounded-full bg-grey-400"></span>
            <span className="w-5 h-[3px] rounded-full bg-brand-600"></span>
            <span className="w-2.5 h-[3px] rounded-full bg-grey-400"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
