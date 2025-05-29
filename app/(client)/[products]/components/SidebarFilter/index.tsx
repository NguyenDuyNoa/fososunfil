import { CustomCheckbox } from "@/components/customCheckbox";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import { IMAGES } from "@/constants/Images";
import { useGetCategoryFilter } from "@/managers/api-management/products/useGetCategoryFilter";
import {
  Brand,
  Origin,
  YearManu,
} from "@/types/products/IProducts";
import Image from "next/image";
import React, { useState } from "react";

interface CategoryPrice {
  id: number;
  name: string;
  min: number;
  max: number;
}

interface FilterState {
  brand_id: string[];
  origin_id: string[];
  year_manu: string[];
  price: number;
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
  slug: string;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const SidebarFilter = ({ slug, filters, onFilterChange }: SidebarFilterProps) => {
  const { data } = useGetCategoryFilter(slug);

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    if (type === "price") {
      const newValue = filters.price === Number(value) ? 0 : Number(value);
      onFilterChange({
        ...filters,
        [type]: newValue
      });
    } else {
      const currentValues = filters[type] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      onFilterChange({
        ...filters,
        [type]: newValues,
      });
    }
  };

  return (
    <div className="hidden sticky top-[100px] bg-white rounded-lg xl:flex flex-col gap-4 py-3 min-w-[315px] max-w-[315px] h-fit">
      <div className="p-3 flex items-center gap-3">
        <Image src={IMAGES.filter} alt="filter" width={24} height={24} />
        <h2 className="text-2xl font-bold text-brand-500">Bộ Lọc</h2>
      </div>

      <hr className="border-[#919EAB33]" />

      {/* <FilterSection title="Danh mục sản phẩm">
        <div className="space-y-3">
          {data?.data?.category?.map((category: Category) => (
            <CustomCheckbox
              key={category.id}
              id={category.code}
              label={category.name}
              count={category.count}
            />
          ))}
        </div>
      </FilterSection> */}
      {/* <hr className="border-[#919EAB33]" /> */}

      <FilterSection title="Khoảng giá">
        <div className="space-y-2">
          {data?.data?.categoryPrice?.map((price: CategoryPrice) => (
            <button
              key={price.id}
              className={`w-full p-2 rounded text-center transition-colors ${
                filters.price === price.id
                  ? "bg-brand-500 text-white border border-brand-500"
                  : "border border-[#919EAB3D] hover:border-brand-500"
              }`}
              onClick={() => handleFilterChange("price", price.id.toString())}
            >
              {price.name}
            </button>
          ))}
        </div>
      </FilterSection>
      <hr className="border-[#919EAB33]" />

      <FilterSection title="Thương hiệu">
        <div className="space-y-3">
          {data?.data?.brand?.map((brand: Brand) => (
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

      <FilterSection title="Năm sản xuất">
        <div className="space-y-3">
          {data?.data?.yearManu?.map((year: YearManu) => (
            <CustomCheckbox
              key={year.name}
              id={year.name.toString()}
              label={year.name.toString()}
              count={year.count}
              checked={filters.year_manu.includes(year.name.toString())}
              onChange={() =>
                handleFilterChange("year_manu", year.name.toString())
              }
            />
          ))}
        </div>
      </FilterSection>
      <hr className="border-[#919EAB33]" />

      <FilterSection title="Xuất xứ">
        <div className="space-y-3">
          {data?.data?.origin?.map((origin: Origin) => (
            <CustomCheckbox
              key={origin.id}
              id={origin.code}
              label={origin.name}
              count={origin.count}
              checked={filters.origin_id.includes(origin.id)}
              onChange={() => handleFilterChange("origin_id", origin.id)}
            />
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

export default SidebarFilter;
