import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/constants/Images";
import { CustomCheckbox } from "@/components/customCheckbox";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import CloseIcon from "@/components/icons/CloseIcon";

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
}

const SidebarFilterMb = ({ onClose }: SidebarFilterMbProps) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );

  const handleSelectPriceRange = (range: string) => {
    if (selectedPriceRange === range) {
      setSelectedPriceRange(null);
    } else {
      setSelectedPriceRange(range);
    }
  };

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
          <FilterSection title="Danh mục sản phẩm">
            <div className="space-y-3">
              <CustomCheckbox
                id="air-filter"
                label="Lọc gió Động cơ - Air Filter"
                count={24}
                checked={true}
              />
              <CustomCheckbox
                id="fuel-filter"
                label="Lọc Nhiên Liệu - Fuel Filter"
                count={24}
                checked={true}
              />
              <CustomCheckbox
                id="oil-filter"
                label="Bộ lọc dầu"
                count={24}
                checked={true}
              />
              <CustomCheckbox
                id="unclassified"
                label="Chưa phân loại"
                count={24}
              />
              <CustomCheckbox id="others" label="Khác" count={24} />
            </div>
          </FilterSection>

          <FilterSection title="Khoảng giá">
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`w-full text-sm p-2 rounded text-center transition-colors ${
                  selectedPriceRange === "under100k"
                    ? "bg-brand-500 text-white border border-brand-500"
                    : "border border-[#919EAB3D] hover:border-brand-500"
                }`}
                onClick={() => handleSelectPriceRange("under100k")}
              >
                Dưới 100,000 đ
              </button>
              <button
                className={`w-full text-sm p-2 rounded text-center transition-colors ${
                  selectedPriceRange === "100k-300k"
                    ? "bg-brand-500 text-white border border-brand-500"
                    : "border border-[#919EAB3D] hover:border-brand-500"
                }`}
                onClick={() => handleSelectPriceRange("100k-300k")}
              >
                100,000 đ - 300,000 đ
              </button>
              <button
                className={`w-full text-sm p-2 rounded text-center transition-colors ${
                  selectedPriceRange === "300k-500k"
                    ? "bg-brand-500 text-white border border-brand-500"
                    : "border border-[#919EAB3D] hover:border-brand-500"
                }`}
                onClick={() => handleSelectPriceRange("300k-500k")}
              >
                300,000 đ - 500,000 đ
              </button>
              <button
                className={`w-full text-sm p-2 rounded text-center transition-colors ${
                  selectedPriceRange === "over500k"
                    ? "bg-brand-500 text-white border border-brand-500"
                    : "border border-[#919EAB3D] hover:border-brand-500"
                }`}
                onClick={() => handleSelectPriceRange("over500k")}
              >
                Trên 500,000 đ
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Thương hiệu">
            <div className="space-y-3">
              <CustomCheckbox id="asakashi" label="Asakashi" count={24} />
              <CustomCheckbox id="bosch" label="Bosch" count={24} />
              <CustomCheckbox id="huyndai" label="Huyndai" count={24} />
            </div>
          </FilterSection>

          <FilterSection title="Năm sản xuất">
            <div className="space-y-3">
              <CustomCheckbox id="2021" label="2021" count={24} />
              <CustomCheckbox id="2020" label="2020" count={24} />
              <CustomCheckbox id="2019" label="2019" count={24} />
              <CustomCheckbox id="2018" label="2018" count={24} />
            </div>
          </FilterSection>

          <FilterSection title="Xuất xứ">
            <div className="space-y-3">
              <CustomCheckbox id="germany" label="Đức" count={24} />
              <CustomCheckbox id="japan" label="Nhật Bản" count={24} />
              <CustomCheckbox id="china" label="Trung Quốc" count={24} />
            </div>
          </FilterSection>
        </div>
        <div className="flex items-center justify-between gap-3">
          <button className="w-full text-sm font-bold bg-brand-50 text-brand-600 py-2.5 px-3 rounded-lg">
            Thiết lập lại
          </button>
          <button className="w-full text-sm font-bold bg-brand-500 text-white py-2.5 px-3 rounded-lg">
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilterMb;
