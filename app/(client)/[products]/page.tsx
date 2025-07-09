"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceHighlights from "@/components/serviceHighlights";
import StoreLocatorBanner from "@/components/storeLocatorBanner";
import { useGetPageProduct } from "@/managers/api-management/products/useGetPageProduct";
import { useState, useRef, useEffect } from "react";
import BannerProduct from "./components/BannerProduct";
import ProductSection from "./components/ProductSection";
import SidebarFilter from "./components/SidebarFilter";
import SidebarFilterMb from "./components/SidebarFilterMb";
import { useProductFilter } from "./hooks/useProductFilter";
import { FilterState } from "./hooks/useProductFilter";

interface ProductsPageProps {
  params: {
    products: string;
  };
}

const ProductsPage = ({ params }: ProductsPageProps) => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { filters, filterData, handleFilterChange, resetFilters, isLoading } =
    useProductFilter(params.products);
  const { data: dataPageProduct, isLoading: isLoadingPage } = useGetPageProduct(
    params.products
  );
  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: dataPageProduct?.dtCategory?.name, href: "#" },
  ];

  const productSectionRef = useRef<{ scrollToTop: () => void }>(null);

  useEffect(() => {
    // Kiểm tra nếu có flag trong localStorage
    const shouldScroll = localStorage.getItem('scrollToProducts');
    if (shouldScroll) {
      // Xóa flag
      localStorage.removeItem('scrollToProducts');
      
      // Chờ một chút để trang load hoàn chỉnh
      const timer = setTimeout(() => {
        if (productSectionRef.current) {
          productSectionRef.current.scrollToTop();
        }
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleFilterChangeWithScroll = (type: keyof FilterState, value: any) => {
    handleFilterChange(type as any, value);
    if (productSectionRef.current) {
      productSectionRef.current.scrollToTop();
    }
  };

  return (
    <>
      <div className="container flex flex-col gap-2 xl:gap-8 pt-6">
        <Breadcrumbs items={breadcrumbs} />
        <BannerProduct
          dataCategory={dataPageProduct?.dtCategory}
          dataProduct={dataPageProduct?.dataItems}
          isLoadingPage={isLoadingPage}
        />
        <div className="flex gap-5 relative">
          <SidebarFilter
            filters={filters}
            filterData={filterData}
            onFilterChange={handleFilterChangeWithScroll}
          />
          <ProductSection
            ref={productSectionRef}
            slug={params.products}
            filters={filters}
            onOpenFilter={() => setShowMobileFilter(true)}
          />
          {showMobileFilter && (
            <SidebarFilterMb
              onClose={() => setShowMobileFilter(false)}
              filters={filters}
              filterData={filterData}
              onFilterChange={handleFilterChangeWithScroll}
              onReset={resetFilters}
            />
          )}
        </div>
        <ServiceHighlights />
      </div>
      <StoreLocatorBanner />
    </>
  );
};

export default ProductsPage;
