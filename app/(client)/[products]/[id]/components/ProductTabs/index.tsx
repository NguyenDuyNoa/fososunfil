"use client";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import { variantsContent } from "@/utils/variants-animation/VariantsAnimation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

type TabName = string;

interface ProductInfo {
  label: string;
  value: string | React.ReactNode;
}

interface TabData {
  title: string;
  content: React.ReactNode | ProductInfo[];
}

interface TabItem {
  name: string;
  item: Array<{
    name: string;
    value: string;
  }>;
}

const ProductTabs = ({
  tabs,
  imageDetail,
}: {
  tabs: TabItem[];
  imageDetail: string;
}) => {
  // Chuyển đổi dữ liệu từ tabs sang định dạng phù hợp
  const tabsData =
    tabs?.reduce((acc: Record<string, TabData>, tab: any) => {
      const tabKey = tab.name.toLowerCase().replace(/\s+/g, "");
      acc[tabKey] = {
        title: tab.name,
        content: tab.item.map((item: any) => ({
          label: item.name,
          value: item.value,
        })),
      };
      return acc;
    }, {}) || {};

  const [openTabs, setOpenTabs] = useState(() => {
    // Tạo trạng thái ban đầu với tab đầu tiên mở
    const initialState: Record<string, boolean> = {};
    const keys = Object.keys(tabsData);
    if (keys.length > 0) {
      keys.forEach((key, index) => {
        initialState[key] = index === 0;
      });
    }
    return initialState;
  });

  const toggleTab = (tab: TabName) => {
    setOpenTabs((prev) => ({
      ...prev,
      [tab]: !prev[tab],
    }));
  };

  const renderTabContent = (tab: TabName) => {
    const { content } = tabsData[tab];

    return (
      <div className="flex flex-col gap-5">
        {(content as ProductInfo[]).map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 py-2 ${
              index < (content as ProductInfo[]).length - 1
                ? "border-b border-[#919EAB33]"
                : ""
            }`}
          >
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
  };

  return (
    <div className="flex flex-col gap-3 xl:gap-6 px-3 xl:px-0">
      {!imageDetail?.includes("no_image.png") && (
        <div className="rounded-lg xl:h-[700px] overflow-hidden bg-white">
          <Image
            src={imageDetail}
            alt="sản phẩm"
            width={600}
            height={700}
            className="w-full h-full object-cover p-4"
          />
        </div>
      )}

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
