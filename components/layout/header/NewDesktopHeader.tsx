"use client";
import AvatarCustom from "@/components/avatar/AvatarCustom";
import { DottedSeparator } from "@/components/dotted-separator/dotted-separator";
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
import MenuLeftIcon from "@/components/icons/MenuLeftIcon";
import { TooltipHeader } from "@/components/tooltip/TooltipHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/selectCustom";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { IMAGES } from "@/constants/Images";
import { useGetInfoByToken } from "@/managers/api-management/auth/info/useGetInfoByToken";
import { useStateLayoutMain } from "@/managers/state-management/layout/useStateLayoutMain";
import { useStateHeader } from "@/states/Header/useStateHeader";
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";
import { useAuthStore } from "@/stores/useAuthStores";
import { MenuItem } from "@/types/categories/ICategoryes";
import { IMenuHeader } from "@/types/menu/IMenu";
import { scrollToSection } from "@/utils/scroll/ScrollFunction";
import {
  ArrowDown2,
  Gift,
  Lock,
  Logout,
  SearchNormal,
  UserSquare,
} from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import ButtonAnimation from "../../button/ButtonAnimation";

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
  {
    id: "filter5",
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
    id: "filter6",
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
  {
    id: "filter7",
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
    id: "filter8",
    name: "Bộ lọc không khí",
    icon: <IconCategoryAir />,
    subItems: [
      {
        name: "Lọc cabin Toyota",
        image: "/icons/category/imageSubItem.png",
      },
    ],
  },
];

const dataTabProfile = [
  {
    id: 144324,
    name: `My Account`,
    icon: UserSquare,
    link: "/auth/information/profile",
  },
  {
    id: 54,
    name: `Search History`,
    icon: SearchNormal,
    link: "/auth/information/search-history",
  },
  {
    id: 542,
    name: `Gift History`,
    icon: Gift,
    link: "/auth/information/gift-history",
  },
  {
    id: 323,
    name: `Change Password`,
    icon: Lock,
    link: "/auth/setting/change-password",
  },
];

const NewDesktopHeader = ({
  dataHeader,
  dataCountryOptions,
  handleToggleMenu,
  handleCodeChange,
  handleOpenDialog,
}: DesktopHeaderProps) => {
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading } = useGetInfoByToken();
  const { informationUser } = useAuthStore();

  const { isStateHeader } = useStateHeader();
  const { isStateLayoutMain, queryKeyIsStateLayoutMain } = useStateLayoutMain();
  const { setOpenAlertDialog } = useAlertDialogStore();

  const selectedOption = dataCountryOptions.find(
    (option) => option.code === isStateHeader.selectedCodeCountry
  );

  const handleDropdownChange = (value: boolean) => {
    queryKeyIsStateLayoutMain({
      header: {
        ...isStateLayoutMain?.header,
        openDropdownProfile: value,
      },
    });
  };

  return (
    <div className="transition-all duration-500 relative z-20 bg-[#F4F6F8]">
      {/* Top notification bar */}
      <div className="w-full bg-linear-bg-top-header text-white text-sm flex items-center xl:py-1">
        <div className="container flex xl:justify-between justify-center items-center w-full">
          <div className="flex items-center">
            <p className="text-[8px]/[16px] xl:text-xs text-secondary-50 flex flex-row items-center gap-x-2 font-normal">
              <IconDiscountHeader className="size-3 xl:size-5" />
              <span>
                Nhập mã{" "}
                <span className="text-[8px]/[20px] xl:text-sm font-bold text-warning-normal">
                  NEWBIE
                </span>{" "}
                giảm ngay 10% cho lần đầu mua hàng.
              </span>
            </p>
          </div>
          <div className="hidden xl:flex items-center space-x-4">
            <Link
              href="tel:02837607897"
              className="flex items-center text-xs text-white gap-x-2"
            >
              <IconPhone />
              <span>
                Hotline:{" "}
                <span className="text-sm font-bold text-warning-normal">
                  0283 760 7897
                </span>{" "}
              </span>
            </Link>
            <TooltipHeader
              side="bottom"
              children={
                <div className="flex items-center text-white font-normal text-xs gap-x-2">
                  <IconDownloadApp />
                  <span>Tải ứng dụng</span>
                </div>
              }
              label={<div className="text-black">MÃ QR-CODE</div>}
            />
          </div>
        </div>
      </div>

      {/* header */}
      <div className="bg-white rounded-b-xl lg:rounded-b-none">
        {/* Main header */}
        <header className="w-full py-2 lg:py-3 container flex flex-col lg:flex-row items-center justify-between gap-x-8 2xl:gap-x-12">
          <div className="flex flex-row items-center justify-between w-full lg:w-fit">
            <MenuLeftIcon className="size-6 lg:hidden text-[#0154C5]" />
            <Link href="/" className="hidden lg:block">
              <Image
                src={IMAGES.logo}
                alt="logo"
                width={600}
                height={111}
                className="object-contain lg:w-[250px]"
                quality={100}
                loading="eager"
              />
            </Link>
            <Link href="/" className="lg:hidden">
              <Image
                src={IMAGES.logoMb}
                alt="logo"
                width={600}
                height={111}
                className="object-contain w-[106px]"
                quality={100}
                loading="eager"
              />
            </Link>

            <div className="lg:hidden flex items-center gap-2 cursor-pointer relative bg-[#0154C5] p-2 rounded-full">
              <IconShopping fill="white" className="size-5" />
              <div className="absolute top-0 right-0 bg-error-main rounded-full size-4 flex items-center justify-center">
                <span className="text-white text-[10px]/[16px] font-medium mt-0.5">
                  12
                </span>
              </div>
            </div>
          </div>
          <div className="py-2 w-full lg:hidden">
            <div className="flex flex-row items-center w-full border-[1.5px] border-brand-500 rounded-full p-1 pl-5">
              <input
                type="text"
                placeholder="Tìm sản phẩm"
                className="flex-1 bg-transparent pt-0.5 text-disable-50 border-none outline-none placeholder:text-disable-50 text-sm/[24px] font-normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="mr-2">
                <IconCameraHeader fill="#041F2F" className="size-6"/>
              </button>
              <button className="bg-brand-500 rounded-full py-2 px-3">
                <IconSearchHeader fill="white" className="size-4"/>
              </button>
            </div>
          </div>

          <div className="flex-1 hidden lg:flex flex-row justify-between w-full gap-8 2xl:gap-12">
            {/* Search Bar */}
            <div className="flex flex-row items-center w-full border-[2px] border-brand-500 rounded-full xxl:px-4 xxl:py-2 xl:py-[6px] xl:px-2 py-1 px-2">
              <input
                type="text"
                placeholder="Tìm sản phẩm"
                className="flex-1 xxl:py-2 xxl:px-4 lg:py-1 lg:px-2 text-disable-50 border-none outline-none placeholder:text-disable-50 text-base font-normal"
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
            <div className="flex items-center gap-8 2xl:gap-12">
              <div className="flex items-center">
                <Select
                  value={selectedOption?.code}
                  onValueChange={handleCodeChange}
                >
                  <SelectTrigger className="p-0 flex items-center gap-2 h-full border-none shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0">
                    {selectedOption && (
                      <>
                        <div className="size-9 rounded-full">
                          <Image
                            src={selectedOption.flag}
                            alt={`${selectedOption.country} flag`}
                            width={100}
                            height={100}
                            className="size-full object-cover rounded-full"
                          />
                        </div>
                        <div className="text-sm uppercase font-medium text-primary-new">
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

              <div className="flex items-center gap-2 cursor-pointer relative">
                <IconShopping fill="#0154C5" className="size-9" />
                <span className="text-sm font-medium whitespace-nowrap text-primary-new">
                  Giỏ hàng
                </span>
                <div className="absolute -top-3 left-[22px] bg-error-main rounded-full size-6 flex items-center justify-center">
                  <span className="text-white text-xs font-medium mt-0.5">
                    12
                  </span>
                </div>
              </div>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Skeleton className="3xl:size-10 3xl:min-w-10 3xl:min-h-10 size-8 min-w-8 min-h-8 rounded-full" />
                </div>
              ) : informationUser ? (
                <DropdownMenu
                  open={isStateLayoutMain?.header?.openDropdownProfile}
                  onOpenChange={(value) => handleDropdownChange(value)}
                >
                  <DropdownMenuTrigger className="focus:outline-none focus:ring-0 select-none group">
                    <div
                      className={`text-white flex gap-2 items-center cursor-pointer font-medium col-span-1 3xl:text-[17px] xxl:text-base xl:text-sm text-sm hover:text-[#0E0E0E] custom-transition`}
                    >
                      <div className="3xl:size-10 3xl:min-w-10 3xl:min-h-10 size-8 min-w-8 min-h-8 caret-inherit">
                        <AvatarCustom
                          classNameContainer="w-full h-full shadow"
                          avatar={
                            informationUser?.client_image ??
                            "/avatar/avatar_default.png"
                          }
                        />
                      </div>
                      <div
                        className={`${
                          isStateLayoutMain?.header?.openDropdownProfile
                            ? "text-[#07A6FF]"
                            : "text-[#333538]"
                        } text-sm-default font-semibold group-hover:text-[#07A6FF] text-nowrap whitespace-nowrap custom-transition`}
                      >
                        {informationUser?.company}
                      </div>
                      <ArrowDown2
                        variant="Bold"
                        className={`${
                          isStateLayoutMain?.header?.openDropdownProfile
                            ? "rotate-180 text-[#07A6FF]"
                            : "text-[#333538]"
                        } group-hover:text-[#07A6FF] size-5 custom-transition`}
                      />
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="min-w-60 border-none p-4 space-y-2 dark:bg-[#09112B]"
                    style={{
                      boxShadow:
                        "0px 4px 4px 0px #0000004D, 0px 8px 12px 6px #00000026",
                    }}
                    side="bottom"
                    sideOffset={10}
                    collisionPadding={{ right: 30 }}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <AvatarCustom
                        avatar={
                          informationUser?.client_image ??
                          "/avatar/avatar_default.png"
                        }
                        classNameContainer="size-10"
                      />

                      <div className="text-sm-default text-neutral-500 font-semibold">
                        {informationUser?.company}
                      </div>
                    </div>

                    <DottedSeparator />
                    {dataTabProfile &&
                      dataTabProfile.map((item: any, index) => {
                        const checkActive =
                          pathname?.startsWith(item.link) ||
                          pathname === item.link;

                        return (
                          <React.Fragment key={`tab-profile-${item.id}`}>
                            {index === 4 && <Separator />}
                            <Link
                              href={item.link ?? ""}
                              className="flex items-center gap-2 group"
                              onClick={() => handleDropdownChange(false)}
                            >
                              <div
                                className={`size-5 max-w-[10%] ${
                                  checkActive
                                    ? "text-[#07A6FF]"
                                    : "text-[#545454]"
                                } transition-all duration-150 ease-linear group-hover:text-[#07A6FF] custom-transition`}
                              >
                                <item.icon
                                  variant={checkActive ? "Bold" : "Linear"}
                                  className="size-full"
                                />
                              </div>
                              <div
                                className={`text-sm-default ${
                                  checkActive
                                    ? "text-[#07A6FF]"
                                    : "text-[#545454]"
                                } transition-all duration-150 ease-linear group-hover:text-[#07A6FF] custom-transition`}
                              >
                                {item?.name ?? ""}
                              </div>
                            </Link>
                          </React.Fragment>
                        );
                      })}
                    <DottedSeparator />

                    <div
                      className="flex items-center gap-2 text-red-500  group cursor-pointer"
                      onClick={() => {
                        setOpenAlertDialog(true, "logout");
                        handleDropdownChange(false);
                      }}
                    >
                      <Logout className="size-5 group-hover:text-red-500 hover:text-red-500 custom-transition" />
                      <div className="text-default group-hover:text-red-500 hover:text-red-500 custom-transition">
                        Log out
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleOpenDialog("login", "desktop")}
                >
                  <IconAccountHeader fill="#0154C5" className="size-9" />
                  <span className="text-sm font-medium whitespace-nowrap text-primary-new">
                    Tài khoản
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* category */}
        <div className="relative z-10">
          <div className="hidden lg:flex items-center justify-between w-full pb-4 container">
            {/* Left Side - Categories */}
            <div className="flex items-center gap-9">
              <MegaMenuDropdown
                triggerLabel="Danh Mục Sản Phẩm"
                items={categoryData}
                IsProducts={true}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-[18px]"
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

              {/* Navigation Links */}
              <nav className="hidden lg:flex items-center gap-7">
                <Link
                  href="/about-us"
                  className="text-[#1C252E] hover:text-brand-400 text-base font-medium text-nowrap"
                >
                  Về Chúng Tôi
                </Link>
                <Link
                  href="/categories"
                  className="text-[#1C252E] hover:text-brand-400 text-base font-medium text-nowrap"
                >
                  Catalogue
                </Link>
                <Link
                  href="/blogs"
                  className="text-[#1C252E] hover:text-brand-400 text-base font-medium text-nowrap"
                >
                  Bài Viết
                </Link>
                <Link
                  href="/contact-us"
                  className="text-[#1C252E] hover:text-brand-400 text-base font-medium text-nowrap"
                >
                  Liên Hệ
                </Link>
              </nav>
            </div>

            {/* Right Side - Features */}
            <div className="hidden lg:flex items-center gap-5">
              <div className="flex items-center gap-2 text-xs whitespace-nowrap text-primary-new font-semibold">
                <IconSupportHeader fill="#0373F3" />
                <span className="pt-0.5">Hỗ trợ 24/7</span>
              </div>

              <div className="flex items-center gap-2 text-xs whitespace-nowrap text-primary-new font-semibold">
                <IconDelivery fill="#0373F3" />
                <span className="pt-0.5">Miễn Phí Vận Chuyển</span>
              </div>

              <div className="flex items-center gap-2 text-xs whitespace-nowrap text-primary-new font-semibold">
                <IconFastDeliveryHeader fill="#0373F3" />
                <span className="pt-0.5">Giao Hàng Nhanh 2h</span>
              </div>

              <div className="flex items-center gap-2 text-xs whitespace-nowrap text-primary-new font-semibold">
                <IconReturnHeader fill="#0373F3" />
                <span className="pt-0.5">30 Ngày Đổi Trả</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDesktopHeader;
