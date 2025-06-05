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
  const [activeSlide, setActiveSlide] = useState(0);

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
          onClose={handleMouseLeave}
          onHover={() => setIsOpen(true)}
          classNameContent="hidden xl:block relative bg-white rounded-bl-xl"
          isBanner={true}
        />

        <div className="flex-1 flex flex-col gap-2 w-full h-full xl:overflow-hidden rounded-br-xl">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full h-full"
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          >
            {bannerSlides?.map((item: any) => (
              <SwiperSlide key={item.id} className="w-full min-h-full">
                <Image
                  src={item.image}
                  alt=""
                  width={1000}
                  height={1000}
                  className="object-cover rounded-lg xl:rounded-br-lg w-full h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center justify-center gap-1.5 xl:hidden">
            {bannerSlides?.map((item: any, index: number) => (
              <span 
                key={item.id} 
                className={`h-[3px] rounded-full ${
                  activeSlide === index ? "w-5 bg-brand-600" : "w-2.5 bg-grey-400"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
