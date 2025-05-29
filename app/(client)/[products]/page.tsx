"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceHighlights from "@/components/serviceHighlights";
import StoreLocatorBanner from "@/components/storeLocatorBanner";
import { useGetPageProduct } from "@/managers/api-management/products/useGetPageProduct";
import { useParams, useSearchParams } from "next/navigation";
import BannerProduct from "./components/BannerProduct";
import MainContent from "./components/MainContent";
const Products = () => {
  const params = useParams();
  const slug = params?.products as string;
  const { data: dataPageProduct, isLoading } = useGetPageProduct(slug);
  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/products" },
  ];

  return (
    <>
      <div className="container flex flex-col gap-2 xl:gap-8 pt-6">
        <Breadcrumbs items={breadcrumbs} />
        <BannerProduct dataCategory={dataPageProduct?.dtCategory} dataProduct={dataPageProduct?.dataItems} />
        <MainContent slug={slug}/>
        <ServiceHighlights />
      </div>
      <StoreLocatorBanner />
    </>
  );
};

export default Products;
