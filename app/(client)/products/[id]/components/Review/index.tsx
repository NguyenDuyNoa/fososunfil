import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import LikeIcon from "@/components/icons/likeIcon";
import Rating from "@/components/Rating";
import { IMAGES } from "@/constants/Images";
import Image from "next/image";
import React from "react";

// Component hiển thị thanh đánh giá sao
const RatingBar = ({
  stars,
  count,
  percent,
}: {
  stars: number;
  count: string;
  percent: string;
}) => {
  return (
    <div className="flex gap-4 items-center w-full">
      <h4 className="text-sm font-semibold text-primary-new whitespace-nowrap">
        {stars} sao
      </h4>
      <div className="relative h-1 w-full bg-primary-new bg-opacity-30 rounded-full">
        <div
          className={`absolute top-0 left-0 h-1 w-[${percent}] bg-primary-new rounded-full`}
        ></div>
      </div>
      <h4 className="text-sm font-normal text-secondary-new w-12 flex-shrink-0">
        {count}
      </h4>
    </div>
  );
};

// Component hiển thị nút Like
const LikeButton = ({
  active,
  count,
}: {
  active?: boolean;
  count?: number | string;
}) => {
  return (
    <div className="mt-3 flex gap-2 items-center">
      <LikeIcon color={active ? "#0373F3" : "#919EAB"} />
      <span
        className={`text-sm font-medium ${
          active ? "text-primary-new" : "text-secondary-new"
        }`}
      >
        {count || "Hữu ích"}
      </span>
    </div>
  );
};

// Component hiển thị đánh giá của người dùng
const UserReview = ({
  avatarSrc,
  username,
  rating,
  date,
  comment,
  productImages = [],
  likeCount,
}: {
  avatarSrc: string;
  username: string;
  rating: number;
  date: string;
  comment: string;
  productImages?: string[];
  likeCount?: number;
}) => {
  return (
    <div className="px-8 flex gap-4">
      <div>
        <Image
          src={avatarSrc}
          alt="avatar"
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2.5">
          <h3 className="text-base font-bold text-primary-new">{username}</h3>
          <Rating value={rating} readOnly />
          <p className="text-disable-50 text-xs">{date}</p>
        </div>
        <p className="text-sm text-primary-new">{comment}</p>

        {productImages.length > 0 && (
          <div className="mt-2 flex gap-2">
            {productImages.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt="product"
                width={64}
                height={64}
                className="rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        <LikeButton active={!!likeCount} count={likeCount} />
      </div>
    </div>
  );
};

// Component hiển thị phân trang
const Pagination = ({
  currentPage = 1,
  totalPages = 3,
}: {
  currentPage?: number;
  totalPages?: number;
}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center gap-1.5">
        <ArrowRightIcon className="w-6 h-6 rotate-180" />
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`size-8 pt-1 rounded-lg ${
              currentPage === index + 1
                ? "bg-brand-500 text-white"
                : "bg-white text-primary-new"
            } text-sm font-semibold`}
          >
            {index + 1}
          </button>
        ))}
        {totalPages > 3 && (
          <button className="size-8 pt-1 rounded-lg bg-white text-sm font-semibold text-primary-new">
            ...
          </button>
        )}
        <ArrowRightIcon className="w-6 h-6" />
      </div>
    </div>
  );
};

const Review = () => {
  return (
    <div className="rounded-lg bg-white shadow-review">
      <h2 className="text-[28px]/[32px] font-semibold text-primary-new p-8">
        Đánh giá sản phẩm
      </h2>
      <div className="flex border-b border-[#919EAB33] border-dashed">
        <div className="flex-1 flex flex-col items-center justify-center gap-2 border-r border-[#919EAB33] border-dashed">
          <h3 className="text-5xl font-extrabold text-primary-new">4/5</h3>
          <Rating value={4} readOnly />
          <p className="text-sm text-secondary-new">(8.24k đánh giá) </p>
        </div>
        <div className="flex-1 flex flex-col items-center gap-3 p-10">
          <RatingBar stars={5} count="8.2k" percent="10%" />
          <RatingBar stars={4} count="86.6k" percent="20%" />
          <RatingBar stars={3} count="73.9k" percent="30%" />
          <RatingBar stars={2} count="79k" percent="40%" />
          <RatingBar stars={1} count="63.1k" percent="50%" />
        </div>
      </div>
      <div className="py-10 flex flex-col gap-10">
        <UserReview
          avatarSrc={IMAGES.avatar1}
          username="Thuy Do"
          rating={5}
          date="10/05/2025"
          comment="Giờ mình tiến hành thay cho xe luôn hàng đúng như mong đợi lại giao nhanh nữa chứ. Mọi người nên mua xài nhé!"
          productImages={[IMAGES.product1, IMAGES.product2, IMAGES.product3]}
          likeCount={12}
        />

        <UserReview
          avatarSrc={IMAGES.avatar1}
          username="Phạm Văn Lập"
          rating={2}
          date="10/05/2025"
          comment="Lọc gió bị gãy, lần này mua thất vọng quá Cũng may vẫn còn xài đc đã lắp vào xe"
        />
        <Pagination currentPage={1} totalPages={3} />
      </div>
    </div>
  );
};

export default Review;
