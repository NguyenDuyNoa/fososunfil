import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DebtHistorySkeleton = () => {
  return (
    <Card className="w-full">
      <CardContent className="p-2 sm:p-4">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[900px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold w-[60px] text-center">STT</TableHead>
                  <TableHead className="font-semibold">Ngày</TableHead>
                  <TableHead className="font-semibold text-right">Đầu kỳ</TableHead>
                  <TableHead className="font-semibold text-right">Đơn hàng</TableHead>
                  <TableHead className="font-semibold text-right">Hàng trả</TableHead>
                  <TableHead className="font-semibold text-right">Đã trả tiền</TableHead>
                  <TableHead className="font-semibold text-right">Giảm trừ</TableHead>
                  <TableHead className="font-semibold text-right">Hoàn trả tiền</TableHead>
                  <TableHead className="font-semibold text-right">Cuối kỳ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-auto" />
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

export default DebtHistorySkeleton; 