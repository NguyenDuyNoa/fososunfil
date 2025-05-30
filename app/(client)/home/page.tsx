"use client";

import BrandList from "@/app/(client)/home/components/BrandList";
import categoryData from "@/components/layout/header/NewDesktopHeader";
import { IMAGES } from "@/constants/Images";
import { useGetListCategories } from "@/managers/api-management/categories/useGetListCategories";
import { useResizeStore } from "@/stores/useResizeStore";
import { useEffect } from "react";
import { useStateHome } from "./_state/useStateHome";
import DiscountCodeBanner from "./components/DiscountCodeBanner";
import FeaturedPosts from "./components/FeaturedPosts";
import FlashSale from "./components/FlashSale";
import HeroBanner from "./components/HeroBanner";
import NewArrival from "./components/NewArrival";
import SuggestedForYou from "./components/SuggestedForYou";
import ViewedProducts from "./components/ViewedProducts";
import { useGetListData } from "@/managers/api-management/home/useGetListData";

const carBrands = [
  { id: "honda", name: "Honda", logo: "/home/LogoCar/Honda.png" },
  { id: "ford", name: "Ford", logo: "/home/LogoCar/Ford.png" },
  { id: "bmw", name: "BMW", logo: "/home/LogoCar/BMW.png" },
  { id: "audi", name: "Audi", logo: "/home/LogoCar/Audi.png" },
  { id: "kia", name: "KIA-Morning", logo: "/home/LogoCar/Kia.png" },
  { id: "nissan", name: "Nissan", logo: "/home/LogoCar/Nissan.png" },
  { id: "chevrolet", name: "Chevrolet", logo: "/home/LogoCar/Chevrolet.png" },
  { id: "volkswagen", name: "Volkswagen", logo: "/home/LogoCar/Volkswagen.png" },
  { id: "lexus", name: "Lexus", logo: "/home/LogoCar/Lexus.png" },
  { id: "volvo", name: "Volvo", logo: "/home/LogoCar/Volvo.png" },
  { id: "honda1", name: "Honda", logo: "/home/LogoCar/Honda.png" },
  { id: "ford1", name: "Ford", logo: "/home/LogoCar/Ford.png" },
  { id: "bmw1", name: "BMW", logo: "/home/LogoCar/BMW.png" },
  { id: "audi1", name: "Audi", logo: "/home/LogoCar/Audi.png" },
  { id: "kia1", name: "KIA-Morning", logo: "/home/LogoCar/Kia.png" },
  { id: "nissan1", name: "Nissan", logo: "/home/LogoCar/Nissan.png" },
];

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
      <DiscountCodeBanner />
      <SuggestedForYou itemRelated={listData?.itemRelated}/>
      <NewArrival itemNew={listData?.itemNew}/>
      <FeaturedPosts />
    </div>
  );
};

export default Home;
