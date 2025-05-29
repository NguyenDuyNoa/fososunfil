"use client";
import MegaMenuDropdown from "@/components/dropdown/DropdownMenu";
import IconCategoryAir from "@/components/icon/categoryProduct/IconCategoryAir";
import IconCategoryCabin from "@/components/icon/categoryProduct/IconCategoryCabin";
import IconCategoryFuel from "@/components/icon/categoryProduct/IconCategoryFuel";
import IconCategoryOil from "@/components/icon/categoryProduct/IconCategoryOil";
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
import MobileMenuOverlay from "@/components/Menu/MobileMenuOverlay";
import { TooltipHeader } from "@/components/tooltip/TooltipHeader";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/selectCustom";
import { IMAGES } from "@/constants/Images";
import { useGetInfoByToken } from "@/managers/api-management/auth/info/useGetInfoByToken";
import { useStateLayoutMain } from "@/managers/state-management/layout/useStateLayoutMain";
import { useStateHeader } from "@/states/Header/useStateHeader";
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";
import { useAuthStore } from "@/stores/useAuthStores";
import { MenuItem } from "@/types/categories/ICategoryes";
import { IMenuHeader } from "@/types/menu/IMenu";
import {
  Gift,
  Lock,
  SearchNormal,
  UserSquare
} from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Account from "./Account";
import CountryOptions from "./CountryOptions";

export interface DesktopHeaderProps {
  dataCountryOptions: any[];
  dataHeader: IMenuHeader[];
  handleToggleMenu: (action: string) => void;
  handleCodeChange: (value: string) => void;
  handleOpenDialog: (value: string, type_device: string) => void;
}

// export const categoryData: MenuItem[] = [
//   {
//     id: "filter1",
//     name: "Bộ Lọc Dầu",
//     icon: <IconCategoryOil />,
//     subItems: [
//       {
//         name: "Lọc dầu động cơ",
//         image: "/icons/category/imageSubItem.png",
//       },
//       {
//         name: "Lọc nhớt Hyundai",
//         image: "/icons/category/imageSubItem.png",
//       },
//       {
//         name: "Lọc nhớt Hyundai",
//         image: "/icons/category/imageSubItem.png",
//       },
//       {
//         name: "Lọc nhớt Hyundai",
//         image: "/icons/category/imageSubItem.png",
//       },
//       {
//         name: "Lọc nhớt Hyundai",
//         image: "/icons/category/imageSubItem.png",
//       },
//       {
//         name: "Lọc nhớt Hyundai",
//         image: "/icons/category/imageSubItem.png",
//       },
//     ],
//   },
//   {
//     id: "filter2",
//     name: "Bộ lọc không khí",
//     icon: <IconCategoryAir />,
//     subItems: [
//       {
//         name: "Lọc cabin Toyota",
//         image: "/icons/category/imageSubItem.png",
//       },
//     ],
//   },
//   {
//     id: "filter3",
//     name: "Bộ lọc nhiên liệu",
//     icon: <IconCategoryFuel />,
//     subItems: [
//       {
//         name: "Lọc cabin Toyota",
//         image: "/icons/category/imageSubItem.png",
//       },
//       {
//         name: "Lọc nhớt Hyundai",
//         image: "/icons/category/imageSubItem.png",
//       },
//     ],
//   },
//   {
//     id: "filter4",
//     name: "Bộ lọc trong cabin",
//     icon: <IconCategoryCabin />,
//     subItems: [
//       {
//         name: "Lọc cabin Toyota",
//         image: "/icons/category/imageSubItem.png",
//       },
//       {
//         name: "Lọc nhớt Hyundai",
//         image: "/icons/category/imageSubItem.png",
//       },
//       {
//         name: "Lọc nhớt Hyundai",
//         image: "/icons/category/imageSubItem.png",
//       },
//     ],
//   },
//   {
//     id: "filter5",
//     name: "Bộ lọc không khí",
//     icon: <IconCategoryAir />,
//     subItems: [
//       {
//         name: "Lọc cabin Toyota",
//         image: "/icons/category/imageSubItem.png",
//       },
//     ],
//   },
//   {
//     id: "filter6",
//     name: "Bộ lọc trong cabin",
//     icon: <IconCategoryCabin />,
//     subItems: [
//       {
//         name: "Lọc cabin Toyota",
//         image: "/icons/category/imageSubItem.png",
//       },
//       {
//         name: "Lọc nhớt Hyundai",
//         image: "/icons/category/imageSubItem.png",
//       },
//       {
//         name: "Lọc nhớt Hyundai",
//         image: "/icons/category/imageSubItem.png",
//       },
//     ],
//   },
//   {
//     id: "filter7",
//     name: "Bộ lọc nhiên liệu",
//     icon: <IconCategoryFuel />,
//     subItems: [
//       {
//         name: "Lọc cabin Toyota",
//         image: "/icons/category/imageSubItem.png",
//       },
//       {
//         name: "Lọc nhớt Hyundai",
//         image: "/icons/category/imageSubItem.png",
//       },
//     ],
//   },
//   {
//     id: "filter8",
//     name: "Bộ lọc không khí",
//     icon: <IconCategoryAir />,
//     subItems: [
//       {
//         name: "Lọc cabin Toyota",
//         image: "/icons/category/imageSubItem.png",
//       },
//     ],
//   },
// ];

const dataTabProfile = [
  {
    id: 144324,
    name: `Tài khoản của tôi`,
    icon: UserSquare,
    link: "/auth/information/profile",
  },
  {
    id: 54,
    name: `Lịch sử tìm kiếm`,
    icon: SearchNormal,
    link: "/auth/information/search-history",
  },
  {
    id: 542,
    name: `Lịch sử quà tặng`,
    icon: Gift,
    link: "/auth/information/gift-history",
  },
  {
    id: 323,
    name: `Đổi mật khẩu`,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="transition-all duration-500 relative z-30 bg-[#F4F6F8]">
      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
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
        <header className="z-10 w-full py-2 lg:py-3 container flex flex-col lg:flex-row items-center justify-between gap-x-8 2xl:gap-x-12">
          <div className="flex flex-row items-center justify-between w-full lg:w-fit">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <MenuLeftIcon className="size-6 lg:hidden text-[#0154C5]" />
            </button>
            <Link href="/" className="hidden xl:block">
              <Image
                src={IMAGES.logoSunfil}
                alt="logo"
                width={600}
                height={111}
                className="object-contain lg:w-[250px]"
                quality={100}
                loading="eager"
              />
            </Link>
            <Link href="/" className="xl:hidden">
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
                <IconCameraHeader fill="#041F2F" className="size-6" />
              </button>
              <button className="bg-brand-500 rounded-full py-2 px-3">
                <IconSearchHeader fill="white" className="size-4" />
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
            <div className="flex items-center gap-4">
              <CountryOptions />

              <div className="flex items-center gap-2 cursor-pointer relative hover:bg-brand-50 rounded-full py-1 px-2">
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

              <Account handleOpenDialog={handleOpenDialog} />
            </div>
          </div>
        </header>

        {/* category */}
        <div className="relative">
          <div className="hidden lg:flex items-center justify-between w-full pb-4 container">
            {/* Left Side - Categories */}
            <div className="flex items-center gap-9">
              <MegaMenuDropdown
                triggerLabel="Danh Mục Sản Phẩm"
                // items={categoryData}
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
