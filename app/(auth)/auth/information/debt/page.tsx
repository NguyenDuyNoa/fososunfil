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
import { useGetOrderCashDebtAmount } from "@/managers/api-management/auth/debt/useGetOrderCashDebtAmount";
import { useResizeStore } from "@/stores/useResizeStore";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import DebtHistorySkeleton from "@/components/skeleton/debt/DebtHistorySkeleton";
import Image from "next/image";
import { IMAGES } from "@/constants/Images";

interface IDebtHistory {
  Date: string;
  DauKy: number;
  DonHang: number;
  HangTra: number;
  DaTraTien: number;
  GiamTru: number;
  HoanTraTien: number;
  CuoiKy: number;
  Idx: number;
}

const formatNumber = (number: number): string => {
  if (number === 0) return "-";
  return new Intl.NumberFormat("vi-VN").format(number) + " đ";
};

// Hàm chuyển đổi ngày thành định dạng dd/MM/yyyy
const formatDateToString = (date: Date | null): string => {
  if (!date) return "";
  return format(date, "dd/MM/yyyy");
};

// Lấy ngày hiện tại và ngày 1 năm trước
const getCurrentDateAndPastYear = (): { current: Date; pastYear: Date } => {
  const currentDate = new Date();
  const pastYear = new Date();
  pastYear.setFullYear(currentDate.getFullYear() - 1);
  return { current: currentDate, pastYear: pastYear };
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

const PaymentHistoryPage = () => {
  const { isVisibleMobile, isVisibleTablet } = useResizeStore();
  const { current, pastYear } = getCurrentDateAndPastYear();
  const [dateFrom, setDateFrom] = useState<Date | undefined>(pastYear);
  const [dateTo, setDateTo] = useState<Date | undefined>(current);
  const [dateFromInput, setDateFromInput] = useState(
    format(pastYear, "dd/MM/yyyy")
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

  const { data, isLoading, refetch } = useGetOrderCashDebtAmount({
    datefrom: dateFrom
      ? formatDateToString(dateFrom)
      : formatDateToString(pastYear),
    dateto: dateTo ? formatDateToString(dateTo) : formatDateToString(current),
  });

  // Tính tổng số tiền
  const totalAmount =
    data?.items?.reduce(
      (sum: number, item: IDebtHistory) => sum + item.CuoiKy,
      0
    ) || 0;

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
    <div className="w-full p-2 sm:p-4 rounded-lg h-full max-w-full">
      <h2 className="text-xl font-bold mb-4">Phiếu ghi công nợ</h2>

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
                    <Button
                      variant="outline"
                      className={cn("w-[50px] p-0 flex-shrink-0")}
                    >
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
                    <Button
                      variant="outline"
                      className={cn("w-[50px] p-0 flex-shrink-0")}
                    >
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
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <DebtHistorySkeleton />
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
                <div className="max-h-[600px] overflow-auto">
                  <table className="w-full border-separate border-spacing-0 bg-white text-sm">
                    <thead className="sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th className="border-b border-gray-200 bg-gray-50 p-2 text-center w-[60px] font-semibold">
                          STT
                        </th>
                        <th className="border-b border-gray-200 bg-gray-50 p-2 text-left font-semibold">
                          Ngày
                        </th>
                        <th className="border-b border-gray-200 bg-gray-50 p-2 text-right font-semibold">
                          Đầu kỳ
                        </th>
                        <th className="border-b border-gray-200 bg-gray-50 p-2 text-right font-semibold">
                          Đơn hàng
                        </th>
                        <th className="border-b border-gray-200 bg-gray-50 p-2 text-right font-semibold">
                          Hàng trả
                        </th>
                        <th className="border-b border-gray-200 bg-gray-50 p-2 text-right font-semibold">
                          Đã trả tiền
                        </th>
                        <th className="border-b border-gray-200 bg-gray-50 p-2 text-right font-semibold">
                          Giảm trừ
                        </th>
                        <th className="border-b border-gray-200 bg-gray-50 p-2 text-right font-semibold">
                          Hoàn trả tiền
                        </th>
                        <th className="border-b border-gray-200 bg-gray-50 p-2 text-right font-semibold">
                          Cuối kỳ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.items.map((item: IDebtHistory, index: number) => (
                        <tr
                          key={item.Idx}
                          className="transition-colors hover:bg-gray-50"
                        >
                          <td className="border-b border-gray-200 p-2 text-center">
                            {index + 1}
                          </td>
                          <td className="border-b border-gray-200 p-2">
                            {format(
                              new Date(
                                item.Date.split("/").reverse().join("-")
                              ),
                              "dd/MM/yyyy"
                            )}
                          </td>
                          <td className={`border-b border-gray-200 p-2 text-right ${index === 0 ? "font-bold" : ""}`}>
                            {formatNumber(item.DauKy)}
                          </td>
                          <td className="border-b border-gray-200 p-2 text-right text-success-dark">
                            {formatNumber(item.DonHang)}
                          </td>
                          <td className="border-b border-gray-200 p-2 text-right text-error-dark">
                            {formatNumber(item.HangTra)}
                          </td>
                          <td className="border-b border-gray-200 p-2 text-right text-error-dark">
                            {formatNumber(item.DaTraTien)}
                          </td>
                          <td className="border-b border-gray-200 p-2 text-right text-error-dark">
                            {formatNumber(item.GiamTru)}
                          </td>
                          <td className="border-b border-gray-200 p-2 text-right text-success-dark">
                            {formatNumber(item.HoanTraTien)}
                          </td>
                          <td className={`border-b border-gray-200 p-2 text-right ${index === data.items.length - 1 ? "font-bold" : ""}`}>
                            {formatNumber(item.CuoiKy)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="w-full flex flex-col justify-center items-center font-medium text-gray-500">
              <Image
                src={IMAGES.noData}
                alt="no data"
                width={300}
                height={300}
              />
              <p className="text-gray-500">Không có dữ liệu công nợ</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentHistoryPage;
