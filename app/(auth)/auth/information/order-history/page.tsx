"use client";
import { useGetHistoryListOrder } from "@/managers/api-management/order/useGetHistoryListOrder";
import { useGetStatusOrder } from "@/managers/api-management/order/useGetStatusOrder";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import HeaderOrderHistory from "./components/HeaderOrderHistory";
import ListOrderHistory from "./components/ListOrderHistory";

const OrderHistory = () => {
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(-1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [valueSearchDebounce] = useDebounce(searchValue, 500);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const { data: dataStatusOrder } = useGetStatusOrder();
  const { 
    data: currentPageData, 
    isFetching: isLoadingHistoryListOrder
  } = useGetHistoryListOrder({
      status_search: selectedStatusId,
      name_search: valueSearchDebounce,
    }, page, limit);

  // Xử lý cập nhật danh sách đơn hàng
  useEffect(() => {
    if (currentPageData) {
      const { data: currentPageOrders, next } = currentPageData;
      
      // Cập nhật trạng thái có trang tiếp theo hay không
      setHasNextPage(next === 1);
      
      if (page === 1) {
        // Reset danh sách khi ở trang đầu tiên
        setAllOrders(currentPageOrders || []);
      } else if (currentPageOrders && currentPageOrders.length > 0) {
        // Thêm vào danh sách hiện có khi có dữ liệu mới
        setAllOrders(prev => [...prev, ...currentPageOrders]);
      }
    }
  }, [currentPageData, page]);

  // Reset khi thay đổi điều kiện lọc
  const handleSelectStatus = (statusId: number | null) => {
    setSelectedStatusId(statusId);
    setPage(1);
    setAllOrders([]);
    setHasNextPage(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setPage(1);
    setAllOrders([]);
    setHasNextPage(false);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const isLoadingMore = isLoadingHistoryListOrder && page > 1;

  return (
    <div
      className="3xl:p-8 md:p-6 px-2 py-6 flex flex-col 3xl:gap-6 gap-4 h-full w-full"
    >
      {/* <HeaderOrderHistory handleValueChange={handleSearchChange} /> */}
      <ListOrderHistory
        dataStatusOrder={dataStatusOrder}
        dataHistoryListOrder={allOrders}
        isLoadingHistoryListOrder={isLoadingHistoryListOrder && page === 1}
        onSelectStatus={handleSelectStatus}
        selectedStatusId={selectedStatusId}
        onLoadMore={handleLoadMore}
        hasMore={hasNextPage}
        isLoadingMore={isLoadingMore}
      />
    </div>
  );
};

export default OrderHistory;
