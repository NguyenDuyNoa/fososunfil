import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DeliveryHistorySkeleton = () => {
  return (
    <Card className="w-full">
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
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-28" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-12 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-gray-50">
                  <TableCell colSpan={8} className="text-right">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-auto" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-auto" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryHistorySkeleton; 