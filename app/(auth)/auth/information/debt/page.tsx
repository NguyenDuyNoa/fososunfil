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

const PaymentHistoryPage = () => {
  const { isVisibleMobile, isVisibleTablet } = useResizeStore();
  const { current, past30 } = getCurrentDateAndPast30Days();
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

  const { data, isLoading, refetch } = useGetOrderCashDebtAmount({
    datefrom: dateFrom
      ? formatDateToString(dateFrom)
      : formatDateToString(past30),
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

  // Xử lý khi lọc theo ngày
  // const handleFilter = () => {
  //   refetch();
  // };

  return (
    <div className="w-full p-2 sm:p-4 rounded-lg h-full max-w-full">
      <h2 className="text-xl font-bold mb-4">Lịch sử công nợ</h2>

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

            {/* <Button onClick={handleFilter} className="w-full sm:w-auto">
              Lọc
            </Button> */}
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
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold w-[60px] text-center">
                        STT
                      </TableHead>
                      <TableHead className="font-semibold">Ngày</TableHead>
                      <TableHead className="font-semibold text-right">
                        Đầu kỳ
                      </TableHead>
                      <TableHead className="font-semibold text-right">
                        Đơn hàng
                      </TableHead>
                      <TableHead className="font-semibold text-right">
                        Hàng trả
                      </TableHead>
                      <TableHead className="font-semibold text-right">
                        Đã trả tiền
                      </TableHead>
                      <TableHead className="font-semibold text-right">
                        Giảm trừ
                      </TableHead>
                      <TableHead className="font-semibold text-right">
                        Hoàn trả tiền
                      </TableHead>
                      <TableHead className="font-semibold text-right">
                        Cuối kỳ
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.items.map((item: IDebtHistory, index: number) => (
                      <TableRow key={item.Idx} className="hover:bg-gray-50">
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          {format(
                            new Date(item.Date.split("/").reverse().join("-")),
                            "dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.DauKy)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.DonHang)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.HangTra)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.DaTraTien)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.GiamTru)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.HoanTraTien)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatNumber(item.CuoiKy)}
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
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="w-full flex flex-col justify-center items-center font-medium text-gray-500">
              <Image src={IMAGES.noData} alt="no data" width={300} height={300} />
              <p className="text-gray-500">Không có dữ liệu công nợ</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentHistoryPage;
