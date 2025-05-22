"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import StoreLocatorBanner from "@/components/storeLocatorBanner";
import ServiceHighlights from "@/components/serviceHighlights";
import ProductMainInfo from "./components/MainInfo";
import ProductTabs from "./components/ProductTabs";
import Promo from "./components/Promo";
import RelatedProducts from "./components/Related";
import Review from "./components/Review";
import { useResizeStore } from "@/stores/useResizeStore";

const breadcrumbs = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/products" },
  {
    label:
      "Lọc gió động cơ Air Filter – Chevrolet Colorado, Trailblazer (52046262)",
    href: "/products/air-filter",
  },
];
const DetailProduct = () => {
  const { isVisibleMobile } = useResizeStore();
  return (
    <>
      <div className="flex flex-col gap-3 xl:gap-8 pt-4 xl:pt-6">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <ProductMainInfo />
        <div
          className={`flex flex-col-reverse xl:grid grid-cols-[6fr_4fr] gap-3 xl:gap-8  ${
            isVisibleMobile ? "" : "container"
          }`}
        >
          <div className="flex flex-col gap-3 xl:gap-6">
            <ProductTabs />
            <Review />
          </div>
          <div className="flex flex-col gap-3 xl:gap-6">
            <Promo />
            <RelatedProducts />
          </div>
        </div>
        <div className="container">
          <ServiceHighlights />
        </div>
      </div>
      <StoreLocatorBanner />
    </>
  );
};

export default DetailProduct;
