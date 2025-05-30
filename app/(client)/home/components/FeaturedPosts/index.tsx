import { IMAGES } from "@/constants/Images";
import BlogCardVerticalBig from "@/components/card/blog/BlogCardVerticalBig";
import Image from "next/image";
import Link from "next/link";
import DoubleArrowRightIcon from "@/components/icons/DoubleArrowRight";
import { useResizeStore } from "@/stores/useResizeStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import React from "react";
import { useBlogList } from "@/managers/api-management/blog/useBlogList";

const mockData = [
  {
    id: "1",
    title: "Đầu phun sprinkler là gì? Cấu tạo, ứng dụng và nguyên lý hoạt động",
    featured_image: "/example/blogs/b1.png",
    name_category: ["Car", "Oil"],
    color_category: "#FF592C",
    date: "2023-05-15",
  },
  {
    id: "2",
    title: "Check Valve là gì? 4 loại Check Valve phổ biến nhất hiện nay",
    featured_image: "/example/blogs/b2.png",
    name_category: ["Car", "Oil"],
    color_category: "#2E8FFA",
    date: "2023-06-20",
  },
  {
    id: "3",
    title: "Bảng đơn vị đo áp suất thông dụng nhất hiện nay",
    featured_image: "/example/blogs/b3.png",
    name_category: ["Cabin"],
    color_category: "#FFAC05",
    date: "2023-07-08",
  },
  {
    id: "4",
    title: "Bật mí các loại ống thủy lực phổ biến nhất hiện nay",
    featured_image: "/example/blogs/b4.png",
    name_category: ["Car", "Oil"],
    color_category: "#FF592C",
    date: "2023-08-12",
  },
];

const breakpoints = {
  320: { slidesPerView: 1.5 },
  640: { slidesPerView: 3 },
  768: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
  1280: { slidesPerView: 4 },
};

const FeaturedPosts = () => {
  const { isVisibleMobile } = useResizeStore();
  const { data: listBlog } = useBlogList({
    page: 1,
    limit: 10,
    is_show_home: 1,
  });
  const newData = listBlog?.pages[0].new;

  return (
    <div className="relative container w-full rounded-md">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between gap-2 z-10">
          <div className="flex items-center gap-2">
            <Image
              src={IMAGES.star}
              alt=""
              width={40}
              height={40}
              className="size-6 lg:size-10"
            />
            <h2 className="text-base xl:text-2xl font-bold text-primary-new capitalize">
              Bài viết nổi bật
            </h2>
          </div>
          <div className="py-1 xl:px-3 rounded-[20px] flex items-center gap-1 xl:gap-2 cursor-pointer transition-all duration-300 xl:hover:bg-brand-500 xl:hover:bg-opacity-10 group">
            <Link
              href="/blogs"
              className="text-[8px] xl:text-base font-semibold text-brand-500 whitespace-nowrap group-hover:font-bold"
            >
              Xem tất cả{" "}
            </Link>
            <DoubleArrowRightIcon className="text-brand-500 size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
        <div className="relative h-full mb-[2px]">
          <Swiper
            modules={[Navigation]}
            spaceBetween={isVisibleMobile ? 8 : 16}
            slidesPerView={isVisibleMobile ? 2.5 : 6}
            breakpoints={breakpoints}
            className="swiper-carousel flash-sale-swiper z-10 h-full"
          >
            {newData?.map((item:any) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <BlogCardVerticalBig
                  id={item.id}
                  title={item.title}
                  featured_image={item.featured_image}
                  name_category={item.name_category}
                  color_category={item.color_category}
                  date={item.date}
                  className="bg-white"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
