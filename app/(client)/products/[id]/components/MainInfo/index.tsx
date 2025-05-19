import React from "react";
import ProductGallery from "../Gallery";
import ProductSummary from "../Summary";

const MainInfo = () => {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-8 rounded 3xl:p-8 p-6 bg-white">
      <ProductGallery />
      <ProductSummary />
    </div>
  );
};

export default MainInfo;
