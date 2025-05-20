"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IMAGES } from "@/constants/Images";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import { motion, AnimatePresence } from "framer-motion";
import { variantsContent } from "@/utils/variants-animation/VariantsAnimation";

type TabName = 'thongtin' | 'mota' | 'huongdan' | 'chinhsach';

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

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg h-[700px] overflow-hidden">
        <Image
          src={IMAGES.pos}
          alt="sản phẩm"
          width={600}
          height={700}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div
        className={`flex flex-col gap-6 px-6 bg-white shadow-[0px_4px_48px_0px_#0000001A] rounded-lg ${
          openTabs.thongtin ? "pb-6" : ""
        }`}
      >
        <div
          className={`py-6 flex justify-between items-center cursor-pointer ${
            openTabs.thongtin ? "border-b border-[#919EAB3D]" : ""
          }`}
          onClick={() => toggleTab('thongtin')}
        >
          <h2 className="text-2xl font-semibold text-primary-new">
            Thông tin sản phẩm
          </h2>
          <motion.div
            animate={{ rotate: openTabs.thongtin ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpIcon className="size-12" />
          </motion.div>
        </div>

        <AnimatePresence>
          {openTabs.thongtin && (
            <motion.div
              className="flex flex-col gap-8 overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={variantsContent}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Tên sản phẩm
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer
                  (52046262)
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Mã sản phẩm
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  17220-R1A-A01
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Mã phụ tùng tương thích
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  17220-R1A-A01
                  <br />
                  17220-R1A-A00
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Dòng xe tương thích
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  HONDA - CIVIC 2.0 2012-2016
                  <br />
                  HONDA - CIVIC 1.8 2013
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Phân loại giấy lọc
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  Vải không dệt
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Kích thước
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  246*186*49.5mm
                </div>
              </div>

              <div className="flex gap-4 py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Công dụng
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  Bảo vệ động cơ khỏi bụi bẩn, cát và các hạt kim loại nhỏ gây
                  hại.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className={`flex flex-col gap-8 px-12 bg-white shadow-[0px_4px_48px_0px_#0000001A] rounded-lg ${
          openTabs.mota ? "pb-8" : ""
        }`}
      >
        <div
          className={`py-8 flex justify-between items-center cursor-pointer ${
            openTabs.mota ? "border-b-2 border-[#919EAB3D]" : ""
          }`}
          onClick={() => toggleTab('mota')}
        >
          <h2 className="text-[28px]/[32px] font-semibold text-primary-new">
            Mô tả chi tiết
          </h2>
          <motion.div
            animate={{ rotate: openTabs.mota ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpIcon className="size-12" />
          </motion.div>
        </div>

        <AnimatePresence>
          {openTabs.mota && (
            <motion.div
              className="flex flex-col gap-8 overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={variantsContent}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Tên sản phẩm
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer
                  (52046262)
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Mã sản phẩm
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  17220-R1A-A01
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Mã phụ tùng tương thích
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  17220-R1A-A01
                  <br />
                  17220-R1A-A00
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Dòng xe tương thích
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  HONDA - CIVIC 2.0 2012-2016
                  <br />
                  HONDA - CIVIC 1.8 2013
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Phân loại giấy lọc
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  Vải không dệt
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Kích thước
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  246*186*49.5mm
                </div>
              </div>

              <div className="flex gap-4 py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Công dụng
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  Bảo vệ động cơ khỏi bụi bẩn, cát và các hạt kim loại nhỏ gây
                  hại.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className={`flex flex-col gap-8 px-12 bg-white shadow-[0px_4px_48px_0px_#0000001A] rounded-lg ${
          openTabs.huongdan ? "pb-8" : ""
        }`}
      >
        <div
          className={`py-8 flex justify-between items-center cursor-pointer ${
            openTabs.huongdan ? "border-b-2 border-[#919EAB3D]" : ""
          }`}
          onClick={() => toggleTab('huongdan')}
        >
          <h2 className="text-[28px]/[32px] font-semibold text-primary-new">
            Hướng dẫn sử dụng
          </h2>
          <motion.div
            animate={{ rotate: openTabs.huongdan ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpIcon className="size-12" />
          </motion.div>
        </div>

        <AnimatePresence>
          {openTabs.huongdan && (
            <motion.div
              className="flex flex-col gap-8 overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={variantsContent}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Tên sản phẩm
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer
                  (52046262)
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Mã sản phẩm
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  17220-R1A-A01
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Mã phụ tùng tương thích
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  17220-R1A-A01
                  <br />
                  17220-R1A-A00
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Dòng xe tương thích
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  HONDA - CIVIC 2.0 2012-2016
                  <br />
                  HONDA - CIVIC 1.8 2013
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Phân loại giấy lọc
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  Vải không dệt
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Kích thước
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  246*186*49.5mm
                </div>
              </div>

              <div className="flex gap-4 py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Công dụng
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  Bảo vệ động cơ khỏi bụi bẩn, cát và các hạt kim loại nhỏ gây
                  hại.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div
        className={`flex flex-col gap-8 px-12 bg-white shadow-[0px_4px_48px_0px_#0000001A] rounded-lg ${
          openTabs.chinhsach ? "pb-8" : ""
        }`}
      >
        <div
          className={`py-8 flex justify-between items-center cursor-pointer ${
            openTabs.chinhsach ? "border-b-2 border-[#919EAB3D]" : ""
          }`}
          onClick={() => toggleTab('chinhsach')}
        >
          <h2 className="text-[28px]/[32px] font-semibold text-primary-new">
            Chính sách bảo hành, đổi trả
          </h2>
          <motion.div
            animate={{ rotate: openTabs.chinhsach ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpIcon className="size-12" />
          </motion.div>
        </div>

        <AnimatePresence>
          {openTabs.chinhsach && (
            <motion.div
              className="flex flex-col gap-8 overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={variantsContent}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Tên sản phẩm
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer
                  (52046262)
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Mã sản phẩm
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  17220-R1A-A01
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Mã phụ tùng tương thích
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  17220-R1A-A01
                  <br />
                  17220-R1A-A00
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Dòng xe tương thích
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  HONDA - CIVIC 2.0 2012-2016
                  <br />
                  HONDA - CIVIC 1.8 2013
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Phân loại giấy lọc
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  Vải không dệt
                </div>
              </div>

              <div className="flex gap-4 border-b-2 border-[#919EAB33] py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Kích thước
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  246*186*49.5mm
                </div>
              </div>

              <div className="flex gap-4 py-4">
                <div className="w-1/4 text-grey-600 text-2xl font-normal">
                  Công dụng
                </div>
                <div className="w-3/4 font-bold text-2xl text-grey-800">
                  Bảo vệ động cơ khỏi bụi bẩn, cát và các hạt kim loại nhỏ gây
                  hại.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductTabs;
