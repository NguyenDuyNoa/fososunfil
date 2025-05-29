import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import LikeIcon from "@/components/icons/likeIcon";
import Rating from "@/components/Rating";
import { IMAGES } from "@/constants/Images";
import { useGetReview } from "@/managers/api-management/products/useGetReview";
import {
  IReview,
  IReviewFile,
  IReviewItem,
  IReviewSummary,
} from "@/types/products/IProducts";
// import { IReview, IReviewFile, IReviewSummary } from "@/types/product";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

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
  productImages?: IReviewFile[];
  likeCount?: number;
}) => {
  return (
    <div className="px-5 xl:px-8 flex gap-3 xl:gap-4">
      <div className="hidden xl:block">
        <Image
          src={avatarSrc}
          alt="avatar"
          width={48}
          height={48}
          className="rounded-full object-cover aspect-square"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 xl:gap-2.5">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <Image
                src={avatarSrc}
                alt="avatar"
                width={48}
                height={48}
                className="rounded-full object-cover xl:hidden aspect-square"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-primary-new">
                  {username}
                </h3>
                <p className="text-disable-50 text-xs">
                  {moment(date).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
            <Rating value={rating} readOnly />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-primary-new">{comment}</p>
          {productImages.length > 0 && (
            <div className="mt-2 flex gap-2">
              {productImages.map((img, index) => (
                <Image
                  key={index}
                  src={img.file}
                  alt={img.file_name}
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
    </div>
  );
};

// Component hiển thị phân trang
const Pagination = ({
  currentPage = 1,
  totalPages = 3,
  onPageChange,
}: {
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
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
            onClick={() => onPageChange(index + 1)}
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

const Review = ({
  reviewItem,
  listReview,
}: {
  reviewItem: IReviewSummary;
  listReview: IReview[];
}) => {
  const params = useParams();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [reviews, setReviews] = React.useState(listReview);
  const { data: reviewData } = useGetReview(
    params?.id as string,
    currentPage,
    5
  );

  useEffect(() => {
    if (currentPage === 1) {
      setReviews(listReview);
    } else if (reviewData?.data?.listReview) {
      setReviews(reviewData.data.listReview);
    }
  }, [currentPage, listReview, reviewData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = React.useMemo(() => {
    const itemsPerPage = listReview?.length;
    return Math.ceil(Number(reviewItem?.totalReview || 0) / itemsPerPage) || 1;
  }, [reviewData, reviewItem, listReview]);

  return (
    <div className="rounded-lg bg-white shadow-review">
      <h2 className="text-lg xl:text-2xl font-semibold text-primary-new py-3 xl:py-5 px-6">
        Đánh giá sản phẩm
      </h2>
      <div className="flex flex-col xl:flex-row border-b border-[#919EAB33] border-dashed">
        <div className="flex-1 py-3 xl:py-0 flex flex-col items-center justify-center gap-2 border-r border-[#919EAB33] border-dashed">
          <h3 className="text-[32px]/[42px] xl:text-5xl font-extrabold text-primary-new">
            {reviewItem?.totalRating}/5
          </h3>
          <Rating value={Number(reviewItem?.totalRating)} readOnly />
          <p className="text-xs xl:text-sm text-secondary-new">
            ({reviewItem?.totalReview} đánh giá){" "}
          </p>
        </div>
        <div className="py-3 xl:py-10 flex-1 flex flex-col items-center gap-3 p-10">
          {reviewItem?.items?.map((item: IReviewItem) => (
            <RatingBar
              key={item.id}
              stars={item.id}
              count={item.count.toString()}
              percent={
                (
                  (item.count / Number(reviewItem?.totalReview)) *
                  100
                ).toString() + "%"
              }
            />
          ))}
        </div>
      </div>
      <div className="py-5 xl:py-10 flex flex-col gap-6 xl:gap-10">
        {reviews?.map((review: IReview) => (
          <UserReview
            key={review.id}
            avatarSrc={review.customer.image}
            username={review.customer.name}
            rating={Number(review.star)}
            date={review.created_at}
            comment={review.content}
            productImages={review.arrfile}
            likeCount={review.likeCount}
          />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Review;
