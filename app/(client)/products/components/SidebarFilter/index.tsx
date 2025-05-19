import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/constants/Images";
import { CustomCheckbox } from "@/components/customCheckbox";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";

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

const SidebarFilter = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);

  const handleSelectPriceRange = (range: string) => {
    if (selectedPriceRange === range) {
      setSelectedPriceRange(null);
    } else {
      setSelectedPriceRange(range);
    }
  };

  return (
    <div className="sticky top-24 bg-white rounded-lg flex flex-col gap-4 py-3 w-[374px] h-fit">
      <div className="p-3 flex items-center gap-3">
        <Image src={IMAGES.filter} alt="filter" width={24} height={24} />
        <h2 className="text-2xl font-bold text-brand-500">Bộ Lọc</h2>
      </div>

      <hr className="border-[#919EAB33]" />

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
          <CustomCheckbox id="unclassified" label="Chưa phân loại" count={24} />
          <CustomCheckbox id="others" label="Khác" count={24} />
        </div>
      </FilterSection>
      <hr className="border-[#919EAB33]" />

      <FilterSection title="Khoảng giá">
        <div className="space-y-2">
          <button 
            className={`w-full p-2 rounded text-center transition-colors ${
              selectedPriceRange === 'under100k' 
                ? 'bg-brand-500 text-white border border-brand-500' 
                : 'border border-[#919EAB3D] hover:border-brand-500'
            }`}
            onClick={() => handleSelectPriceRange('under100k')}
          >
            Dưới 100,000 đ
          </button>
          <button 
            className={`w-full p-2 rounded text-center transition-colors ${
              selectedPriceRange === '100k-300k' 
                ? 'bg-brand-500 text-white border border-brand-500' 
                : 'border border-[#919EAB3D] hover:border-brand-500'
            }`}
            onClick={() => handleSelectPriceRange('100k-300k')}
          >
            100,000 đ - 300,000 đ
          </button>
          <button 
            className={`w-full p-2 rounded text-center transition-colors ${
              selectedPriceRange === '300k-500k' 
                ? 'bg-brand-500 text-white border border-brand-500' 
                : 'border border-[#919EAB3D] hover:border-brand-500'
            }`}
            onClick={() => handleSelectPriceRange('300k-500k')}
          >
            300,000 đ - 500,000 đ
          </button>
          <button 
            className={`w-full p-2 rounded text-center transition-colors ${
              selectedPriceRange === 'over500k' 
                ? 'bg-brand-500 text-white border border-brand-500' 
                : 'border border-[#919EAB3D] hover:border-brand-500'
            }`}
            onClick={() => handleSelectPriceRange('over500k')}
          >
            Trên 500,000 đ
          </button>
        </div>
      </FilterSection>
      <hr className="border-[#919EAB33]" />

      <FilterSection title="Thương hiệu">
        <div className="space-y-3">
          <CustomCheckbox id="asakashi" label="Asakashi" count={24} />
          <CustomCheckbox id="bosch" label="Bosch" count={24} />
          <CustomCheckbox id="huyndai" label="Huyndai" count={24} />
        </div>
      </FilterSection>
      <hr className="border-[#919EAB33]" />

      <FilterSection title="Năm sản xuất">
        <div className="space-y-3">
          <CustomCheckbox id="2021" label="2021" count={24} />
          <CustomCheckbox id="2020" label="2020" count={24} />
          <CustomCheckbox id="2019" label="2019" count={24} />
          <CustomCheckbox id="2018" label="2018" count={24} />
        </div>
      </FilterSection>
      <hr className="border-[#919EAB33]" />

      <FilterSection title="Xuất xứ">
        <div className="space-y-3">
          <CustomCheckbox id="germany" label="Đức" count={24} />
          <CustomCheckbox id="japan" label="Nhật Bản" count={24} />
          <CustomCheckbox id="china" label="Trung Quốc" count={24} />
        </div>
      </FilterSection>
    </div>
  );
};

export default SidebarFilter;
