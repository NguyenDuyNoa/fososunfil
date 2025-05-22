"use client"
import React from "react";
import ProductGallery from "../Gallery";
import ProductSummary from "../Summary";
import { useResizeStore } from "@/stores/useResizeStore";

const MainInfo = () => {
  const { isVisibleMobile } = useResizeStore()

  return (
    <div className={`flex flex-col xl:flex-row gap-8 xl:rounded xl:p-8 bg-white ${isVisibleMobile ? "" : "container"}`}>
      <ProductGallery />
      <ProductSummary />
    </div>
  );
};

export default MainInfo;
