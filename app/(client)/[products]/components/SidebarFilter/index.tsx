import { CustomCheckbox } from "@/components/customCheckbox";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import { IMAGES } from "@/constants/Images";
import { Brand, Category } from "@/types/products/IProducts";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  CategoryFilter,
  FilterData,
  FilterState
} from "../../hooks/useProductFilter";
import { additionalFilterData, mockFilterData } from "./filterData";

export const FilterSection = ({
  title,
  children,
  isOpen: initialIsOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  return (
    <div className="p-3 flex flex-col gap-4 filter-group">
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
            className="pl-3 mt-2 ml-4 border-l-2 border-gray-100"
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

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    onFilterChange(type, value);
    if (onScrollToTop) {
      onScrollToTop();
    }
  };

  // Map dữ liệu năm từ API vào additionalFilterData
  if (filterData?.yearManu && additionalFilterData.years) {
    additionalFilterData.years.data = filterData.yearManu.map((year, index) => ({
      id: index.toString(),
      name: year.name.toString(),
      count: year.count
    }));
  }

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
      className="hidden sticky top-[100px] bg-white rounded-lg xl:flex flex-col gap-2 2xl:gap-4 min-w-[315px] max-w-[315px] h-fit overflow-y-auto max-h-[calc(100vh-120px)]"
    >
      <div className="p-3 pt-4 flex items-center gap-3 sticky top-0 bg-white z-50 border-b border-[#919EAB33]">
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
                          onClick={() => 
                            handleFilterChange(filterType, "1")
                          }
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
            <div className="space-y-3">
              {filterData.category.map((category: Category) => (
                <CustomCheckbox
                  key={category.id}
                  id={category.id}
                  label={category.name.toString()}
                  count={category.count}
                  checked={filters.category_id.includes(category.id)}
                  onChange={() => handleFilterChange("category_id", category.id)}
                />
              ))}
            </div>
          </FilterSection>
          <hr className="border-[#919EAB33]" />
        </>
      )}

      {additionalFilterData && (
        <FilterSection title="Dòng xe" isOpen={false}>
          <div className="space-y-1">
            {Object.entries(additionalFilterData).map(([key, filterGroup]) => (
              <FilterNestedSection key={key} title={filterGroup.label}>
                <div className="space-y-2.5">
                  {filterGroup.data.map((item) => (
                    <CustomCheckbox
                      key={item.id}
                      id={`${key}-${item.id}`}
                      label={item.name}
                      count={item.count}
                      checked={
                        key === "bodyTypes"
                          ? filters.origin_id.includes(item.id)
                          : false
                      }
                      onChange={() =>
                        key === "bodyTypes"
                          ? handleFilterChange("origin_id", item.id)
                          : {}
                      }
                    />
                  ))}
                </div>
              </FilterNestedSection>
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  );
};

export default SidebarFilter;
