"use client";
import { IMAGES } from "@/constants/Images";
import { useCartStore } from "@/stores/useCartStore";
import { Refresh2 } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface IDataStatusOrder {
  id: number;
  name: string;
  color: string;
  count: number;
}

interface IListOrderHistoryProps {
  dataStatusOrder: IDataStatusOrder[];
  dataHistoryListOrder: any;
  isLoadingHistoryListOrder: boolean;
  onSelectStatus: (statusId: number | null) => void;
  selectedStatusId: number | null;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

const SkeletonOrderHistory = () => {
  return (
    <div className="animate-pulse w-full rounded-lg flex flex-col gap-3 xl:gap-4 border border-[#EBEDEE] overflow-hidden">
      <div className="h-12 bg-gray-200"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 items-center gap-2 md:gap-8 px-2 md:px-6">
        <div className="flex items-start xl:items-center gap-3 md:gap-5 col-span-1 sm:col-span-2 md:col-span-5">
          <div className="flex-shrink-0 size-16 sm:size-20 rounded-lg border border-grey-400 bg-gray-200" />
          <div className="flex flex-col gap-1 w-full">
            <div className="h-5 rounded-lg bg-gray-200"></div>
            <div className="h-5 rounded-lg bg-gray-200"></div>
          </div>
        </div>
        <p className="h-4 hidden xl:block mt-2 sm:mt-0"></p>
        <button className="animate-pulse bg-gray-200 h-10 w-full hidden xl:flex rounded-full"></button>
      </div>

      <div className="flex justify-between items-center px-2 md:px-6 py-2 border-t border-[#EBEDEE] xl:mt-2">
        <span className="h-5 w-1/5 rounded-lg bg-gray-200"></span>
        <div className="h-5 w-[10%] rounded-lg bg-gray-200"></div>
      </div>
    </div>
  );
};

const ListOrderHistory = ({
  dataStatusOrder,
  dataHistoryListOrder,
  isLoadingHistoryListOrder,
  onSelectStatus,
  selectedStatusId,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
}: IListOrderHistoryProps) => {
  const router = useRouter();
  const { addToCartBuyNow, shouldRedirectToCart, resetRedirect } =
    useCartStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const statusItemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Xác định màu sắc cho trạng thái
  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      "Đã đặt hàng": "bg-blue-50 text-blue-700",
      "Đang xử lý": "bg-yellow-50 text-yellow-700",
      "Đã giao": "bg-green-50 text-green-700",
      "Từ chối": "bg-red-50 text-red-700",
    };
    return colorMap[status] || "bg-gray-50 text-gray-700";
  };

  const handleViewOrderDetail = (orderId: string) => {
    router.push(`/auth/information/order-history/${orderId}`);
  };

  const handleBuyNow = async (id: number, quantity: number) => {
    await addToCartBuyNow(id, quantity);
  };

  // Cập nhật vị trí và kích thước của indicator khi chuyển đổi giữa các tab
  useEffect(() => {
    if (selectedStatusId && scrollContainerRef.current) {
      const selectedIndex = dataStatusOrder?.findIndex((status) => status.id === selectedStatusId);
      if (selectedIndex !== -1 && statusItemsRef.current[selectedIndex]) {
        const selectedElement = statusItemsRef.current[selectedIndex];
        const container = scrollContainerRef.current;
        
        if (selectedElement && container) {
          const containerRect = container.getBoundingClientRect();
          const selectedRect = selectedElement.getBoundingClientRect();
          
          // Cập nhật style cho indicator
          setIndicatorStyle({
            left: selectedElement.offsetLeft,
            width: selectedElement.offsetWidth,
            opacity: 1,
          });
          
          // Tính toán vị trí cuộn để trạng thái được chọn nằm ở giữa
          const containerWidth = container.offsetWidth;
          const selectedElementLeft = selectedElement.offsetLeft;
          const selectedElementWidth = selectedElement.offsetWidth;
          
          const scrollPosition = selectedElementLeft - (containerWidth / 2) + (selectedElementWidth / 2);
          
          container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        }
      }
    } else {
      // Ẩn indicator nếu không có trạng thái nào được chọn
      setIndicatorStyle({ left: 0, width: 0, opacity: 0 });
    }
  }, [selectedStatusId, dataStatusOrder]);

  useEffect(() => {
    if (shouldRedirectToCart) {
      router.push("/cart");
      resetRedirect();
    }
  }, [shouldRedirectToCart, router, resetRedirect]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 items-center overflow-x-scroll whitespace-nowrap scrollbar-hide max-w-[calc(100vw-40px)] relative"
      >
        {/* Indicator dưới tab được chọn */}
        <div 
          className="absolute bottom-0 h-0.5 bg-[#1B56F5] transition-all duration-300 ease-in-out"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            opacity: indicatorStyle.opacity,
          }}
        />
        
        {dataStatusOrder?.map((status: IDataStatusOrder, index) => (
          <div
            className={`flex gap-3 px-1 py-1 border-b-2 border-transparent cursor-pointer`}
            key={status.id}
            ref={el => { statusItemsRef.current[index] = el; }}
            onClick={() => onSelectStatus(status.id)}
          >
            <span
              className={`text-sm whitespace-nowrap font-medium ${
                selectedStatusId === status.id
                  ? "text-[#1B56F5]"
                  : "text-[#5F656A]"
              }`}
            >
              {status.name}
            </span>
            <span
              className={`text-xs h-fit ${
                selectedStatusId === status.id
                  ? "bg-[#EEF5FF] text-[#1B56F5]"
                  : "bg-[#F4F4F5] text-[#5F656A]"
              } rounded-full px-1.5 py-0.5`}
            >
              {status.count}
            </span>
          </div>
        ))}
      </div>

      {isLoadingHistoryListOrder && !isLoadingMore ? (
        <div className="flex flex-col gap-4">
          <SkeletonOrderHistory />
          <SkeletonOrderHistory />
          <SkeletonOrderHistory />
        </div>
      ) : dataHistoryListOrder?.length === 0 ? (
        <div className="flex flex-col gap-6 justify-center items-center py-10">
          <Image
            src={IMAGES.emptyOrder}
            alt="cartEmpty"
            width={480}
            height={360}
          />
          <span className="text-sm font-medium text-[#5F656A]">
            Không có đơn hàng nào
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {dataHistoryListOrder?.map((order: any) => (
            <div className="flex flex-col gap-6" key={order.id}>
              <div
                className="rounded-lg flex flex-col gap-3 xl:gap-4 border border-[#EBEDEE] overflow-hidden cursor-pointer hover:border-brand-300 transition-all duration-300"
                onClick={() => handleViewOrderDetail(order.id)}
              >
                <div className="flex justify-between gap-2 px-2 xl:px-4 py-2.5 bg-brand-300">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full w-fit ${getStatusColor(
                      order?.status
                    )}`}
                  >
                    {order?.status}
                  </span>

                  <div className="flex items-center gap-1 mt-1 sm:mt-0">
                    <p className="text-white text-sm font-medium hidden xl:block">
                      Mã đơn hàng:
                    </p>
                    <p className="text-white text-sm font-bold">
                      {order?.reference_no}
                    </p>
                  </div>
                </div>

                {order?.items?.map((item: any) => (
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 items-center gap-2 md:gap-8 px-2 md:px-6"
                    key={item?.id}
                  >
                    <div className="flex items-start xl:items-center gap-3 md:gap-5 col-span-1 sm:col-span-2 md:col-span-5">
                      <Image
                        src={item?.images ?? "/default/default.png"}
                        alt="order-history"
                        width={100}
                        height={100}
                        className="size-16 sm:size-20 object-cover rounded-lg border border-grey-400"
                      />
                      <div className="flex flex-col gap-1 w-full">
                        <h3 className="text-sm font-bold text-primary-new line-clamp-2">
                          {item?.item_name}
                        </h3>

                        <div className="flex justify-between items-end gap-2">
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-grey-600">
                              Số lượng: {item?.quantity}
                            </p>
                            {Number(item?.total_amount) > 0 && (
                              <p className="text-sm font-bold text-primary-new xl:hidden">
                                {Number(item?.total_amount).toLocaleString()}{" "}
                                <span className="underline">đ</span>
                              </p>
                            )}
                          </div>

                          {item?.type_gift !== "1" && (
                            <button
                              className="xl:hidden border border-[#EBEDEE] rounded-full py-1 px-3 flex items-center gap-2 hover:bg-brand-100 hover:border-brand-300 transition-all duration-300 w-fit h-fit"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBuyNow(item.item_id, 1);
                              }}
                            >
                              <Refresh2
                                size="16"
                                color="#151B33"
                                className="flex-shrink-0"
                              />
                              <span className="text-primary-new text-sm font-semibold pt-1 whitespace-nowrap">
                                Mua lại
                              </span>
                            </button>
                          )}
                        </div>
                        {item?.type_gift === "1" && (
                          <span className="px-2 py-0.5 w-fit rounded-full border border-error-dark text-error-dark text-xs font-normal">
                            Quà tặng
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="hidden xl:block text-sm font-bold text-primary-new mt-2 sm:mt-0">
                      {Number(item?.total_amount).toLocaleString()}{" "}
                      <span className="underline">đ</span>
                    </p>
                    {item?.type_gift !== "1" && (
                      <button
                        className="hidden xl:flex border border-[#EBEDEE] rounded-full py-1.5 px-4 items-center gap-2 hover:bg-brand-100 hover:border-brand-300 transition-all duration-300 w-fit"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyNow(item.item_id, 1);
                        }}
                      >
                        <Refresh2
                          size="16"
                          color="#151B33"
                          className="flex-shrink-0"
                        />
                        <span className="text-primary-new text-sm font-semibold pt-1 whitespace-nowrap">
                          Mua lại
                        </span>
                      </button>
                    )}
                  </div>
                ))}

                {/* Hiển thị tổng giá trị đơn hàng */}
                <div className="flex justify-between items-center px-2 md:px-6 py-2 border-t border-[#EBEDEE] xl:mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-grey-600">
                      Tổng giá trị đơn hàng:
                    </span>
                  </div>
                  <div className="text-base font-bold text-brand-300">
                    {Number(order?.grand_total).toLocaleString()}{" "}
                    <span className="underline">đ</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Nút xem thêm */}
          {hasMore && onLoadMore && (
            <div className="flex justify-center mt-4">
              <button
                onClick={onLoadMore}
                disabled={isLoadingMore}
                className="px-6 py-2 border border-[#1B56F5] text-[#1B56F5] rounded-full hover:bg-[#EEF5FF] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                {isLoadingMore ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#1B56F5] border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang tải...</span>
                  </>
                ) : (
                  <span>Xem thêm đơn hàng</span>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListOrderHistory;
