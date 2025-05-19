import Breadcrumbs from "@/components/Breadcrumbs";
import StoreLocatorBanner from "@/components/storeLocatorBanner";
import ServiceHighlights from "@/components/serviceHighlights";
import ProductMainInfo from "./components/MainInfo";
import ProductTabs from "./components/ProductTabs";
import Promo from "./components/Promo";
import RelatedProducts from "./components/Related";
import Review from "./components/Review";

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
  return (
    <>
      <div className="container flex flex-col gap-8 pt-6">
        <Breadcrumbs items={breadcrumbs} />
        <ProductMainInfo />
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          <div className="flex flex-col gap-6">
            <ProductTabs />
            <Review />
          </div>
          <div className="flex flex-col gap-6">
            <Promo />
            <RelatedProducts />
          </div>
        </div>
        <ServiceHighlights />
      </div>
      <StoreLocatorBanner />
    </>
  );
};

export default DetailProduct;
