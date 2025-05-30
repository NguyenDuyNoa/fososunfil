"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceHighlights from "@/components/serviceHighlights";
import StoreLocatorBanner from "@/components/storeLocatorBanner";
import { useGetDetailItem } from "@/managers/api-management/products/useGetDetailItem";
import { useResizeStore } from "@/stores/useResizeStore";
import { useParams } from "next/navigation";
import ProductMainInfo from "./components/MainInfo";
import ProductTabs from "./components/ProductTabs";
import Promo from "./components/Promo";
import RelatedProducts from "./components/Related";
import Review from "./components/Review";
import { useEffect } from "react";
import { saveViewedProduct } from "@/utils/localStorage";

const DetailProduct = () => {
  const { isVisibleMobile } = useResizeStore();
  const params = useParams();
  const { data: detailItem } = useGetDetailItem(params?.id as string);

  // Lưu ID sản phẩm vào localStorage khi xem chi tiết
  useEffect(() => {
    if (params?.id) {
      saveViewedProduct(params.id as string);
    }
  }, [params?.id]);

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/products" },
    {
      label: detailItem?.item?.name,
      href: `/products/${params?.id}`,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-3 xl:gap-8 pt-4 xl:pt-6">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <ProductMainInfo data={detailItem?.item} />
        <div
          className={`flex flex-col-reverse xl:grid grid-cols-[6fr_4fr] gap-3 xl:gap-8  ${
            isVisibleMobile ? "" : "container"
          }`}
        >
          <div className="flex flex-col gap-3 xl:gap-6">
            <ProductTabs
              tabs={detailItem?.item?.parameter}
              imageDetail={detailItem?.item?.image_detail}
            />
            <Review
              reviewItem={detailItem?.item?.reviewItem}
              listReview={detailItem?.item?.listReview}
            />
          </div>
          <div className="flex flex-col gap-3 xl:gap-6">
            <Promo promotion={detailItem?.item?.arrPromotion} />
            <RelatedProducts detailItem={detailItem?.dataItems} />
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
