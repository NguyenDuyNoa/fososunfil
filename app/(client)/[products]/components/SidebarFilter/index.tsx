import { CustomCheckbox } from "@/components/customCheckbox";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import { IMAGES } from "@/constants/Images";
import { Brand, Origin, YearManu } from "@/types/products/IProducts";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  FilterState,
  FilterData,
  CategoryPrice,
} from "../../hooks/useProductFilter";

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
    <div className="p-3 flex flex-col gap-4">
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

interface SidebarFilterProps {
  filters: FilterState;
  filterData: FilterData;
  onFilterChange: (type: keyof FilterState, value: string) => void;
}

const SidebarFilter = ({
  filters,
  filterData,
  onFilterChange,
}: SidebarFilterProps) => {
  console.log(filterData)
  return (
    <div className="hidden sticky top-[100px] bg-white rounded-lg xl:flex flex-col gap-4 py-3 min-w-[315px] max-w-[315px] h-fit">
      <div className="p-3 flex items-center gap-3">
        <Image src={IMAGES.filter} alt="filter" width={24} height={24} />
        <h2 className="text-2xl font-bold text-brand-500">Bộ Lọc</h2>
      </div>

      <hr className="border-[#919EAB33]" />

      {filterData?.categoryPrice && filterData.categoryPrice.length > 0 && (
        <>
          <FilterSection title="Khoảng giá">
            <div className="space-y-2">
              {filterData.categoryPrice &&
                filterData.categoryPrice.map((price: CategoryPrice) => (
                  <button
                    key={price.id}
                    className={`w-full p-2 rounded text-center transition-colors ${
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
          <hr className="border-[#919EAB33]" />
        </>
      )}

      {filterData?.brand && filterData.brand.length > 0 && (
        <>
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
          <hr className="border-[#919EAB33]" />
        </>
      )}

      {filterData?.yearManu && filterData.yearManu.length > 0 && (
        <>
          <FilterSection title="Năm sản xuất">
            <div className="space-y-3">
              {filterData.yearManu.map((year: YearManu) => (
                <CustomCheckbox
                  key={year.name.toString()}
                  id={year.name.toString()}
                  label={year.name.toString()}
                  count={year.count}
                  checked={filters.year_manu.includes(year.name.toString())}
                  onChange={() =>
                    onFilterChange("year_manu", year.name.toString())
                  }
                />
              ))}
            </div>
          </FilterSection>
          <hr className="border-[#919EAB33]" />
        </>
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
  );
};

export default SidebarFilter;
