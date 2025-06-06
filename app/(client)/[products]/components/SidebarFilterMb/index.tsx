import React, { useState } from "react";
import Image from "next/image";
import { CustomCheckbox } from "@/components/customCheckbox";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import { FilterState, FilterData } from "../../hooks/useProductFilter";
import { Brand, Origin, YearManu } from "@/types/products/IProducts";

interface CategoryPrice {
  id: number;
  name: string;
  min: number;
  max: number;
}

const FilterSection = ({
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
    <div className="px-3 flex flex-col gap-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        <ArrowUpIcon
          className={`transition-transform duration-300 ${
            isOpen ? "" : "transform -rotate-180"
          }`}
        />
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

interface SidebarFilterMbProps {
  onClose: () => void;
  filters: FilterState;
  filterData: FilterData;
  onFilterChange: (type: keyof FilterState, value: string) => void;
  onReset: () => void;
}

const SidebarFilterMb = ({ 
  onClose, 
  filters, 
  filterData, 
  onFilterChange,
  onReset 
}: SidebarFilterMbProps) => {

  return (
    <div className="fixed inset-0 w-full h-full bg-[#025FCA80] z-50 backdrop-blur-[2px] animate-fadeIn">
      <div className="absolute right-0 bottom-0 bg-white rounded-t-2xl flex flex-col gap-6 px-3 py-6 w-full h-auto max-h-[70vh] animate-slideUp">
        <div className="pb-3 flex items-center justify-between border-b border-[#919EAB33]">
          <div className="flex items-center gap-3">
            <FilterIcon className="size-6" />
            <h2 className="text-xl font-bold text-primary-new">Bộ Lọc</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>
        <div className="flex flex-col gap-6 overflow-y-auto flex-1">
          {filterData?.categoryPrice && filterData.categoryPrice.length > 0 && (
            <FilterSection title="Khoảng giá">
              <div className="grid grid-cols-2 gap-2">
                {filterData.categoryPrice.map((price: CategoryPrice) => (
                  <button
                    key={price.id}
                    className={`w-full text-sm p-2 rounded text-center transition-colors ${
                      filters.price === price.id
                        ? "bg-brand-500 text-white border border-brand-500"
                        : "border border-[#919EAB3D] hover:border-brand-500"
                    }`}
                    onClick={() => onFilterChange("price", price.id.toString())}
                  >
                    {price.name}
                  </button>
                ))}
              </div>
            </FilterSection>
          )}

          {filterData?.brand && filterData.brand.length > 0 && (
            <FilterSection title="Thương hiệu">
              <div className="space-y-3">
                {filterData.brand.map((brand: Brand) => (
                  <CustomCheckbox
                    key={brand.id}
                    id={brand.code}
                    label={brand.name}
                    count={brand.count}
                    checked={filters.brand_id.includes(brand.id)}
                    onChange={() => onFilterChange("brand_id", brand.id)}
                  />
                ))}
              </div>
            </FilterSection>
          )}

          {filterData?.yearManu && filterData.yearManu.length > 0 && (
            <FilterSection title="Năm sản xuất">
              <div className="space-y-3">
                {filterData.yearManu.map((year: YearManu) => (
                  <CustomCheckbox
                    key={year.name}
                    id={year.name.toString()}
                    label={year.name.toString()}
                    count={year.count}
                    checked={filters.year_manu.includes(year.name.toString())}
                    onChange={() => onFilterChange("year_manu", year.name.toString())}
                  />
                ))}
              </div>
            </FilterSection>
          )}

          {filterData?.origin && filterData.origin.length > 0 && (
            <FilterSection title="Xuất xứ">
              <div className="space-y-3">
                {filterData.origin.map((origin: Origin) => (
                  <CustomCheckbox
                    key={origin.id}
                    id={origin.code}
                    label={origin.name}
                    count={origin.count}
                    checked={filters.origin_id.includes(origin.id)}
                    onChange={() => onFilterChange("origin_id", origin.id)}
                  />
                ))}
              </div>
            </FilterSection>
          )}
        </div>
        <div className="flex items-center justify-between gap-3">
          <button 
            className="w-full text-sm font-bold bg-brand-50 text-brand-600 py-2.5 px-3 rounded-lg"
            onClick={onReset}
          >
            Thiết lập lại
          </button>
          <button 
            className="w-full text-sm font-bold bg-brand-500 text-white py-2.5 px-3 rounded-lg"
            onClick={onClose}
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilterMb;
