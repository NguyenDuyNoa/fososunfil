"use client";
import MegaMenuDropdown from "@/components/dropdown/DropdownMenu";
import IconCategoryAir from "@/components/icon/categoryProduct/IconCategoryAir";
import IconCategoryCabin from "@/components/icon/categoryProduct/IconCategoryCabin";
import IconCategoryFuel from "@/components/icon/categoryProduct/IconCategoryFuel";
import IconCategoryOil from "@/components/icon/categoryProduct/IconCategoryOil";
import IconAccountHeader from "@/components/icon/IconAccountHeader";
import IconCameraHeader from "@/components/icon/IconCameraHeader";
import IconDelivery from "@/components/icon/IconDelivery";
import IconDiscountHeader from "@/components/icon/IconDiscountHeader";
import IconDownloadApp from "@/components/icon/IconDownloadApp";
import IconFastDeliveryHeader from "@/components/icon/IconFastDeliveryHeader";
import IconPhone from "@/components/icon/IconPhone";
import IconReturnHeader from "@/components/icon/IconReturnHeader";
import IconSearchHeader from "@/components/icon/IconSearchHeader";
import IconShopping from "@/components/icon/IconShopping";
import IconSupportHeader from "@/components/icon/IconSupportHeader";
import { TooltipHeader } from "@/components/tooltip/TooltipHeader";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/selectCustom";
import { Tooltip } from "@/components/ui/tooltip";
import { IMAGES } from "@/constants/Images";
import { useStateHeader } from "@/states/Header/useStateHeader";
import { MenuItem } from "@/types/categories/ICategoryes";
import { IMenuHeader } from "@/types/menu/IMenu";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface DesktopHeaderProps {
  dataCountryOptions: any[];
  dataHeader: IMenuHeader[];
  handleToggleMenu: (action: string) => void;
  handleCodeChange: (value: string) => void;
  handleOpenDialog: (value: string, type_device: string) => void;
}

export const categoryData: MenuItem[] = [
  {
    id: "filter1",
    name: "Bộ Lọc Dầu",
    icon: <IconCategoryOil />,
    subItems: [
      {
        name: "Lọc dầu động cơ",
        image: "/icons/category/imageSubItem.png",
      },
      {
        name: "Lọc nhớt Hyundai",
        image: "/icons/category/imageSubItem.png",
      },
      {
        name: "Lọc nhớt Hyundai",
        image: "/icons/category/imageSubItem.png",
      },
      {
        name: "Lọc nhớt Hyundai",
        image: "/icons/category/imageSubItem.png",
      },
      {
        name: "Lọc nhớt Hyundai",
        image: "/icons/category/imageSubItem.png",
      },
      {
        name: "Lọc nhớt Hyundai",
        image: "/icons/category/imageSubItem.png",
      },
    ],
  },
  {
    id: "filter2",
    name: "Bộ lọc không khí",
    icon: <IconCategoryAir />,
    subItems: [
      {
        name: "Lọc cabin Toyota",
        image: "/icons/category/imageSubItem.png",
      },
    ],
  },
  {
    id: "filter3",
    name: "Bộ lọc nhiên liệu",
    icon: <IconCategoryFuel />,
    subItems: [
      {
        name: "Lọc cabin Toyota",
        image: "/icons/category/imageSubItem.png",
      },
      {
        name: "Lọc nhớt Hyundai",
        image: "/icons/category/imageSubItem.png",
      },
    ],
  },
  {
    id: "filter4",
    name: "Bộ lọc trong cabin",
    icon: <IconCategoryCabin />,
    subItems: [
      {
        name: "Lọc cabin Toyota",
        image: "/icons/category/imageSubItem.png",
      },
      {
        name: "Lọc nhớt Hyundai",
        image: "/icons/category/imageSubItem.png",
      },
      {
        name: "Lọc nhớt Hyundai",
        image: "/icons/category/imageSubItem.png",
      },
    ],
  },
];

const NewDesktopHeader = ({
  dataHeader,
  dataCountryOptions,
  handleToggleMenu,
  handleCodeChange,
  handleOpenDialog,
}: DesktopHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isStateHeader } = useStateHeader();
  const selectedOption = dataCountryOptions.find(
    (option) => option.code === isStateHeader.selectedCodeCountry
  );

  const pathname = usePathname();
  const [showExtraHeader, setShowExtraHeader] = useState(true);
  const [showTopHeader, setShowTopHeader] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setShowTopHeader(scrollY < 50); // Ẩn khi scroll qua 50px
      setShowCategory(scrollY < 250); // Ẩn khi scroll qua 150px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {/* Top notification bar */}
      <div className="w-full bg-linear-bg-top-header text-white py-1 text-sm flex items-center 3xl:px-12 2xl:px-10 xl:px-8 px-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <p className="text-xs text-white flex flex-row gap-x-2 font-normal">
              <IconDiscountHeader />
              <span>
                Nhập mã{" "}
                <span className="font-bold text-warning-normal">NEWBIE</span>{" "}
                giảm ngay 10% cho lần đầu mua hàng.
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-xs text-white gap-x-2">
              <IconPhone />
              <span>
                Hotline:{" "}
                <span className="font-bold text-warning-normal">
                  0283 760 7897
                </span>{" "}
              </span>
            </div>
            <TooltipHeader
              side="bottom"
              children={
                <div className="flex items-center text-white font-normal text-xs gap-x-2 shadow-md">
                  <IconDownloadApp />
                  <span>Tải ứng dụng</span>
                </div>
              }
              label={<div className="text-black">MÃ QR-CODE</div>}
              // className="bg-black"
              // classNameArrow="fill-[#000000]"
            />
          </div>
        </div>
      </div>

      {/* header */}
      <div className=" 3xl:px-12 2xl:px-10 xl:px-8 px-4 bg-white">
        {/* Main header */}
        <header className="w-full  py-3">
          <div className="flex items-center justify-between gap-x-8 w-full">
            {/* Logo */}
            <Link href="/">
              <Image
                src={IMAGES.logo}
                alt="logo"
                width={600}
                height={111}
                className="object-contain w-[200px]"
                quality={100}
                loading="eager"
              />
            </Link>
            <div className="flex-1 flex flex-row justify-between w-full xxl:gap-x-6 xl:gap-x-4 gap-x-3">
              {/* Search Bar */}
              <div className="flex flex-row items-center w-full  border-[2px] border-brand-500 rounded-full xxl:px-4 xxl:py-2 xl:py-[6px] xl:px-2 py-1 px-2">
                <input
                  type="text"
                  placeholder="Tìm sản phẩm"
                  className="flex-1 xxl:py-2 xxl:px-4 lg:py-1 lg:px-2 text-disable-50 border-none outline-none placeholder:text-disable-50 text-base  font-normal"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="mr-2">
                  <IconCameraHeader fill="#041F2F" />
                </button>
                <button className="bg-blue-600 rounded-full xxl:py-2 xxl:px-5 py-[6px] px-4">
                  <IconSearchHeader fill="white" />
                </button>
              </div>

              {/* Right Navigation */}
              <div className="flex items-center xxl:gap-x-8 xl:gap-x-5 gap-x-3">
                <div className="flex items-center">
                  <Select
                    value={selectedOption?.code}
                    onValueChange={handleCodeChange}
                  >
                    <SelectTrigger className="flex items-center gap-2 h-full border-none shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0">
                      {selectedOption && (
                        <>
                          <div className="size-8 rounded-full">
                            <Image
                              src={selectedOption.flag}
                              alt={`${selectedOption.country} flag`}
                              width={100}
                              height={100}
                              className="size-full object-cover rounded-full"
                            />
                          </div>
                          <div className="xl:text-base text-sm uppercase font-medium text-[#1C252E]">
                            {selectedOption.code}
                          </div>
                        </>
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {dataCountryOptions.map((option) => (
                        <SelectItem key={option.code} value={option.code}>
                          {option.country} ({option.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center cursor-pointer relative">
                  <IconShopping fill="#0154C5" />
                  <span className="ml-[2px] xl:text-base text-sm font-medium text-nowrap text-[#1C252E]">
                    Giỏ hàng
                  </span>
                  <div className="absolute -top-3 xxl:left-6 xl:left-5 left-5 bg-error-main rounded-full xxl:size-6 xl:size-5 size-5 flex items-center justify-center">
                    <span className="text-white text-xs font-medium ">12</span>
                  </div>
                </div>

                <div className="flex items-center cursor-pointer">
                  <IconAccountHeader fill="#0154C5" />
                  <span className="ml-[2px] xl:text-base text-sm font-medium text-nowrap text-[#1C252E]">
                    Tài khoản
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* category */}
        <div className="flex items-center justify-between w-full py-3">
          {/* Left Side - Categories */}
          <div className="flex items-center  xxl:gap-x-6 xl:gap-x-4 gap-x-3 ">
            {/* <div className="relative group cursor-pointer bg-white"> */}
            <MegaMenuDropdown
              triggerLabel="Danh Mục Sản Phẩm"
              items={categoryData}
              IsProducts={true}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              }
              allowHover={pathname === "/" ? false : true}
            />
            {/* </div> */}

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center xxl:gap-x-7 xl:gap-x-3 gap-x-2">
              <Link
                href="#"
                className="text-[#1C252E] hover:text-brand-400 xxl:text-base text-sm font-medium text-nowrap"
              >
                Về Chúng Tôi
              </Link>
              <Link
                href="#"
                className="text-[#1C252E] hover:text-brand-400 xxl:text-base  text-sm font-medium text-nowrap"
              >
                Bài Viết
              </Link>
              <Link
                href="#"
                className="text-[#1C252E] hover:text-brand-400 xxl:text-base text-sm font-medium text-nowrap"
              >
                Liên Hệ
              </Link>
            </nav>
          </div>

          {/* Right Side - Features */}
          <div className="hidden lg:flex items-center xxl:gap-x-5 xl:gap-x-3 gap-x-2">
            <div className="flex items-center xxl:gap-x-1 gap-x-[2px] text-nowrap text-xs xl:text-sm xxl:text-base font-semibold">
              <IconSupportHeader fill="#0373F3" />
              <span className="">Hỗ trợ 24/7</span>
            </div>

            <div className="flex items-center xxl:gap-x-1 gap-x-[2px] text-nowrap text-xs xl:text-sm xxl:text-base font-semibold ">
              <IconDelivery fill="#0373F3" />
              <span className="">Miễn Phí Vận Chuyển</span>
            </div>

            <div className="flex items-center xxl:gap-x-1 gap-x-[2px] text-nowrap text-xs xl:text-sm xxl:text-base font-semibold">
              <IconFastDeliveryHeader fill="#0373F3" />
              <span className="">Giao Hàng Nhanh 2h</span>
            </div>

            <div className="flex items-center xxl:gap-x-1 gap-x-[2px] text-nowrap text-xs xl:text-sm xxl:text-base font-semibold">
              <IconReturnHeader fill="#0373F3" />
              <span className="">30 Ngày Đổi Trả</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDesktopHeader;
