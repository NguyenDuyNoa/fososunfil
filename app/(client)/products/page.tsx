"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import { useGetListCategories } from "@/managers/api-management/categories/useGetListCategories";
import { useGetDataPageAboutUs } from "@/managers/api-management/ui/about-us/useGetDataPageAboutUs";
import BannerProduct from "./components/BannerProduct";
import MainContent from "./components/MainContent";
import ServiceHighlights from "@/components/serviceHighlights";
import StoreLocatorBanner from "@/components/storeLocatorBanner";
const Products = () => {
  const { data: dataListProducts, isLoading } = useGetListCategories();
  const { data: dataIntroduceProduct } = useGetDataPageAboutUs({
    enebled: true,
  });
  console.log(dataListProducts);
  console.log("dataIntroduceProduct", dataIntroduceProduct);

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/products" },
  ];

  return (
    <>
      <div className="bg-[#F4F6F8] flex flex-col 3xl:gap-8 gap-6 pt-6 3xl:px-12 2xl:px-9 xl:px-6 px-4">
        <Breadcrumbs items={breadcrumbs} />
        <BannerProduct />
        <MainContent />
        <ServiceHighlights />
      </div>
      <StoreLocatorBanner />
    </>
  );
};

export default Products;
