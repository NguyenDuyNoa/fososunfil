import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import IconCameraHeader from "@/components/icon/IconCameraHeader";
import IconSearchHeader from "@/components/icon/IconSearchHeader";
import SearchHistoryDropdown from "@/components/search/SearchHistoryDropdown";
import MobileSearchPage from "@/components/search/MobileSearchPage";
import { useGetSearchHistory } from "@/managers/api-management/search/useGetSearchHistory";
import { useDebounce } from "use-debounce";
import { useGetListCategory } from "@/managers/api-management/products/useGetProductCategory";

interface SearchBarProps {
  isMobile?: boolean;
  className?: string;
  isBorder?: boolean;
}

interface Category {
  name: string;
  slug: string;
}

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  child?: ChildCategory[];
}

interface ChildCategory {
  id: string;
  name: string;
  slug: string;
}

const SearchBar = ({
  isMobile = false,
  className = "",
  isBorder = true,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: listProducts, isLoading: isLoadingListProducts } =
    useGetListCategory({});

  // Xử lý dữ liệu danh mục
  const categories = useMemo(() => {
    if (!listProducts) return [];

    const result: Category[] = [];

    // Map qua các danh mục chính
    listProducts.forEach((category: CategoryData) => {
      // Thêm danh mục chính
      result.push({
        name: category.name,
        slug: category.slug,
      });

      // Nếu có danh mục con, thêm vào cùng cấp
      if (category.child && category.child.length > 0) {
        category.child.forEach((childCategory: ChildCategory) => {
          result.push({
            name: childCategory.name,
            slug: childCategory.slug,
          });
        });
      }
    });

    return result;
  }, [listProducts]);

  // Sử dụng debounce để tránh gọi API quá nhiều lần
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  // Gọi API lấy dữ liệu tìm kiếm khi có debouncedSearchQuery
  const { data: searchResults = [], isLoading } =
    useGetSearchHistory(debouncedSearchQuery);

  // Kiểm tra có hiển thị dropdown hay không
  const shouldShowDropdown = isDropdownOpen;

  //   && (
  //     (debouncedSearchQuery && (searchResults.length > 0 || isLoading)) ||
  //     (!debouncedSearchQuery && searchResults.length > 0)
  //   );
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSearchFocus = () => {
    if (isMobile) {
      setIsMobileSearchOpen(true);
    } else {
      setIsDropdownOpen(true);
    }
  };

  const handleSelectSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  if (isMobile) {
    return (
      <div className="py-2 w-full relative" ref={searchRef}>
        <div
          className={`bg-white flex flex-row items-center w-full ${
            isBorder ? "border-[1.5px] border-brand-500" : ""
          } rounded-full p-1 pl-5`}
          onClick={handleSearchFocus}
        >
          <div className="flex-1 bg-transparent pt-0.5 text-disable-50 border-none outline-none placeholder:text-disable-50 text-sm/[24px] font-normal">
            Tìm sản phẩm
          </div>
          <button type="button" className="mr-2">
            <IconCameraHeader fill="#041F2F" className="size-6" />
          </button>
          <button type="button" className="bg-brand-500 rounded-full py-2 px-3">
            <IconSearchHeader fill="white" className="size-4" />
          </button>
        </div>

        <MobileSearchPage
          isOpen={isMobileSearchOpen}
          filterCategories={categories}
          onClose={() => setIsMobileSearchOpen(false)}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-row items-center w-full relative ${className}`}
      ref={searchRef}
    >
      <form className="flex flex-row items-center w-full border-[2px] border-brand-500 rounded-full xxl:px-4 xxl:py-2 xl:py-[6px] xl:px-2 py-1 px-2">
        <input
          type="text"
          placeholder="Tìm sản phẩm"
          className="flex-1 xxl:py-2 xxl:px-4 lg:py-1 lg:px-2 text-primary-new border-none outline-none placeholder:text-disable-50 text-base font-normal"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="flex items-center justify-center mr-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12"
                stroke="#637381"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 4L12 12"
                stroke="#637381"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <button type="button" className="mr-2">
          <IconCameraHeader fill="#041F2F" />
        </button>
        <button
          type="submit"
          className="bg-blue-600 rounded-full xxl:py-2 xxl:px-5 py-[6px] px-4"
        >
          <IconSearchHeader fill="white" />
        </button>
      </form>

      <SearchHistoryDropdown
        filterCategories={categories}
        searchResults={searchResults}
        onSelect={handleSelectSearch}
        isOpen={shouldShowDropdown}
        onClose={() => setIsDropdownOpen(false)}
        isLoading={isLoading && !!debouncedSearchQuery}
        searchQuery={debouncedSearchQuery}
      />
    </div>
  );
};

export default SearchBar;
