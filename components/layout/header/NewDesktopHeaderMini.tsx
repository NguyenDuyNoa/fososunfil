import IconCameraHeader from "@/components/icon/IconCameraHeader";
import IconSearchHeader from "@/components/icon/IconSearchHeader";
import {
  categoryData,
  DesktopHeaderProps,
} from "@/components/layout/header/NewDesktopHeader";
import { IMAGES } from "@/constants/Images";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useStateHeader } from "@/states/Header/useStateHeader";
import { SelectContent } from "@/components/ui/selectCustom";
import IconShopping from "@/components/icon/IconShopping";
import IconAccountHeader from "@/components/icon/IconAccountHeader";
import MegaMenuDropdown from "@/components/dropdown/DropdownMenu";

const NewDesktopHeaderMini = ({
  dataHeader,
  dataCountryOptions,
  handleToggleMenu,
  handleCodeChange,
  handleOpenDialog,
}: DesktopHeaderProps) => {
  const { isStateHeader } = useStateHeader();
  const [searchQuery, setSearchQuery] = useState("");
  const selectedOption = dataCountryOptions.find(
    (option) => option.code === isStateHeader.selectedCodeCountry
  );
  return (
    <div className=" 3xl:px-12 2xl:px-10 xl:px-8 px-4 bg-white shadow-[0px_20px_40px_-4px_rgba(145,158,171,0.16)] ">
      {/* Main header */}
      <header className="w-full py-1">
        <div className="flex items-center justify-between gap-x-8 w-full">
          {/* Logo */}
          <Link href="/">
            <Image
              src={IMAGES.logo}
              alt="logo"
              width={600}
              height={111}
              className="object-contain w-[140px]"
              quality={100}
              loading="eager"
            />
          </Link>
          <div className="flex-1 flex flex-row justify-between items-center w-full xxl:gap-x-6 xl:gap-x-4 gap-x-3">
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
              //   allowHover={pathname === "/" ? false : true}
              classNameButton="text-nowrap"
              isMiniHeader={true}
            />

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
    </div>
  );
};

export default NewDesktopHeaderMini;
