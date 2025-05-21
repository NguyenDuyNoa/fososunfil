import { FORMAT_DATE } from "@/constants/FormatDate";
import { momentCore } from "@/lib/moment";
import ConvertToSlug from "@/utils/convertToSlug/ConvertToSlug";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";

type Tag = {
  id: number;
  name: string;
};

type Blog = {
  id: ReturnType<typeof uuidv4>;
  name: string;
  image: string;
  tag: Tag[];
  avata: string;
  date: string;
  user: string;
};

interface Content {
  id: string;
  title?: string;
  content?: string;
  date?: string;
  featured_image?: string;
  name_category?: string[];
  post_category_id?: string;
  view?: string;
  color_category?: string;
  className?: string;
}

const color = {
  1: "#FF592C",
  2: "#2E8FFA",
  3: "#FFAC05",
} as any;
const BlogCardVerticalBig = ({
  content,
  date,
  featured_image,
  id,
  name_category,
  post_category_id,
  title,
  view,
  color_category,
  className,
}: Content) => {
  return (
    <Link
      href={`/blogs/${id}?${ConvertToSlug(title)}`}
      className={`border group border-[#DCDFE4] rounded-2xl p-4 flex flex-col lg:gap-8 gap-6 h-full w-full ${className}`}
    >
      <div className="overflow-hidden rounded-xl bg-white w-full aspect-4/3">
        <Image
          alt={"image"}
          src={featured_image || ""}
          width={1280}
          height={1024}
          className="size-full rounded-xl object-cover group-hover:scale-110 custom-transition"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {/* {name_category?.map((cat, idx) => (
              <div
                style={{ backgroundColor: color_category }}
                className="text-[#FCFCFD] font-medium p-1.5 px-2 uppercase text-xs h-[26px]"
              >
                <span key={idx}>{cat}</span>
              </div>
            ))} */}
            <div
              style={{ backgroundColor: color_category }}
              className="text-[#FCFCFD] font-medium p-1.5 px-2 uppercase text-xs"
            >
              {name_category}
            </div>
          </div>
          <h1 className="text-[#23262F] font-bold xxl:text-2xl text-xl line-clamp-3">
            {title}
          </h1>
        </div>
        <div className="flex justify-start items-center">
          <h2 className="text-[#1A1B20A3] font-normal text-base">
            {date ? momentCore(date).format(FORMAT_DATE.MMM_D_YYYY) : ""}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default BlogCardVerticalBig;
