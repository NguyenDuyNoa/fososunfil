"use client";
import MegaMenuDropdown from "@/components/dropdown/DropdownMenu";
import IconDiscountHeader from "@/components/icon/IconDiscountHeader";
import IconDownloadApp from "@/components/icon/IconDownloadApp";
import IconPhone from "@/components/icon/IconPhone";
import MenuLeftIcon from "@/components/icons/MenuLeftIcon";
import MobileMenuOverlay from "@/components/Menu/MobileMenuOverlay";
import { TooltipHeader } from "@/components/tooltip/TooltipHeader";
import { IMAGES } from "@/constants/Images";
import { useGetInfoByToken } from "@/managers/api-management/auth/info/useGetInfoByToken";
import { useStateLayoutMain } from "@/managers/state-management/layout/useStateLayoutMain";
import { useStateHeader } from "@/states/Header/useStateHeader";
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";
import { useAuthStore } from "@/stores/useAuthStores";
import { IMenuHeader } from "@/types/menu/IMenu";
import { Gift, Lock, SearchNormal, UserSquare } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Account from "./Account";
import Cart from "./Cart";
import CountryOptions from "./CountryOptions";
import SearchBar from "./SearchBar";

export interface DesktopHeaderProps {
  dataCountryOptions: any[];
  dataHeader: IMenuHeader[];
  handleToggleMenu: (action: string) => void;
  handleCodeChange: (value: string) => void;
  handleOpenDialog: (value: string, type_device: string) => void;
}

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

  const navigationItems = [
    {
      href: "/about-us",
      label: "Về Chúng Tôi",
    },
    {
      href: "/categories",
      label: "Catalogue",
    },
    {
      href: "/blogs",
      label: "Bài Viết",
    },
    {
      href: "/contact-us",
      label: "Liên Hệ",
    },
  ];

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
      <div className="bg-white rounded-b-xl xl:rounded-b-none">
        {/* Main header */}
        <header className="z-10 w-full py-2 lg:py-3 container flex flex-col xl:flex-row items-center justify-between gap-x-8 2xl:gap-x-12">
          <div className="flex flex-row items-center justify-between w-full xl:w-fit">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <MenuLeftIcon className="size-6 xl:hidden text-[#0154C5]" />
            </button>
            <Link href="/" className="hidden xl:block">
              <Image
                src={IMAGES.logoSunfil}
                alt="logo"
                width={600}
                height={111}
                className="object-contain xl:w-[250px]"
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
            <div className="xl:hidden">
              <Cart />
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="xl:hidden w-full">
            <SearchBar isMobile={true} />
          </div>

          <div className="flex-1 hidden xl:flex flex-row justify-between w-full gap-8 2xl:gap-12">
            {/* Desktop Search Bar */}
            <SearchBar />

            {/* Right Navigation */}
            <div className="flex items-center gap-4">
              <CountryOptions />
              <div className="hidden lg:block">
                <Cart />
              </div>
              <Account handleOpenDialog={handleOpenDialog} />
            </div>
          </div>
        </header>

        {/* category */}
        <div className="relative">
          <div className="hidden xl:flex items-center justify-between w-full pb-4 container">
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
                {navigationItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`${
                      pathname === item.href
                        ? "text-[#00A5BD]"
                        : "text-[#1C252E] hover:text-brand-400"
                    } text-base font-medium text-nowrap`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDesktopHeader;
