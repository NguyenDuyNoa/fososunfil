import { CustomCheckbox } from "@/components/customCheckbox";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import { Brand, Origin } from "@/types/products/IProducts";
import React, { useState } from "react";
import { CategoryPrice, FilterData, FilterState } from "../../hooks/useProductFilter";
import { additionalFilterData, mockFilterData } from "../SidebarFilter/filterData";
import { AnimatePresence, motion } from "framer-motion";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection = ({
  title,
  children,
}: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="px-3 flex flex-col gap-4">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold">{title}</h3>
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

interface FilterNestedSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterNestedSection = ({
  title,
  children,
}: FilterNestedSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nested-filter-group">
      <div
        className={`flex items-center justify-between cursor-pointer px-2 py-2 rounded-md hover:bg-gray-50 transition-colors ${isOpen ? 'bg-gray-50' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <h4 className="font-medium text-gray-800">{title}</h4>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpIcon className="w-4 h-4" />
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
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 w-full h-full bg-[#025FCA80] z-50 backdrop-blur-[2px]"
      >
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="absolute right-0 bottom-0 bg-white rounded-t-2xl flex flex-col gap-6 px-3 py-6 w-full h-auto max-h-[70vh]"
        >
          <div className="pb-3 flex items-center justify-between border-b border-[#919EAB33]">
            <div className="flex items-center gap-3">
              <FilterIcon className="size-6" />
              <h2 className="text-xl font-bold text-primary-new">Bộ Lọc</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <CloseIcon className="size-6" />
            </motion.button>
          </div>
          <div className="flex flex-col gap-6 overflow-y-auto flex-1">
            {mockFilterData && mockFilterData?.categoryPrice && mockFilterData?.categoryPrice.length > 0 && (
              <FilterSection title="Sản phẩm dành cho bạn">
                <div className="grid grid-cols-2 gap-2">
                  {mockFilterData.categoryPrice.map((price: CategoryPrice) => (
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

            {filterData?.origin && filterData.origin.length > 0 && (
              <FilterSection title="Nhóm sản phẩm">
                <div className="space-y-3">
                  {filterData.origin.map((origin: Origin) => (
                    <CustomCheckbox
                      key={origin.id}
                      id={origin.id}
                      label={origin.name.toString()}
                      count={origin.count}
                      checked={filters.origin_id.includes(origin.id)}
                      onChange={() => onFilterChange("origin_id", origin.id)}
                    />
                  ))}
                </div>
              </FilterSection>
            )}

            {additionalFilterData && (
              <FilterSection title="Dòng xe">
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
                            checked={key === 'bodyTypes' ? filters.origin_id.includes(item.id) : false}
                            onChange={() => key === 'bodyTypes' ? onFilterChange("origin_id", item.id) : {}}
                          />
                        ))}
                      </div>
                    </FilterNestedSection>
                  ))}
                </div>
              </FilterSection>
            )}
          </div>
          <div className="flex items-center justify-between gap-3">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-sm font-bold bg-brand-50 text-brand-600 py-2.5 px-3 rounded-lg"
              onClick={onReset}
            >
              Thiết lập lại
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-sm font-bold bg-brand-500 text-white py-2.5 px-3 rounded-lg"
              onClick={onClose}
            >
              Áp dụng
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SidebarFilterMb;
