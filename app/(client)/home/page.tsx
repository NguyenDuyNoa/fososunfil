"use client";

import BrandList from "@/app/(client)/home/components/BrandList";
import categoryData from "@/components/layout/header/NewDesktopHeader";
import { useGetListCategories } from "@/managers/api-management/categories/useGetListCategories";
import { useGetListData } from "@/managers/api-management/home/useGetListData";
import { useEffect } from "react";
import { useStateHome } from "./_state/useStateHome";
import DiscountCodeBanner from "./components/DiscountCodeBanner";
import FeaturedPosts from "./components/FeaturedPosts";
import FlashSale from "./components/FlashSale";
import HeroBanner from "./components/HeroBanner";
import NewArrival from "./components/NewArrival";
import SuggestedForYou from "./components/SuggestedForYou";
import ViewedProducts from "./components/ViewedProducts";

const Home = () => {
  const { queryKeyIsStateHome } = useStateHome();
  const { data: listCategories } = useGetListCategories();
  const { data: listData } = useGetListData();
  useEffect(() => {
    if (listCategories) {
      queryKeyIsStateHome({ idTabActive: listCategories[0] });
    }
  }, [listCategories]);

  return (
    <div className="relative w-full flex flex-col gap-6 pt-6 xl:pt-0 pb-8">
      <HeroBanner
        items={categoryData as any}
        IsProducts={true}
        bannerSlides={listData?.banner}
      />
      <BrandList brands={listData?.logo_brand} />
      <FlashSale itemSale={listData?.itemSale}/>
      <ViewedProducts />
      <DiscountCodeBanner banner={listData?.image_promotion} />
      <SuggestedForYou imageForYou={listData?.image_for_you} itemRelated={listData?.itemRelated}/>
      <NewArrival itemNew={listData?.itemNew}/>
      <FeaturedPosts />
    </div>
  );
};

export default Home;
