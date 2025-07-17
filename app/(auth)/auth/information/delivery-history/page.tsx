"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useGetOrderAndSaleReturnAmount } from "@/managers/api-management/auth/delivery-history/useGetOrderAndSaleReturnAmount";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useResizeStore } from "@/stores/useResizeStore";
import Image from "next/image";
import { IMAGES } from "@/constants/Images";
import DeliveryHistorySkeleton from "@/components/skeleton/delivery-history/DeliveryHistorySkeleton";

// Định nghĩa kiểu dữ liệu
interface DeliveryItem {
  TypeId: number;
  OrderId: number;
  OrderNo: string;
  Date: string;
  ProductAmount: number;
  DiscountPercentage: number;
  DiscountAmount: number;
  Amount: number;
  label: string;
}

interface PaginationInfo {
  RecordCount: number;
  PageIndex: number;
  PageSize: number;
  PageCount: number;
}

interface DeliveryData {
  result: boolean;
  items: DeliveryItem[];
  pagination: PaginationInfo[];
}

// Hàm format số
const formatNumber = (value: number): string => {
  if (value === 0) return "-";
  return new Intl.NumberFormat("vi-VN").format(value) + " đ";
};

// Hàm chuyển đổi ngày thành định dạng dd/MM/yyyy
const formatDateToString = (date: Date | null): string => {
  if (!date) return "";
  return format(date, "dd/MM/yyyy");
};

// Lấy ngày hiện tại và ngày 30 ngày trước
const getCurrentDateAndPast30Days = (): { current: Date; past30: Date } => {
  const currentDate = new Date();
  const past30Days = new Date();
  past30Days.setDate(currentDate.getDate() - 30);
  return { current: currentDate, past30: past30Days };
};

// Hàm parse ngày từ string với nhiều định dạng
const parseDateFromString = (dateStr: string): Date | null => {
  // Xử lý các định dạng phổ biến
  const formats = [
    "dd/MM/yyyy",
    "dd-MM-yyyy",
    "d/M/yyyy",
    "d-M-yyyy",
    "dd/M/yyyy",
    "d/MM/yyyy",
    "dd-M-yyyy",
    "d-MM-yyyy",
  ];

  // Chuẩn hóa chuỗi ngày
  const normalizedDate = dateStr.trim().replace(/[-./]/g, "/");

  // Kiểm tra định dạng và tạo Date object
  const [day, month, year] = normalizedDate.split("/").map(Number);

  // Validate các giá trị
  if (
    !isNaN(day) &&
    !isNaN(month) &&
    !isNaN(year) &&
    day >= 1 &&
    day <= 31 &&
    month >= 1 &&
    month <= 12 &&
    year >= 1900 &&
    year <= 9999
  ) {
    const date = new Date(year, month - 1, day);
    // Kiểm tra ngày hợp lệ (tránh trường hợp như 31/04)
    if (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    ) {
      return date;
    }
  }

  return null;
};

const DeliveryHistoryPage = () => {
  const { isVisibleMobile, isVisibleTablet } = useResizeStore();
  const { current, past30 } = getCurrentDateAndPast30Days();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(past30);
  const [dateTo, setDateTo] = useState<Date | undefined>(current);
  const [dateFromInput, setDateFromInput] = useState(
    format(past30, "dd/MM/yyyy")
  );
  const [dateToInput, setDateToInput] = useState(format(current, "dd/MM/yyyy"));

  // Sử dụng use-debounce
  const [debouncedDateFromInput] = useDebounce(dateFromInput, 500);
  const [debouncedDateToInput] = useDebounce(dateToInput, 500);

  // Theo dõi thay đổi của giá trị debounced
  useEffect(() => {
    const date = parseDateFromString(debouncedDateFromInput);
    if (date) {
      setDateFrom(date);
    }
  }, [debouncedDateFromInput]);

  useEffect(() => {
    const date = parseDateFromString(debouncedDateToInput);
    if (date) {
      setDateTo(date);
    }
  }, [debouncedDateToInput]);

  // Gọi API với tham số phân trang
  const { data, isLoading, refetch } = useGetOrderAndSaleReturnAmount({
    page: currentPage,
    limit: pageSize,
    datefrom: dateFrom
      ? formatDateToString(dateFrom)
      : formatDateToString(past30),
    dateto: dateTo ? formatDateToString(dateTo) : formatDateToString(current),
  });

  // Tính toán tổng số tiền
  const totalAmount =
    data?.items?.reduce(
      (sum: number, item: DeliveryItem) => sum + item.Amount,
      0
    ) || 0;

  // Xử lý khi thay đổi trang
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // // Xử lý khi lọc theo ngày
  // const handleFilter = () => {
  //   refetch();
  // };

  // Cập nhật hàm xử lý khi nhập ngày
  const handleDateFromInputChange = (value: string) => {
    setDateFromInput(value);
  };

  const handleDateToInputChange = (value: string) => {
    setDateToInput(value);
  };

  // Hàm xử lý khi chọn ngày từ calendar
  const handleDateFromSelect = (date: Date | undefined) => {
    setDateFrom(date);
    if (date) {
      setDateFromInput(format(date, "dd/MM/yyyy"));
    }
  };

  const handleDateToSelect = (date: Date | undefined) => {
    setDateTo(date);
    if (date) {
      setDateToInput(format(date, "dd/MM/yyyy"));
    }
  };

  return (
    <div className="w-full p-2 sm:p-4 rounded-lg h-full">
      <h2 className="text-xl font-bold mb-4">Lịch sử giao hàng</h2>

      {/* Bộ lọc */}
      <Card className="mb-4">
        <CardContent className="p-2 sm:p-4">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-end">
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label>Từ ngày</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={dateFromInput}
                  onChange={(e) => handleDateFromInputChange(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-full sm:w-[150px]"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-[50px] p-0 flex-shrink-0")}>
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={handleDateFromSelect}
                      locale={vi}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label>Đến ngày</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={dateToInput}
                  onChange={(e) => handleDateToInputChange(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-full sm:w-[150px]"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-[50px] p-0 flex-shrink-0")}>
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={handleDateToSelect}
                      locale={vi}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* <Button onClick={handleFilter} className="w-full sm:w-auto">Lọc</Button> */}
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <DeliveryHistorySkeleton />
      ) : data?.result && data.items.length > 0 ? (
        <Card
          className="w-full"
          style={
            isVisibleMobile
              ? { width: `${window.innerWidth - 40}px` }
              : isVisibleTablet
              ? { width: `${window.innerWidth - 66}px` }
              : undefined
          }
        >
          <CardContent className="p-2 sm:p-4">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[900px]">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold w-[60px] text-center">STT</TableHead>
                      <TableHead className="font-semibold">Loại</TableHead>
                      <TableHead className="font-semibold">Ngày</TableHead>
                      <TableHead className="font-semibold">Mã đơn hàng</TableHead>
                      <TableHead className="font-semibold">Số đơn hàng</TableHead>
                      <TableHead className="font-semibold text-right">
                        Giá trị đơn hàng
                      </TableHead>
                      <TableHead className="font-semibold text-right">
                        % Chiết khấu
                      </TableHead>
                      <TableHead className="font-semibold text-right">
                        Chiết khấu
                      </TableHead>
                      <TableHead className="font-semibold text-right">
                        Tổng tiền
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.items.map((item: DeliveryItem, index: number) => (
                      <TableRow
                        key={`${item.TypeId}-${item.OrderId}-${index}`}
                        className="hover:bg-gray-50"
                      >
                        <TableCell className="text-center">{index + 1}</TableCell>
                        <TableCell>{item.label}</TableCell>
                        <TableCell>{item.Date}</TableCell>
                        <TableCell>{item.OrderId}</TableCell>
                        <TableCell>{item.OrderNo || "-"}</TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.ProductAmount)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.DiscountPercentage === 0
                            ? "-"
                            : item.DiscountPercentage + "%"}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.DiscountAmount)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatNumber(item.Amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gray-50">
                      <TableCell colSpan={8} className="text-right font-bold">
                        Tổng cộng:
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {formatNumber(totalAmount)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {data?.pagination && data.pagination[0] && (
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500 order-2 sm:order-1">
                  Trang {data.pagination[0].PageIndex}/
                  {data.pagination[0].PageCount} | Tổng số{" "}
                  {data.pagination[0].RecordCount} bản ghi
                </div>
                <div className="flex gap-2 order-1 sm:order-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={data.pagination[0].PageIndex <= 1}
                    onClick={() =>
                      handlePageChange(data.pagination[0].PageIndex - 1)
                    }
                  >
                    Trước
                  </Button>

                  {(() => {
                    const pageCount = data.pagination[0].PageCount;
                    const currentPage = data.pagination[0].PageIndex;
                    const pages = [];

                    // Logic hiển thị số trang
                    if (pageCount <= 7) {
                      // Nếu tổng số trang <= 7, hiển thị tất cả các trang
                      for (let i = 1; i <= pageCount; i++) {
                        pages.push(
                          <Button
                            key={i}
                            variant={i === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(i)}
                          >
                            {i}
                          </Button>
                        );
                      }
                    } else {
                      // Nếu tổng số trang > 7, hiển thị thông minh

                      // Luôn hiển thị trang đầu tiên
                      pages.push(
                        <Button
                          key={1}
                          variant={1 === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(1)}
                        >
                          1
                        </Button>
                      );

                      // Xác định phạm vi trang hiển thị
                      let startPage = Math.max(2, currentPage - 2);
                      let endPage = Math.min(pageCount - 1, currentPage + 2);

                      // Điều chỉnh để luôn hiển thị 5 trang ở giữa nếu có thể
                      if (startPage > 2) {
                        pages.push(
                          <Button
                            key="ellipsis1"
                            variant="outline"
                            size="sm"
                            disabled
                          >
                            ...
                          </Button>
                        );
                      }

                      // Hiển thị các trang ở giữa
                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <Button
                            key={i}
                            variant={i === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(i)}
                          >
                            {i}
                          </Button>
                        );
                      }

                      // Hiển thị dấu ... nếu cần
                      if (endPage < pageCount - 1) {
                        pages.push(
                          <Button
                            key="ellipsis2"
                            variant="outline"
                            size="sm"
                            disabled
                          >
                            ...
                          </Button>
                        );
                      }

                      // Luôn hiển thị trang cuối cùng
                      if (pageCount > 1) {
                        pages.push(
                          <Button
                            key={pageCount}
                            variant={
                              pageCount === currentPage ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => handlePageChange(pageCount)}
                          >
                            {pageCount}
                          </Button>
                        );
                      }
                    }

                    return pages;
                  })()}

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={
                      data.pagination[0].PageIndex >=
                      data.pagination[0].PageCount
                    }
                    onClick={() =>
                      handlePageChange(data.pagination[0].PageIndex + 1)
                    }
                  >
                    Sau
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="w-full flex flex-col justify-center items-center font-medium text-gray-500">
              <Image src={IMAGES.productEmpty} alt="no data" width={300} height={300} />
              <p className="text-gray-500">Không có dữ liệu giao hàng</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DeliveryHistoryPage;
