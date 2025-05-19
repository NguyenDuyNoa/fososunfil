import React from "react";
import SidebarFilter from "../SidebarFilter";
import ProductSection from "../ProductSection";

const MainContent = () => {
  return (
    <div className="flex gap-5 relative">
      <SidebarFilter />
      <ProductSection />
    </div>
  );
};

export default MainContent;
