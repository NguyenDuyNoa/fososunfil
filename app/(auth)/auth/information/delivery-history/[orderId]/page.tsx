"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrderAndSaleReturnDetails } from "@/managers/api-management/auth/delivery-history/useGetOrderAndSaleReturnDetails";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useResizeStore } from "@/stores/useResizeStore";

interface OrderDetailsPageProps {
  params: {
    orderId: string;
  };
}

// Hàm format số
const formatNumber = (value: number): string => {
  if (value === 0) return "-";
  return new Intl.NumberFormat("vi-VN").format(value) + " đ";
};

const OrderDetailsPage = ({ params }: OrderDetailsPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<number>(0);
  const [typeId, setTypeId] = useState<number>(1);
  const { isVisibleMobile, isVisibleTablet } = useResizeStore();

  useEffect(() => {
    // Lấy orderId từ params
    const orderIdFromParams = parseInt(params.orderId);
    setOrderId(orderIdFromParams);

    // Lấy typeId từ searchParams
    const typeIdFromParams = searchParams.get("typeId");

    if (typeIdFromParams) {
      setTypeId(parseInt(typeIdFromParams));
    }
  }, [params.orderId, searchParams]);

  const { data, isLoading, error } = useGetOrderAndSaleReturnDetails(orderId, typeId);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="w-full max-w-full p-2 sm:p-4 rounded-lg h-full overflow-hidden">
      {/* Header với nút quay lại */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleGoBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
        <h2 className="text-xl font-bold">
          Chi tiết đơn hàng #{orderId}
        </h2>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-red-500">
                <p>Có lỗi xảy ra khi tải dữ liệu</p>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()} 
                  className="mt-2"
                >
                  Thử lại
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : data ? (
          <>
            {/* Chi tiết sản phẩm */}
            {data.items && data.items.length > 0 && (
              <Card
              className="w-full"
              style={
                isVisibleMobile
                  ? { width: `${window.innerWidth - 40}px` }
                  : isVisibleTablet
                  ? { width: `${window.innerWidth - 66}px` }
                  : undefined
              }>
                <CardHeader>
                  <CardTitle className="text-lg">Chi tiết sản phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table className="min-w-full">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="font-semibold w-12">STT</TableHead>
                            <TableHead className="font-semibold w-20">Hình ảnh</TableHead>
                            <TableHead className="font-semibold w-24">Mã SP</TableHead>
                            <TableHead className="font-semibold min-w-[200px]">Tên sản phẩm</TableHead>
                            <TableHead className="font-semibold w-20">Đơn vị</TableHead>
                            <TableHead className="font-semibold w-16">Loại</TableHead>
                            <TableHead className="font-semibold text-center w-20">SL</TableHead>
                            <TableHead className="font-semibold text-right w-24">Đơn giá</TableHead>
                            <TableHead className="font-semibold text-right w-28">Thành tiền</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.items.map((item: any, index: number) => (
                            <TableRow key={index} className="hover:bg-gray-50">
                              <TableCell className="text-center">{index + 1}</TableCell>
                              <TableCell>
                                <div className="w-16 h-16 relative">
                                  <Image
                                    src={item.image || "/no_image.png"}
                                    alt={item.ProductName || "Product"}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover rounded border"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = "/no_image.png";
                                    }}
                                  />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{item.ItemCode || "-"}</TableCell>
                              <TableCell>
                                <div className="max-w-[200px]">
                                  <p className="font-medium text-sm break-words line-clamp-2">{item.ProductName || "-"}</p>
                                  {item.ItemCodeOld && (
                                    <p className="text-xs text-gray-500 truncate">Mã cũ: {item.ItemCodeOld}</p>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>{item.UnitName || "-"}</TableCell>
                              <TableCell>
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                  {item.TypeName || "-"}
                                </span>
                              </TableCell>
                              <TableCell className="text-center font-medium">{item.Quantity || 0}</TableCell>
                              <TableCell className="text-right">
                                <div className="text-sm font-medium">{formatNumber(item.UnitPrice || 0)}</div>
                                {item.BasePrice > 0 && item.BasePrice !== item.UnitPrice && (
                                  <div className="text-xs text-gray-500 truncate">
                                    Gốc: {formatNumber(item.BasePrice)}
                                  </div>
                                )}
                                {item.Discount > 0 && (
                                  <div className="text-xs text-red-500 truncate">
                                    -{formatNumber(item.Discount)}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                {formatNumber(item.Amount || 0)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                  </div>

                  {/* Tổng tiền */}
                  <div className="mt-6 border-t pt-4">
                    <div className="flex justify-end">
                      <div className="space-y-3 w-full sm:w-auto sm:min-w-[300px] bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tổng số lượng:</span>
                          <span className="font-medium">
                            {data.items?.reduce((sum: number, item: any) => sum + (item.Quantity || 0), 0) || 0}
                          </span>
                        </div>
                        <div className="flex justify-between text-lg">
                          <span className="font-semibold">Tổng tiền hàng:</span>
                          <span className="font-bold text-blue-600">
                            {formatNumber(
                              data.items?.reduce((sum: number, item: any) => sum + (item.Amount || 0), 0) || 0
                            )}
                          </span>
                        </div>
                        {data.items?.some((item: any) => item.Discount > 0) && (
                          <div className="flex justify-between text-red-600">
                            <span>Tổng chiết khấu:</span>
                            <span className="font-medium">
                              {formatNumber(
                                data.items?.reduce((sum: number, item: any) => sum + (item.Discount || 0), 0) || 0
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500">
                <p>Không có dữ liệu chi tiết đơn hàng</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;