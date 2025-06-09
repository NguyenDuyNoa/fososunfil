import MegaMenuDropdown from "@/components/dropdown/DropdownMenu";
import IconCameraHeader from "@/components/icon/IconCameraHeader";
import IconSearchHeader from "@/components/icon/IconSearchHeader";
import IconShopping from "@/components/icon/IconShopping";
import MenuLeftIcon from "@/components/icons/MenuLeftIcon";
import { DesktopHeaderProps } from "@/components/layout/header/NewDesktopHeader";
import MobileMenuOverlay from "@/components/Menu/MobileMenuOverlay";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/selectCustom";
import { IMAGES } from "@/constants/Images";
import { useStateHeader } from "@/states/Header/useStateHeader";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Account from "./Account";
import Cart from "./Cart";
import SearchBar from "./SearchBar";

const NewDesktopHeaderMini = ({
  dataHeader,
  dataCountryOptions,
  handleToggleMenu,
  handleCodeChange,
  handleOpenDialog,
}: DesktopHeaderProps) => {
  const { isStateHeader } = useStateHeader();
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const selectedOption = dataCountryOptions.find(
    (option) => option.code === isStateHeader.selectedCodeCountry
  );
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

            {/* Search Bar */}
            {/* <div className="flex flex-row items-center w-full  border-[2px] border-brand-500 rounded-full xxl:px-4 xxl:py-2 xl:py-[6px] xl:px-2 py-1 px-2">
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
            </div> */}
            <SearchBar />


            {/* Right Navigation */}
            <div className="flex items-center gap-4">
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

              {/* <div className="flex items-center gap-2 cursor-pointer relative hover:bg-brand-50 rounded-full py-1 px-2">
                <IconShopping fill="#0154C5" className="size-9" />
                <span className="text-sm font-medium whitespace-nowrap text-primary-new">
                  Giỏ hàng
                </span>
                <div className="absolute -top-3 left-[22px] bg-error-main rounded-full size-6 flex items-center justify-center">
                  <span className="text-white text-xs font-medium mt-0.5">
                    12
                  </span>
                </div>
              </div> */}
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
