"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

interface HeaderOrderHistoryProps {
  handleValueChange?: any;
}

const HeaderOrderHistory: React.FC<HeaderOrderHistoryProps> = ({
  handleValueChange,
}) => {
  return (
    <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between lg:gap-0 gap-4">
      <div className="flex items-center gap-2">
        <span className="text-title text-[#3E424E] font-bold">
          Lịch sử đơn hàng
        </span>
      </div>

      <div className="3xl:h-12 h-10 w-full lg:max-w-[40%] max-w-full relative">
        <Search className="3xl:w-6 w-5 3xl:h-6 h-5 absolute top-[25%] left-4 text-[#808990]" />
        <Input
          type="text"
          placeholder={"Tìm kiếm mã đơn, tên sản phẩm..."}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleValueChange(e);
          }}
          className="placeholder:text-[#B2BABD] text-black text-sm-default border-2 border-[#EBEDEE] bg-transparent focus-visible:border-[#07A6FF] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none rounded-3xl px-12 w-full 3xl:h-12 h-10"
        />
      </div>
    </div>
  );
};

export default HeaderOrderHistory;
