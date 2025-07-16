import { CustomCheckbox } from "@/components/customCheckbox";
import CloseIcon from "@/components/icons/CloseIcon";
import { Brand, Category } from "@/types/products/IProducts";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  CategoryFilter,
  FilterData,
  FilterState,
} from "../../hooks/useProductFilter";
import { FilterNestedSection, FilterSection } from "../SidebarFilter";
import {
  additionalFilterData,
  mockFilterData,
} from "../SidebarFilter/filterData";

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
  onReset,
}: SidebarFilterMbProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname.replace("/", "");

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

  const handleCategoryClick = (
    categoryName: string,
    categorySlug: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    // Đóng sidebar mobile
    onClose();
    // Đặt flag trong localStorage để biết cần cuộn sau khi chuyển trang
    localStorage.setItem("scrollToProducts", "true");

    // Chuyển trang
    router.push(`/${categorySlug}`);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="absolute inset-0 sm:inset-auto sm:right-0 sm:top-0 sm:bottom-0 w-full sm:w-96 bg-white flex flex-col overflow-hidden z-10">
        <div className="flex items-center justify-between p-4 border-b border-[#919EAB33]">
          <h2 className="text-xl font-bold text-brand-500">Bộ Lọc</h2>
          <button
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={onClose}
          >
            <CloseIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {/* Bộ lọc sản phẩm */}
          {mockFilterData?.productFilters &&
            mockFilterData.productFilters.length > 0 && (
              <FilterSection title="Bộ lọc sản phẩm" isOpen={true}>
                <div className="space-y-2">
                  {mockFilterData.productFilters.map(
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
                          onClick={() => onFilterChange(filterType, "1")}
                        >
                          {filter.name}
                        </button>
                      );
                    }
                  )}
                </div>
              </FilterSection>
            )}

          {/* Thương hiệu */}
          {filterData?.brand && filterData.brand.length > 0 && (
            <FilterSection title="Thương hiệu" isOpen={true}>
              <div className="space-y-3">
                {filterData.brand.map((brand: Brand) => (
                  <CustomCheckbox
                    key={brand.id}
                    id={`mb-${brand.code}`}
                    label={brand.name}
                    count={brand.count}
                    checked={filters.brand_id.includes(brand.id)}
                    onChange={() => onFilterChange("brand_id", brand.id)}
                  />
                ))}
              </div>
            </FilterSection>
          )}

          {/* Nhóm sản phẩm (Category) */}
          {filterData?.category && filterData.category.length > 0 && (
            <FilterSection title="Nhóm sản phẩm" isOpen={true}>
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
                      id={`mb-category-${category.id}`}
                      label={category.name.toString()}
                      count={category.count}
                      checked={
                        category.slug === currentSlug ||
                        filters.category_id.includes(category.id)
                      }
                      onChange={() =>
                        onFilterChange("category_id", category.id)
                      }
                    />
                  </Link>
                ))}
              </div>
            </FilterSection>
          )}

          {/* Dòng xe */}
          {filterData && (
            <FilterSection title="Dòng xe" isOpen={true} className="pb-5">
              <div className="space-y-1">
                {/* Hãng xe */}
                {filterData.company && filterData.company.length > 0 && (
                  <FilterNestedSection title="Hãng" isOpen={true}>
                    <div className="space-y-2.5">
                      {filterData.company.map((item) => (
                        <div key={item.id} className="relative pl-4 before:absolute before:left-0 before:top-1/3 before:-translate-y-1/2 before:w-4 before:h-4 before:border-l-2 before:border-b-2 before:border-gray-100 before:rounded-bl-xl">
                          <CustomCheckbox
                            key={item.id}
                            id={`mb-company-${item.id}`}
                            label={item.name}
                            count={item.count}
                            checked={filters.company_id.includes(item.id)}
                            onChange={() => onFilterChange("company_id", item.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </FilterNestedSection>
                )}

                {/* Model xe */}
                {filterData.model && filterData.model.length > 0 && (
                  <FilterNestedSection title="Model" isOpen={true}>
                    <div className="space-y-2.5">
                      {filterData.model.map((item) => (
                        <div key={item.id} className="relative pl-4 before:absolute before:left-0 before:top-1/3 before:-translate-y-1/2 before:w-4 before:h-4 before:border-l-2 before:border-b-2 before:border-gray-100 before:rounded-bl-xl">
                          <CustomCheckbox
                            key={item.id}
                            id={`mb-model-${item.id}`}
                            label={item.name}
                            count={item.count}
                            checked={filters.model_id.includes(item.id)}
                            onChange={() => onFilterChange("model_id", item.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </FilterNestedSection>
                )}

                {/* Năm sản xuất */}
                {filterData.yearManu && filterData.yearManu.length > 0 && (
                  <FilterNestedSection title="Năm sản xuất" isOpen={true}>
                    <div className="space-y-2.5">
                      {filterData.yearManu.map((item, index) => (
                        <div key={index} className="relative pl-4 before:absolute before:left-0 before:top-1/3 before:-translate-y-1/2 before:w-4 before:h-4 before:border-l-2 before:border-b-2 before:border-gray-100 before:rounded-bl-xl">
                          <CustomCheckbox
                            key={index}
                            id={`mb-year-${index}`}
                            label={item.name.toString()}
                            count={item.count}
                            checked={filters.year_manu.includes(item.name.toString())}
                            onChange={() =>
                              onFilterChange("year_manu", item.name.toString())
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </FilterNestedSection>
                )}

                {/* Động cơ */}
                {filterData.engine && filterData.engine.length > 0 && (
                  <FilterNestedSection title="Động cơ" isOpen={true}>
                    <div className="space-y-2.5">
                      {filterData.engine.map((item) => (
                        <div key={item.id} className="relative pl-4 before:absolute before:left-0 before:top-1/3 before:-translate-y-1/2 before:w-4 before:h-4 before:border-l-2 before:border-b-2 before:border-gray-100 before:rounded-bl-xl">
                          <CustomCheckbox
                            key={item.id}
                            id={`mb-engine-${item.id}`}
                            label={item.name}
                            count={item.count}
                            checked={filters.engine_id.includes(item.id)}
                            onChange={() => onFilterChange("engine_id", item.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </FilterNestedSection>
                )}

                {/* Body type */}
                {filterData.body && filterData.body.length > 0 && (
                  <FilterNestedSection title="Dòng xe" isOpen={true}>
                    <div className="space-y-2.5">
                      {filterData.body.map((item) => (
                        <div key={item.id} className="relative pl-4 before:absolute before:left-0 before:top-1/3 before:-translate-y-1/2 before:w-4 before:h-4 before:border-l-2 before:border-b-2 before:border-gray-100 before:rounded-bl-xl">
                          <CustomCheckbox
                            key={item.id}
                            id={`mb-body-${item.id}`}
                            label={item.name}
                            count={item.count}
                            checked={filters.body_id.includes(item.id)}
                            onChange={() => onFilterChange("body_id", item.id)}
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

        <div className="p-4 border-t border-[#919EAB33] flex gap-3">
          <button
            onClick={() => {
              onReset();
              onClose();
            }}
            className="flex-1 py-2 border border-[#919EAB3D] rounded-lg font-medium text-gray-700 hover:border-brand-400"
          >
            Xóa bộ lọc
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilterMb;
