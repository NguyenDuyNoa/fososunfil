"use client";

import { useGetHistoryDetailOrder } from "@/managers/api-management/order/useGetHistoryDetailOrder";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const OrderDetailPage = () => {
  const params = useParams();
  const router = useRouter();

  const { data: orderData, isLoading } = useGetHistoryDetailOrder(
    params?.id as string
  );

  const orderDetail = orderData?.order;

  const handleGoBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-300"></div>
      </div>
    );
  }

  if (!orderDetail) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-4">
        <h2 className="text-xl font-bold text-gray-800">
          Không tìm thấy thông tin đơn hàng
        </h2>
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-brand-300 font-medium"
        >
          <ChevronLeft size={16} />
          <span>Quay lại danh sách đơn hàng</span>
        </button>
      </div>
    );
  }

  // Chuyển đổi trạng thái đơn hàng sang tiếng Việt
  const mapOrderStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      un_approved: "Chờ xác nhận",
      approved: "Đã xác nhận",
      delivering: "Đang giao hàng",
      delivered: "Đã giao hàng",
      cancelled: "Đã hủy",
    };
    return statusMap[status] || status;
  };

  // Xác định màu sắc cho trạng thái
  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      un_approved: "bg-yellow-50 text-yellow-700",
      approved: "bg-blue-50 text-blue-700",
      delivering: "bg-orange-50 text-orange-700",
      delivered: "bg-green-50 text-green-700",
      cancelled: "bg-red-50 text-red-700",
    };
    return colorMap[status] || "bg-gray-50 text-gray-700";
  };

  // Tính tổng tiền chưa giảm giá
  const calculateTotalBeforeDiscount = () => {
    if (!orderDetail.items || orderDetail.items.length === 0) return 0;

    return orderDetail.items.reduce((total: number, item: any) => {
      return total + Number(item.amount || 0);
    }, 0);
  };

  // Tính tổng tiền giảm giá
  const calculateTotalDiscount = () => {
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    const totalAfterDiscount = Number(
      orderDetail.grand_total_items || orderDetail.grand_total || 0
    );
    return totalBeforeDiscount - totalAfterDiscount;
  };

  const totalBeforeDiscount = calculateTotalBeforeDiscount();
  const totalDiscount = calculateTotalDiscount();

  return (
    <div className="flex flex-col gap-6 p-2 xl:p-6">
      <div className="flex items-center gap-2 xl:gap-4">
        <button
          onClick={handleGoBack}
          className="flex items-center size-8 rounded-lg border border-brand-300 gap-2 text-brand-300 font-medium justify-center hover:bg-brand-300 hover:text-white transition-all duration-300"
        >
          <ChevronLeft size={16} />
        </button>
        <h2 className="text-xl font-bold">
          Đơn hàng #{orderDetail.reference_no || orderDetail.id}
        </h2>
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        {/* Thông tin trạng thái */}
        <div className="bg-white rounded-lg p-4 xl:p-6 shadow-sm border border-gray-100 w-full md:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-brand-500">Trạng thái đơn hàng</h2>
            <span
              className={`px-3 py-1 rounded-full font-medium ${getStatusColor(
                orderDetail.status
              )}`}
            >
              {mapOrderStatus(orderDetail.status)}
            </span>
          </div>
          <div className="flex flex-col gap-2 xl:gap-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600 font-semibold">Mã đơn hàng:</p>
              <p className="font-medium">{orderDetail.reference_no}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600 font-semibold">Ngày đặt hàng:</p>
              <p className="font-medium">{orderDetail.date}</p>
            </div>
            {orderDetail.created_by && (
              <div className="flex justify-between items-center">
                <p className="text-gray-600 font-semibold">Người tạo:</p>
                <p className="font-medium">{orderDetail.created_by}</p>
              </div>
            )}
            {orderDetail.note && (
              <div className="flex justify-between items-center col-span-2">
                <p className="text-gray-600 font-semibold">Ghi chú:</p>
                <p className="font-medium">{orderDetail.note}</p>
              </div>
            )}
          </div>
        </div>

        {/* Thông tin giao hàng */}
        <div className="bg-white rounded-lg p-4 xl:p-6 shadow-sm border border-gray-100 w-full md:w-1/2">
          <h2 className="text-lg font-bold mb-4 text-brand-500">Địa chỉ giao hàng</h2>
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold">Người nhận:</span>{" "}
              {orderDetail?.customer_name_delivery || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Số điện thoại:</span>{" "}
              {orderDetail?.phone_delivery || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {orderDetail?.email_delivery || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Địa chỉ:</span>{" "}
              {orderDetail?.address_delivery || "N/A"}
              {orderDetail?.name_ward && isNaN(Number(orderDetail?.name_ward))
                ? `, ${orderDetail?.name_ward}`
                : `, phường ${orderDetail?.name_ward}`}
              {orderDetail?.name_district &&
              isNaN(Number(orderDetail?.name_district))
                ? `, ${orderDetail?.name_district}`
                : `, quận ${orderDetail?.name_district}`}
              {orderDetail?.name_province && `, ${orderDetail?.name_province}`}
            </p>
            <p>
              <span className="font-medium">Xuất hóa đơn:</span>{" "}
              {orderDetail?.type_bills === "1" ? "Có" : "Không"}
            </p>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="bg-white rounded-lg p-4 xl:p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold mb-4 text-brand-500">Sản phẩm</h2>
        <div className="flex flex-col gap-4">
          {orderDetail?.items?.map((item: any) => (
            <div
              className="flex flex-col border border-gray-100 rounded-lg overflow-hidden"
              key={item?.id}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
                <div className="flex items-start gap-4">
                  <Image
                    src={item?.images || "/default/default.png"}
                    alt={item?.item_name || "Product image"}
                    width={80}
                    height={80}
                    className="object-cover rounded-lg border border-gray-200"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col xl:flex-row items-start xl:items-center gap-0 xl:gap-2">
                      <h3 className="font-bold text-primary-new">
                        {item?.item_name}
                      </h3>
                      {item?.discount_percent_item > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs">
                          Giảm {item.discount_percent_item}%
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Mã: {item?.item_code}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <p>Số lượng: {item?.quantity}</p>
                      <p>Đơn vị: {item?.unit_name}</p>
                    </div>
                    {item?.type_gift === "1" && (
                      <span className="px-2 py-0.5 w-fit rounded-full border border-error-dark text-error-dark text-xs">
                        Quà tặng
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="font-bold text-primary-new text-lg">
                    {Number(item?.total_amount).toLocaleString()}{" "}
                    <span className="underline">đ</span>
                  </p>
                  {item?.discount_percent_item > 0 &&
                    item?.type_gift !== "1" && (
                      <p className="text-sm text-gray-500">
                        <span className="line-through">
                          {Number(item?.amount).toLocaleString()} đ
                        </span>
                        <span className="text-red-500 ml-2">
                          (-
                          {Number(
                            item?.amount - item?.total_amount
                          ).toLocaleString()}{" "}
                          đ)
                        </span>
                      </p>
                    )}
                  {item?.type_gift !== "1" && (
                    <p className="text-sm text-gray-600">
                      {Number(item?.price).toLocaleString()} đ ×{" "}
                      {item?.quantity}
                    </p>
                  )}
                </div>
              </div>

              {/* Sản phẩm con (quà tặng) */}
              {item?.children && item.children.length > 0 && (
                <div className="bg-gray-50 p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Quà tặng kèm:
                  </h4>
                  {item.children.map((child: any) => (
                    <div
                      className="flex items-center justify-between py-2"
                      key={child.id}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={child?.images || "/default/default.png"}
                          alt={child?.item_name || "Gift image"}
                          width={40}
                          height={40}
                          className="object-cover rounded-md border border-gray-200"
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {child.item_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Mã: {child.item_code}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-xs">
                          Quà tặng
                        </span>
                        <span className="text-sm">
                          {child.quantity} {child.unit_name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Thông tin thanh toán */}
      <div className="bg-white rounded-lg p-4 xl:p-6 shadow-sm border border-gray-100 w-full">
        <h2 className="text-lg font-bold mb-4 text-brand-500">Thông tin thanh toán</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Tổng tiền chưa giảm:</p>
            <p className="font-medium">
              {totalBeforeDiscount.toLocaleString()}{" "}
              <span className="underline">đ</span>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Giảm giá sản phẩm:</p>
            <p className="font-medium text-red-600">
              -{totalDiscount.toLocaleString()}{" "}
              <span className="underline">đ</span>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Tổng tiền sản phẩm:</p>
            <p className="font-medium">
              {Number(
                orderDetail?.grand_total_items || orderDetail?.grand_total
              ).toLocaleString()}{" "}
              <span className="underline">đ</span>
            </p>
          </div>
          {orderDetail?.total_discount_percent > 0 && (
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Giảm giá thêm:</p>
              <p className="font-medium text-red-600">
                -{Number(orderDetail?.total_discount_percent).toLocaleString()}{" "}
                <span className="underline">đ</span>
              </p>
            </div>
          )}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Phí vận chuyển:</p>
            <p className="font-medium">
              {Number(orderDetail?.cost_delivery || 0).toLocaleString()}{" "}
              <span className="underline">đ</span>
            </p>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
            <p className="font-bold">Tổng cộng:</p>
            <p className="font-bold text-brand-300 text-lg">
              {Number(orderDetail?.grand_total).toLocaleString()}{" "}
              <span className="underline">đ</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
