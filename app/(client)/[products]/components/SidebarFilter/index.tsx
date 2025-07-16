import { CustomCheckbox } from "@/components/customCheckbox";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import { IMAGES } from "@/constants/Images";
import { Brand, Category } from "@/types/products/IProducts";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  CategoryFilter,
  FilterData,
  FilterState,
} from "../../hooks/useProductFilter";
import { mockFilterData } from "./filterData";

export const FilterSection = ({
  title,
  children,
  className,
  isOpen: initialIsOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  return (
    <div className={`p-3 flex flex-col gap-4 filter-group ${className}`}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold text-primary-new filter-group-hover:text-brand-700 transition-colors">
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpIcon className="w-5 h-5" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Component cho phần bộ lọc con có thể mở/đóng
export const FilterNestedSection = ({
  title,
  children,
  isOpen: initialIsOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  return (
    <div className="nested-filter-group">
      <div
        className={`flex items-center justify-between cursor-pointer px-2 py-2 rounded-md hover:bg-gray-50 transition-colors ${
          isOpen ? "bg-gray-50" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <h4 className="font-medium text-gray-800 nested-filter-group-hover:text-brand-600 transition-colors">
            {title}
          </h4>
        </div>
        <motion.div
          className={`flex items-center justify-center w-5 h-5 rounded-full transition-colors ${
            isOpen
              ? "bg-brand-500 text-white"
              : "bg-gray-100 text-gray-500 nested-filter-group-hover:bg-brand-100"
          }`}
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpIcon className="h-3 w-3" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
            className="pl-6 mt-2 xl:ml-4 flex flex-col gap-2.5 relative before:absolute before:left-6 before:top-0 before:h-[calc(100%-20px)] before:border-l-2 before:border-gray-100"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SidebarFilterProps {
  filters: FilterState;
  filterData: FilterData;
  onFilterChange: (type: keyof FilterState, value: string) => void;
  onScrollToTop?: () => void;
}

const SidebarFilter = ({
  filters,
  filterData,
  onFilterChange,
  onScrollToTop,
}: SidebarFilterProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname.replace("/", "");

  useEffect(() => {
    // Kiểm tra nếu có flag trong localStorage
    const shouldScroll = localStorage.getItem("scrollToProducts");
    if (shouldScroll) {
      // Xóa flag
      localStorage.removeItem("scrollToProducts");

      // Đợi một chút để DOM được render đầy đủ
      const timer = setTimeout(() => {
        const productSection = document.querySelector(
          '[data-section="products"]'
        );
        if (productSection) {
          const yOffset =
            productSection.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({
            top: yOffset,
            behavior: "smooth",
          });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    onFilterChange(type, value);
    if (onScrollToTop) {
      onScrollToTop();
    }
  };

  const handleCategoryClick = (
    categoryName: string,
    categorySlug: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    // Đặt flag trong localStorage để biết cần cuộn sau khi chuyển trang
    localStorage.setItem("scrollToProducts", "true");

    // Chuyển trang
    router.push(`/${categorySlug}`);
  };

  // Map between filter ID and its corresponding filter type
  const getProductFilterType = (id: number): keyof FilterState | null => {
    switch (id) {
      case 1:
        return "product_sold";
      case 2:
        return "product_for_you";
      case 3:
        return "product_new";
      case 4:
        return "product_not_bought";
      default:
        return null;
    }
  };

  // Helper to check if a product filter is active
  const isProductFilterActive = (id: number): boolean => {
    const filterType = getProductFilterType(id);
    if (!filterType) return false;
    return filters[filterType] === 1;
  };

  return (
    <div
      ref={filterRef}
      className="hidden sticky top-[100px] bg-white rounded-lg xl:flex flex-col gap-2 2xl:gap-4 min-w-[315px] max-w-[315px] h-fit"
    >
      <div className="p-3 pt-4 flex items-center gap-3 sticky top-0 bg-white z-50 border-b border-[#919EAB33] rounded-t-lg">
        <Image src={IMAGES.filter} alt="filter" width={24} height={24} />
        <h2 className="text-2xl font-bold text-brand-500">Bộ Lọc</h2>
      </div>

      {mockFilterData &&
        mockFilterData?.productFilters &&
        mockFilterData?.productFilters.length > 0 && (
          <>
            <FilterSection title="Bộ lọc sản phẩm" isOpen={true}>
              <div className="space-y-2">
                {mockFilterData.productFilters &&
                  mockFilterData.productFilters.map(
                    (filter: CategoryFilter) => {
                      const filterType = getProductFilterType(filter.id);
                      if (!filterType) return null;
                      return (
                        <button
                          key={filter.id}
                          className={`w-full p-2 rounded text-center transition-colors ${
                            isProductFilterActive(filter.id)
                              ? "bg-brand-500 text-white border border-brand-500"
                              : "border border-[#919EAB3D] hover:border-brand-500"
                          }`}
                          onClick={() => handleFilterChange(filterType, "1")}
                        >
                          {filter.name}
                        </button>
                      );
                    }
                  )}
              </div>
            </FilterSection>
            <hr className="border-[#919EAB33]" />
          </>
        )}

      {filterData?.brand && filterData.brand.length > 0 && (
        <>
          <FilterSection title="Thương hiệu" isOpen={false}>
            <div className="space-y-3">
              {filterData.brand.map((brand: Brand) => (
                <CustomCheckbox
                  key={brand.id}
                  id={brand.code}
                  label={brand.name}
                  count={brand.count}
                  checked={filters.brand_id.includes(brand.id)}
                  onChange={() => handleFilterChange("brand_id", brand.id)}
                />
              ))}
            </div>
          </FilterSection>
          <hr className="border-[#919EAB33]" />
        </>
      )}

      {filterData?.category && filterData.category.length > 0 && (
        <>
          <FilterSection title="Nhóm sản phẩm" isOpen={false}>
            <div className="flex flex-col gap-3">
              {filterData.category.map((category: Category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  onClick={(e) =>
                    handleCategoryClick(category.name, category.slug, e)
                  }
                  className="cursor-pointer"
                >
                  <CustomCheckbox
                    id={category.id}
                    label={category.name.toString()}
                    count={category.count}
                    checked={
                      category.slug === currentSlug ||
                      filters.category_id.includes(category.id)
                    }
                    onChange={() =>
                      handleFilterChange("category_id", category.id)
                    }
                  />
                </Link>
              ))}
            </div>
          </FilterSection>
          <hr className="border-[#919EAB33]" />
        </>
      )}

      {filterData && (
        <FilterSection title="Dòng xe" isOpen={false} className="pb-5 2xl:pb-6">
          <div className="space-y-1">
            {/* Hãng xe */}
            {filterData.company && filterData.company.length > 0 && (
              <FilterNestedSection title="Hãng">
                <div className="space-y-2.5">
                  {filterData.company.map((item) => (
                    <div key={item.id} className="relative pl-4 before:absolute before:left-0 before:top-1/3 before:-translate-y-1/2 before:w-4 before:h-4 before:border-l-2 before:border-b-2 before:border-gray-100 before:rounded-bl-xl">
                      <CustomCheckbox
                        id={`company-${item.id}`}
                        label={item.name}
                        count={item.count}
                        checked={filters.company_id.includes(item.id)}
                        onChange={() => handleFilterChange("company_id", item.id)}
                      />
                    </div>
                  ))}
                </div>
              </FilterNestedSection>
            )}

            {/* Model xe */}
            {filterData.model && filterData.model.length > 0 && (
              <FilterNestedSection title="Model">
                <div className="space-y-2.5">
                  {filterData.model.map((item) => (
                    <div key={item.id} className="relative pl-4 before:absolute before:left-0 before:top-1/3 before:-translate-y-1/2 before:w-4 before:h-4 before:border-l-2 before:border-b-2 before:border-gray-100 before:rounded-bl-xl">
                      <CustomCheckbox
                        key={item.id}
                        id={`model-${item.id}`}
                        label={item.name}
                        count={item.count}
                        checked={filters.model_id.includes(item.id)}
                        onChange={() => handleFilterChange("model_id", item.id)}
                      />
                    </div>
                  ))}
                </div>
              </FilterNestedSection>
            )}

            {/* Năm sản xuất */}
            {filterData.yearManu && filterData.yearManu.length > 0 && (
              <FilterNestedSection title="Năm sản xuất">
                <div className="space-y-2.5">
                  {filterData.yearManu.map((item, index) => (
                    <div key={index} className="relative pl-4 before:absolute before:left-0 before:top-1/3 before:-translate-y-1/2 before:w-4 before:h-4 before:border-l-2 before:border-b-2 before:border-gray-100 before:rounded-bl-xl">
                      <CustomCheckbox
                        key={index}
                        id={`year-${index}`}
                        label={item.name.toString()}
                        count={item.count}
                        checked={filters.year_manu.includes(item.name.toString())}
                        onChange={() =>
                          handleFilterChange("year_manu", item.name.toString())
                        }
                      />
                    </div>
                  ))}
                </div>
              </FilterNestedSection>
            )}

            {/* Động cơ */}
            {filterData.engine && filterData.engine.length > 0 && (
              <FilterNestedSection title="Động cơ">
                <div className="space-y-2.5">
                  {filterData.engine.map((item) => (
                    <div key={item.id} className="relative pl-4 before:absolute before:left-0 before:top-1/3 before:-translate-y-1/2 before:w-4 before:h-4 before:border-l-2 before:border-b-2 before:border-gray-100 before:rounded-bl-xl">
                      <CustomCheckbox
                        key={item.id}
                        id={`engine-${item.id}`}
                        label={item.name}
                        count={item.count}
                        checked={filters.engine_id.includes(item.id)}
                        onChange={() => handleFilterChange("engine_id", item.id)}
                      />
                    </div>
                  ))}
                </div>
              </FilterNestedSection>
            )}

            {/* Body type */}
            {filterData.body && filterData.body.length > 0 && (
              <FilterNestedSection title="Dòng xe">
                <div className="space-y-2.5">
                  {filterData.body.map((item) => (
                    <div key={item.id} className="relative pl-4 before:absolute before:left-0 before:top-1/3 before:-translate-y-1/2 before:w-4 before:h-4 before:border-l-2 before:border-b-2 before:border-gray-100 before:rounded-bl-xl">
                      <CustomCheckbox
                        key={item.id}
                        id={`body-${item.id}`}
                        label={item.name}
                        count={item.count}
                        checked={filters.body_id.includes(item.id)}
                        onChange={() => handleFilterChange("body_id", item.id)}
                      />
                    </div>
                  ))}
                </div>
              </FilterNestedSection>
            )}
          </div>
        </FilterSection>
      )}
    </div>
  );
};

export default SidebarFilter;
