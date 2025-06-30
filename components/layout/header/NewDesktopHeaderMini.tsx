import MegaMenuDropdown from "@/components/dropdown/DropdownMenu";
import MenuLeftIcon from "@/components/icons/MenuLeftIcon";
import { DesktopHeaderProps } from "@/components/layout/header/NewDesktopHeader";
import MobileMenuOverlay from "@/components/Menu/MobileMenuOverlay";
import { IMAGES } from "@/constants/Images";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Account from "./Account";
import Cart from "./Cart";
import CountryOptions from "./CountryOptions";
import SearchBar from "./SearchBar";

const NewDesktopHeaderMini = ({
  dataHeader,
  dataCountryOptions,
  handleToggleMenu,
  handleCodeChange,
  handleOpenDialog,
}: DesktopHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow-[0px_20px_40px_-4px_rgba(145,158,171,0.16)] py-2.5">
      {/* Main header */}
      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <header className="w-full py-2 xl:py-1 container">
        <div className="flex items-center justify-between gap-x-6 w-full">
          <div className="flex flex-row items-center justify-between w-full xl:w-fit">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <MenuLeftIcon className="size-6 xl:hidden text-[#0154C5]" />
            </button>
            <Link href="/" className="hidden lg:block">
              <Image
                src={IMAGES.logoSunfil}
                alt="logo"
                width={600}
                height={111}
                className="object-contain lg:w-[180px]"
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
                className="object-cover w-[106px] flex-shrink-0"
                quality={100}
                loading="eager"
              />
            </Link>

            {/* <div className="lg:hidden flex items-center gap-2 cursor-pointer relative bg-[#0154C5] p-2 rounded-full">
              <IconShopping fill="white" className="size-5" />
              <div className="absolute top-0 right-0 bg-error-main rounded-full size-4 flex items-center justify-center">
                <span className="text-white text-[10px]/[16px] font-medium mt-0.5">
                  12
                </span>
              </div>
            </div> */}
            <div className="xl:hidden">
              <Cart />
            </div>
          </div>
          <div className="hidden flex-1 xl:flex flex-row justify-between items-center w-full gap-x-4 xxl:gap-x-12">
            <MegaMenuDropdown
              triggerLabel="Danh Mục Sản Phẩm"
              // items={categoryData as any}
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
              classNameButton="whitespace-nowrap"
              isMiniHeader={true}
              // allowHover={pathname === "/" ? false : true}
            />
            
            <SearchBar />

            {/* Right Navigation */}
            <div className="flex items-center gap-2">
              <CountryOptions />
              <Cart />
              <Account handleOpenDialog={handleOpenDialog} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NewDesktopHeaderMini;
