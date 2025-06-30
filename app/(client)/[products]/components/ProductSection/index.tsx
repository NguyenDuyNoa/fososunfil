import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import ProductCardWithAuthCheck from "@/components/productCard/withAuthCheck";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import { IMAGES } from "@/constants/Images";
import { useGetListItemProduct } from "@/managers/api-management/products/useGetListItem";
import { FilterState, ProductItem } from "@/types/products/IProducts";
import Image from "next/image";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

interface ProductSectionProps {
  slug: string;
  filters: FilterState;
  onOpenFilter?: () => void;
}

const ProductSection = forwardRef<{ scrollToTop: () => void }, ProductSectionProps>(({
  slug,
  filters,
  onOpenFilter,
}, ref) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<string>("Giá:");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sortPrice, setSortPrice] = useState<"asc" | "desc" | number>(-1);

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      if (sectionRef.current) {
        const yOffset = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({
          top: yOffset,
          behavior: "smooth"
        });
      }
    }
  }));

  const filterOptions = ["Bán chạy", "Mới nhất", "Nổi bật"];
  const priceOptions = ["Giá: Thấp → Cao", "Giá: Cao → Thấp"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowPriceDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Tạo object sort dựa vào activeFilter
  const getSort = () => {
    switch (activeFilter) {
      case "Mới nhất":
        return { is_new: 1 };
      case "Nổi bật":
        return { is_hot: 1 };
      default:
        return {};
    }
  };

  const { data: dataListItemProduct, isLoading } = useGetListItemProduct(
    slug,
    filters,
    getSort(),
    sortPrice
  );

  const handleFilterChange = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null); // Bỏ chọn nếu click vào filter đang active
    } else {
      setActiveFilter(filter); // Chọn filter mới nếu click vào filter khác
    }
  };

  return (
    <div ref={sectionRef} className="flex w-full flex-col gap-5">
      <div className="w-full flex gap-1 flex-col xl:flex-row xl:items-center xl:justify-between pb-2">
        <h2 className="text-base xl:text-xl font-semibold text-primary-new">
          Danh sách sản phẩm
        </h2>
        <hr className="border-[#919EAB33] xl:hidden" />
        <div className="flex flex-col xl:flex-row xl:items-center gap-1 xl:gap-6">
          <div className="flex items-center gap-4 h-9">
            <span className="text-primary-new font-medium text-sm xl:text-base whitespace-nowrap">
              Sắp xếp theo:
            </span>
            <div className="flex xl:gap-3 flex-nowrap items-center overflow-x-auto scrollbar-hide">
              {filterOptions.map((filter) => (
                <div key={filter} className="flex items-center flex-shrink-0">
                  <button
                    className={`relative whitespace-nowrap xl:px-4 xl:py-2 xl:rounded-lg text-sm font-medium xl:font-bold xl:bg-white xl:border overflow-hidden ${
                      activeFilter === filter
                        ? "xl:border-brand-500 text-brand-500 "
                        : " xl:border-transparent text-primary-new xl:hover:border-brand-400"
                    }`}
                    onClick={() => handleFilterChange(filter)}
                  >
                    {filter}
                    {activeFilter === filter && (
                      <div className="hidden xl:block absolute -top-[1px] -right-[1px]">
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            backgroundColor: "var(--brand-500, #2563eb)",
                            clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                            position: "relative",
                          }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              position: "absolute",
                              top: "8px",
                              right: "7px",
                              transform: "translate(50%, -50%)",
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.24663 3.46751C9.40264 3.60372 9.41871 3.84061 9.2825 3.99663L5.35393 8.49663C5.28271 8.5782 5.17972 8.62501 5.07143 8.62501C4.96315 8.62501 4.86015 8.5782 4.78894 8.49663L3.21751 6.69663C3.08131 6.54061 3.09737 6.30372 3.25338 6.16751C3.4094 6.03131 3.64629 6.04737 3.7825 6.20338L5.07143 7.6798L8.71751 3.50338C8.85372 3.34737 9.09061 3.33131 9.24663 3.46751Z"
                              fill="white"
                              stroke="white"
                              stroke-linecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                  <hr className="border-[#919EAB33] h-full w-[20px] rotate-90 xl:hidden" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className="flex items-center text-sm font-medium gap-2 xl:px-2 xl:py-2 rounded-lg border border-transparent text-gray-700 hover:border-brand-400"
              >
                <span>{selectedPrice}</span>
                <ArrowUpIcon
                  className={`size-5 transition-transform duration-200 ${
                    showPriceDropdown ? "" : "rotate-180"
                  }`}
                />
              </button>

              {showPriceDropdown && (
                <div className="absolute right-0 w-40 z-10 mt-1 rounded-lg bg-white shadow-lg border border-gray-200">
                  <div className="py-1">
                    {priceOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedPrice(option);
                          setSortPrice(
                            option === "Giá: Thấp → Cao" ? "asc" : "desc"
                          );
                          setShowPriceDropdown(false);
                        }}
                        className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                          selectedPrice === option
                            ? "text-brand-500 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => onOpenFilter && onOpenFilter()}
              className="xl:hidden flex items-center gap-2 p-2 border border-[#919EAB3D] rounded-lg"
            >
              <FilterIcon className="size-5" />
              <span className="text-sm font-bold text-primary-new mt-0.5">
                Bộ lọc
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xxl:grid-cols-4 gap-y-2 gap-x-3 xl:gap-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : dataListItemProduct?.length > 0 ? (
          dataListItemProduct?.map((item: ProductItem, index: number) => (
            <ProductCardWithAuthCheck key={index} product={item} />
          ))
        ) : (
          <div className="flex flex-col col-span-4 row-span-4 h-full justify-center items-center gap-y-2 gap-x-3 xl:gap-4 min-h-[500px]">
            <Image
              src={IMAGES.productEmpty}
              alt="product empty"
              width={250}
              height={250}
            />
            <p className="text-base xl:text-2xl font-semibold text-secondary-new">
              Không tìm thấy sản phẩm nào.
            </p>
          </div>
        )}
      </div>
      {/* {showFilter && <SidebarFilterMb onClose={() => setShowFilter(false)} />} */}
    </div>
  );
});

ProductSection.displayName = 'ProductSection';

export default ProductSection;
