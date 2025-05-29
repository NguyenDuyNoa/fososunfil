import { FilterState } from "@/types/products/IProducts";
import { useState } from "react";
import ProductSection from "../ProductSection";
import SidebarFilter from "../SidebarFilter";

const MainContent = ({ slug }: { slug: string }) => {
  const [filters, setFilters] = useState<FilterState>({
    year_manu: [],
    brand_id: [],
    origin_id: [],
    price: 0,
    is_new: undefined,
    is_hot: undefined,
  });

  return (
    <div className="flex gap-5 relative">
      <SidebarFilter onFilterChange={setFilters} filters={filters} slug={slug} />
      <ProductSection slug={slug} filters={filters} />
    </div>
  );
};

export default MainContent;
