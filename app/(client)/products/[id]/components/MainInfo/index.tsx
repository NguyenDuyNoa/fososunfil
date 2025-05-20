import React from "react";
import ProductGallery from "../Gallery";
import ProductSummary from "../Summary";

const MainInfo = () => {
  return (
    <div className="flex gap-8 rounded p-8 bg-white">
      <ProductGallery />
      <ProductSummary />
    </div>
  );
};

export default MainInfo;
