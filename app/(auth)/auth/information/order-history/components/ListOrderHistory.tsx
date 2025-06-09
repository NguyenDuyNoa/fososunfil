"use client";
import { useGetHistoryListOrder } from "@/managers/api-management/order/useGetHistoryListOrder";
import Image from "next/image";

const ListOrderHistory = () => {
  const { data: dataHistoryListOrder, isFetching: isLoadingHistoryListOrder } =
    useGetHistoryListOrder({
      page: 1,
      limit: 10,
    });

  console.log("dataHistoryListOrder", dataHistoryListOrder);
  //   const { ref, inView } = useInView();
  //   const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  //   const { isStateGiftHistory, queryKeyIsStateGiftHistory } =
  //     useStateGiftHistory();

  //   const [valueSearchDebounce] = useDebounce(
  //     isStateGiftHistory?.search?.searchCode,
  //     500
  //   ); // search báo giá

  //   const { data: dataGiftHistoryList, isFetching: isLoadingGiftHistoryList } =
  //     useGetGiftHistoryList({
  //       pageIndex: isStateGiftHistory?.tableGiftList?.pageIndex,
  //       pageSize: isStateGiftHistory?.tableGiftList?.pageSize,
  //       search: valueSearchDebounce,
  //     });

  //   const [columnResizeMode, setColumnResizeMode] =
  //     useState<ColumnResizeMode>("onChange");

  //   const columnsData: ColumnDef<any>[] = useMemo(
  //     () => [
  //       {
  //         id: "index",
  //         accessorKey: "index",
  //         header: ({ column }) => <div />,
  //         cell: ({ row }) => {
  //           const pageIndex = +isStateGiftHistory?.tableGiftList?.pageIndex || 1;
  //           const pageSize = +isStateGiftHistory?.tableGiftList?.pageSize || 10;
  //           const indexGift = (pageIndex - 1) * pageSize + row.index + 1;

  //           // let indexGift = row?.index + 1;

  //           if (indexGift) {
  //             return (
  //               <div className="3xl:text-base text-sm text-center text-[#5F656A] py-[14px]">
  //                 {indexGift}
  //               </div>
  //             );
  //           }

  //           return null;
  //         },
  //         size: 100,
  //         minSize: 100,
  //         maxSize: 100,
  //         enableResizing: false, // Disable resizing for this column
  //       },
  //       {
  //         id: "avatar",
  //         accessorKey: "avatar",
  //         header: ({ column }) => (
  //           <div
  //             onClick={() => {
  //               column.toggleSorting(column.getIsSorted() === "asc");
  //             }}
  //             className="cursor-pointer select-none 3xl:text-base text-sm flex items-center justify-start w-full h-full text-[#5F656A] font-medium opacity-[74%]"
  //           >
  //             <p>Image</p>
  //           </div>
  //         ),
  //         cell: ({ row }) => {
  //           console.log("row", row);

  //           let image = row?.original?.avatar;
  //           return (
  //             <div className="3xl:size-24 3xl:max-w-24 xxl:size-20 xxl:max-w-20 size-16 max-w-16">
  //               <Image
  //                 alt="gift"
  //                 src={image ?? "/default/default.png"}
  //                 width={300}
  //                 height={300}
  //                 className="size-full object-contain"
  //                 unoptimized
  //                 priority
  //               />
  //             </div>
  //           );
  //         },
  //         size: 200,
  //         minSize: 200,
  //         maxSize: 200,
  //       },
  //       {
  //         id: "name",
  //         accessorKey: "name",
  //         header: ({ column }) => (
  //           <div
  //             onClick={() => {
  //               column.toggleSorting(column.getIsSorted() === "asc");
  //             }}
  //             className="cursor-pointer select-none 3xl:text-base text-sm flex items-center justify-start 3xl:max-w-full xl:min-w-[120px] md:min-w-[80px] w-full h-full text-start text-[#5F656A] font-medium opacity-[74%]"
  //           >
  //             <p>Name Event</p>
  //           </div>
  //         ),
  //         cell: ({ row }) => {
  //           let name = row?.original?.name;

  //           if (name) {
  //             return (
  //               <div className="3xl:text-base text-sm w-full text-start text-[#5F656A] py-[14px]">
  //                 {name}
  //               </div>
  //             );
  //           }

  //           return null;
  //         },
  //         size: 200,
  //         minSize: 200,
  //         maxSize: 200,
  //       },
  //       {
  //         id: "name_gift",
  //         accessorKey: "name_gift",
  //         header: ({ column }) => (
  //           <div
  //             onClick={() => {
  //               column.toggleSorting(column.getIsSorted() === "asc");
  //             }}
  //             className="cursor-pointer select-none 3xl:text-base text-sm flex items-center justify-start 3xl:max-w-full xl:min-w-[120px] md:min-w-[80px] w-full h-full text-start text-[#5F656A] font-medium opacity-[74%]"
  //           >
  //             <p>Name Gift</p>
  //           </div>
  //         ),
  //         cell: ({ row }) => {
  //           let name_gift = row?.original?.name_gift;
  //           if (name_gift) {
  //             return (
  //               <div className="3xl:text-base text-sm w-full text-start text-[#5F656A] py-[14px]">
  //                 {name_gift}
  //               </div>
  //             );
  //           }

  //           return null;
  //         },
  //         size: 200,
  //         minSize: 200,
  //         maxSize: 200,
  //       },
  //       {
  //         id: "content",
  //         accessorKey: "content",
  //         header: ({ column }) => (
  //           <div
  //             onClick={() => {
  //               column.toggleSorting(column.getIsSorted() === "asc");
  //             }}
  //             className="cursor-pointer select-none 3xl:text-base text-sm flex items-center justify-start w-full h-full text-start text-[#5F656A] font-medium opacity-[74%]"
  //           >
  //             <p>Description</p>
  //           </div>
  //         ),
  //         cell: ({ row }) => {
  //           let content = row?.original?.content;
  //           if (content) {
  //             return (
  //               <div
  //                 className="3xl:text-base text-sm w-full text-start text-[#5F656A] py-[14px]"
  //                 dangerouslySetInnerHTML={{ __html: `${content ?? ""}` }}
  //               />
  //             );
  //           }

  //           return null;
  //         },
  //         size: 200,
  //         minSize: 200,
  //         maxSize: 200,
  //       },
  //       {
  //         id: "code",
  //         accessorKey: "code",
  //         header: ({ column }) => (
  //           <div
  //             onClick={() => {
  //               column.toggleSorting(column.getIsSorted() === "asc");
  //             }}
  //             className="cursor-pointer select-none 3xl:text-base text-sm flex items-center justify-start w-full h-full text-start text-[#5F656A] font-medium opacity-[74%]"
  //           >
  //             <p>Code</p>
  //           </div>
  //         ),
  //         cell: ({ row }) => {
  //           let code = row?.original?.code;
  //           if (code) {
  //             return (
  //               <div className="3xl:text-base text-sm w-full text-start text-[#5F656A] py-[14px]">
  //                 {code}
  //               </div>
  //             );
  //           }

  //           return null;
  //         },
  //         size: 200,
  //         minSize: 200,
  //         maxSize: 200,
  //       },
  //       {
  //         id: "date_use",
  //         accessorKey: "date_use",
  //         header: ({ column }) => (
  //           <div
  //             onClick={() => {
  //               column.toggleSorting(column.getIsSorted() === "asc");
  //             }}
  //             className="cursor-pointer select-none 3xl:text-base text-sm flex items-center justify-start w-full h-full text-start text-[#5F656A] font-medium opacity-[74%]"
  //           >
  //             <p>Date Active</p>
  //           </div>
  //         ),
  //         cell: ({ row }) => {
  //           let date_use = row?.original?.date_use;
  //           if (date_use) {
  //             return (
  //               <div className="3xl:text-base text-sm w-full text-start text-[#5F656A] py-[14px]">
  //                 {moment(date_use).format(FORMAT_DATE?.DATE_TIME_SLASH_SHORT)}
  //               </div>
  //             );
  //           }

  //           return null;
  //         },
  //         size: 200,
  //         minSize: 200,
  //         maxSize: 200,
  //       },
  //       {
  //         id: "status",
  //         accessorKey: "status",
  //         header: ({ column }) => (
  //           <div
  //             onClick={() => {
  //               column.toggleSorting(column.getIsSorted() === "asc");
  //             }}
  //             className="cursor-pointer select-none 3xl:text-base text-sm flex items-center justify-center w-full h-full text-center text-[#5F656A] font-medium opacity-[74%]"
  //           >
  //             <p>Status</p>
  //           </div>
  //         ),
  //         cell: ({ row }) => {
  //           let status_receive = row?.original?.status_receive;

  //           return (
  //             <div className="flex items-center justify-center">
  //               <StatusTag
  //                 status={status_receive === "0" ? "not_received" : "received"}
  //               />
  //             </div>
  //           );
  //         },
  //         size: 140,
  //         minSize: 140,
  //         maxSize: 140,
  //       },
  //     ],
  //     [isStateGiftHistory?.tableGiftList, valueSearchDebounce]
  //   );

  //   const tableInstance = useDataTable({
  //     data: dataGiftHistoryList?.gift || [],
  //     columns: columnsData,
  //     pageCount: +isStateGiftHistory?.tableGiftList?.pageCount,
  //     pageSizeState: +isStateGiftHistory?.tableGiftList?.pageSize,
  //     manualPagination: true,
  //     columnResizeMode,
  //     onPaginationChange: ({ pageIndex, pageSize }) => {
  //       if (
  //         pageSize != +isStateGiftHistory?.tableGiftList?.pageSize &&
  //         +isStateGiftHistory?.tableGiftList?.pageSize != 0
  //       ) {
  //         tableInstance.setPageIndex(0);
  //         queryKeyIsStateGiftHistory({
  //           tableGiftList: {
  //             ...isStateGiftHistory?.tableGiftList,
  //             pageIndex: 1,
  //             pageSize: pageSize,
  //           },
  //         });
  //         return;
  //       }
  //       queryKeyIsStateGiftHistory({
  //         tableGiftList: {
  //           ...isStateGiftHistory?.tableGiftList,
  //           pageIndex: pageIndex + 1,
  //           pageSize: pageSize,
  //         },
  //       });
  //     },
  //   });

  //   const handlePaginationChange = (newPageIndex: number) => {
  //     tableInstance.setPageIndex(newPageIndex);
  //     queryKeyIsStateGiftHistory({
  //       tableGiftList: {
  //         ...isStateGiftHistory?.tableGiftList,
  //         pageIndex: newPageIndex + 1,
  //         pageSize: tableInstance.getState().pagination.pageSize,
  //       },
  //     });
  //   };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <div className="flex gap-3 px-1 py-1 border-b-2 border-[#1B56F5]">
          <span className="text-sm font-medium text-[#1B56F5]">Tất cả</span>
          <span className="text-xs h-fit bg-[#EEF5FF] text-[#1B56F5] rounded-full px-1.5 py-0.5">
            23,109
          </span>
        </div>
        <div className="flex gap-3 px-1 py-1 border-b-2 border-transparent">
          <span className="text-sm font-medium text-[#5F656A]">
            Chờ xác nhận
          </span>
          <span className="text-xs h-fit bg-[#F4F4F5] text-[#5F656A] rounded-full px-1.5 py-0.5">
            23,109
          </span>
        </div>
        <div className="flex gap-3 px-1 py-1 border-b-2 border-transparent">
          <span className="text-sm font-medium text-[#5F656A]">
            Đã xác nhận
          </span>
          <span className="text-xs h-fit bg-[#F4F4F5] text-[#5F656A] rounded-full px-1.5 py-0.5">
            23,109
          </span>
        </div>
        <div className="flex gap-3 px-1 py-1 border-b-2 border-transparent">
          <span className="text-sm font-medium text-[#5F656A]">
            Phiếu giao hàng
          </span>
          <span className="text-xs h-fit bg-[#F4F4F5] text-[#5F656A] rounded-full px-1.5 py-0.5">
            23,109
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-lg flex flex-col gap-4 border border-[#EBEDEE] overflow-hidden">
          <div className="flex justify-end px-4 py-2.5 bg-brand-300">
            <div className="flex items-center gap-1">
              <p className="text-[#808990] text-sm font-medium">Ngày tạo</p>
              <p className="text-[#615353] text-sm font-bold">12/06/2025</p>
            </div>
          </div>
          <div className="grid grid-cols-7 items-center gap-8 px-6 pb-5">
            <div className="flex items-center gap-5 col-span-5">
              <Image
                src={
                  dataHistoryListOrder?.items?.[0]?.images ??
                  "/default/default.png"
                }
                alt="order-history"
                width={100}
                height={100}
                className="size-20 object-cover rounded-lg border border-grey-400"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold text-primary-new">
                  Laptop Acer TravelMate B3 TMB311 31 C2HB N4020 / 4GB / 128GB{" "}
                </h3>
                <p className="text-sm font-medium text-grey-600">Số lượng: 1</p>
              </div>
            </div>
            <p className="text-sm font-bold text-primary-new">
              12.000.000{" "}
              <span className="underline">đ</span>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOrderHistory;
