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
          {additionalFilterData && (
            <FilterSection title="Dòng xe" isOpen={true} className="pb-5">
              <div className="space-y-1">
                {Object.entries(additionalFilterData).map(
                  ([key, filterGroup]) => (
                    <FilterNestedSection
                      key={key}
                      title={filterGroup.label}
                      isOpen={true}
                    >
                      <div className="space-y-2.5">
                        {filterGroup.data.map((item) => (
                          <CustomCheckbox
                            key={item.id}
                            id={`mb-${key}-${item.id}`}
                            label={item.name}
                            count={item.count}
                            checked={
                              key === "bodyTypes"
                                ? filters.origin_id.includes(item.id)
                                : false
                            }
                            onChange={() =>
                              key === "bodyTypes"
                                ? onFilterChange("origin_id", item.id)
                                : {}
                            }
                          />
                        ))}
                      </div>
                    </FilterNestedSection>
                  )
                )}
              </div>
            </FilterSection>
          )}
        </div>

        <div className="p-4 border-t border-[#919EAB33] flex gap-3">
          <button
            onClick={onReset}
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
