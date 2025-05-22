"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IMAGES } from "@/constants/Images";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import { motion, AnimatePresence } from "framer-motion";
import { variantsContent } from "@/utils/variants-animation/VariantsAnimation";

type TabName = 'thongtin' | 'mota' | 'huongdan' | 'chinhsach';

interface ProductInfo {
  label: string;
  value: string | React.ReactNode;
}

interface TabData {
  title: string;
  content: React.ReactNode | ProductInfo[];
}

// Dữ liệu mẫu cho các tab
const tabsData: Record<TabName, TabData> = {
  thongtin: {
    title: "Thông tin sản phẩm",
    content: [
      { label: "Tên sản phẩm", value: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer (52046262)" },
      { label: "Mã sản phẩm", value: "17220-R1A-A01" },
      { label: "Mã phụ tùng tương thích", value: <>17220-R1A-A01<br />17220-R1A-A00</> },
      { label: "Dòng xe tương thích", value: <>HONDA - CIVIC 2.0 2012-2016<br />HONDA - CIVIC 1.8 2013</> },
      { label: "Phân loại giấy lọc", value: "Vải không dệt" },
      { label: "Kích thước", value: "246*186*49.5mm" },
      { label: "Công dụng", value: "Bảo vệ động cơ khỏi bụi bẩn, cát và các hạt kim loại nhỏ gây hại." },
    ]
  },
  mota: {
    title: "Mô tả sản phẩm",
    content: [
      { label: "Tên sản phẩm", value: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer (52046262)" },
      { label: "Mã sản phẩm", value: "17220-R1A-A01" },
      { label: "Mã phụ tùng tương thích", value: <>17220-R1A-A01<br />17220-R1A-A00</> },
      { label: "Dòng xe tương thích", value: <>HONDA - CIVIC 2.0 2012-2016<br />HONDA - CIVIC 1.8 2013</> },
      { label: "Phân loại giấy lọc", value: "Vải không dệt" },
      { label: "Kích thước", value: "246*186*49.5mm" },
      { label: "Công dụng", value: "Bảo vệ động cơ khỏi bụi bẩn, cát và các hạt kim loại nhỏ gây hại." },
    ]  },
  huongdan: {
    title: "Hướng dẫn sử dụng",
    content: [
      { label: "Tên sản phẩm", value: "Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer (52046262)" },
      { label: "Mã sản phẩm", value: "17220-R1A-A01" },
      { label: "Mã phụ tùng tương thích", value: <>17220-R1A-A01<br />17220-R1A-A00</> },
      { label: "Dòng xe tương thích", value: <>HONDA - CIVIC 2.0 2012-2016<br />HONDA - CIVIC 1.8 2013</> },
      { label: "Phân loại giấy lọc", value: "Vải không dệt" },
      { label: "Kích thước", value: "246*186*49.5mm" },
      { label: "Công dụng", value: "Bảo vệ động cơ khỏi bụi bẩn, cát và các hạt kim loại nhỏ gây hại." },
    ]  },
  chinhsach: {
    title: "Chính sách bảo hành",
    content: [] // Thêm nội dung chính sách sau này
  }
};

const ProductTabs = () => {
  const [openTabs, setOpenTabs] = useState({
    thongtin: true,
    mota: false,
    huongdan: false,
    chinhsach: false
  });

  const toggleTab = (tab: TabName) => {
    setOpenTabs(prev => ({
      ...prev,
      [tab]: !prev[tab]
    }));
  };

  const renderTabContent = (tab: TabName) => {
    const { content } = tabsData[tab];
    
    if (tab === 'thongtin') {
      return (
        <div className="flex flex-col gap-5">
          {(content as ProductInfo[]).map((item, index) => (
            <div key={index} className={`flex items-center gap-2 py-2 ${index < (content as ProductInfo[]).length - 1 ? 'border-b border-[#919EAB33]' : ''}`}>
              <div className="w-[30%] xl:w-[40%] text-grey-600 text-sm xl:text-base font-normal">
                {item.label}
              </div>
              <div className="w-[70%] xl:w-[60%] font-bold text-sm xl:text-base text-grey-800">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (tab === 'mota') {
      return (
        <div className="flex flex-col gap-5">
          {(content as ProductInfo[]).map((item, index) => (
            <div key={index} className={`flex items-center gap-2 py-2 ${index < (content as ProductInfo[]).length - 1 ? 'border-b border-[#919EAB33]' : ''}`}>
              <div className="w-[40%] text-grey-600 text-base font-normal">
                {item.label}
              </div>
              <div className="w-[60%] font-bold text-base text-grey-800">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (tab === 'huongdan') {
      return (
        <div className="flex flex-col gap-5">
          {(content as ProductInfo[]).map((item, index) => (
            <div key={index} className={`flex items-center gap-2 py-2 ${index < (content as ProductInfo[]).length - 1 ? 'border-b border-[#919EAB33]' : ''}`}>
              <div className="w-[40%] text-grey-600 text-base font-normal">
                {item.label}
              </div>
              <div className="w-[60%] font-bold text-base text-grey-800">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Đối với các tab khác, có thể thêm logic render tương ứng sau này
    return <div>Đang cập nhật...</div>;
  };

  return (
    <div className="flex flex-col gap-3 xl:gap-6 px-3 xl:px-0">
      <div className="rounded-lg xl:h-[700px] overflow-hidden">
        <Image
          src={IMAGES.pos1}
          alt="sản phẩm"
          width={600}
          height={700}
          className="w-full h-full object-cover"
        />
      </div>
      
      {Object.entries(tabsData).map(([key, data]) => {
        const tabKey = key as TabName;
        return (
          <div
            key={tabKey}
            className={`flex flex-col gap-2 xl:gap-6 px-3 xl:px-6 bg-white shadow-[0px_4px_48px_0px_#0000001A] rounded-lg ${
              openTabs[tabKey] ? "pb-6" : ""
            }`}
          >
            <div
              className={`py-3 xl:py-5 flex justify-between items-center cursor-pointer ${
                openTabs[tabKey] ? "border-b border-[#919EAB3D]" : ""
              }`}
              onClick={() => toggleTab(tabKey)}
            >
              <h2 className="text-lg xl:text-2xl font-semibold text-primary-new">
                {data.title}
              </h2>
              <motion.div
                animate={{ rotate: openTabs[tabKey] ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpIcon className="size-7" />
              </motion.div>
            </div>

            <AnimatePresence>
              {openTabs[tabKey] && (
                <motion.div
                  className="flex flex-col gap-5 overflow-hidden"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={variantsContent}
                  transition={{ duration: 0.3 }}
                >
                  {renderTabContent(tabKey)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default ProductTabs;
