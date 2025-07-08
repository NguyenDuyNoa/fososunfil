import { useGetCategoryFilter } from "@/managers/api-management/products/useGetCategoryFilter";
import { Brand, Category, Origin, YearManu } from "@/types/products/IProducts";
import { useState } from "react";

export interface FilterState {
  brand_id: string[];
  origin_id: string[];
  year_manu: string[];
  category_id: string[];
  product_sold: number;
  product_for_you: number;
  product_new: number;
  product_not_bought: number;
  price: number;
  is_new?: number;
  is_hot?: number;
}

export interface CategoryFilter {
  id: number;
  name: string;
  min: number;
  max: number;
}

export interface FilterData {
  category?: Category[];
  productFilters?: CategoryFilter[];
  brand?: Brand[];
  origin?: Origin[];
  yearManu?: YearManu[];
}

export const useProductFilter = (slug: string) => {
  const [filters, setFilters] = useState<FilterState>({
    brand_id: [],
    origin_id: [],
    year_manu: [],
    category_id: [],
    product_sold: 0,
    product_for_you: 0,
    product_new: 0,
    product_not_bought: 0,
    price: 0,
    is_new: 0,
    is_hot: 0
  });

  const { data: apiResponse, isLoading: apiLoading } = useGetCategoryFilter(slug);

  // Đảm bảo dữ liệu được định dạng đúng
  const filterData: FilterData = apiResponse?.data ? {
    ...apiResponse.data,
    categoryPrice: Array.isArray(apiResponse.data.categoryPrice) ? apiResponse.data.categoryPrice : []
  } : { 
    categoryPrice: [],
    brand: [],
    origin: [],
    yearManu: []
  };
  const isLoading = apiLoading || !apiResponse;

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    if (type === "product_sold" || type === "product_for_you" || type === "product_new" || type === "product_not_bought") {
      // Nếu là cùng loại và đã có giá trị 1 (toggle off) thì reset về 0
      if (filters[type] === 1) {
        setFilters({
          ...filters,
          product_sold: 0,
          product_for_you: 0,
          product_new: 0,
          product_not_bought: 0
        });
      } else {
        // Reset tất cả các filter sản phẩm khác về 0 và set giá trị mới thành 1
        setFilters({
          ...filters,
          product_sold: type === "product_sold" ? 1 : 0,
          product_for_you: type === "product_for_you" ? 1 : 0,
          product_new: type === "product_new" ? 1 : 0,
          product_not_bought: type === "product_not_bought" ? 1 : 0,
        });
      }
    } else {
      const currentValues = filters[type] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      setFilters({
        ...filters,
        [type]: newValues,
      });
    }
  };

  const resetFilters = () => {
    setFilters({
      brand_id: [],
      origin_id: [],
      year_manu: [],
      category_id: [],
      product_sold: 0,
      product_for_you: 0,
      product_new: 0,
      product_not_bought: 0,
      price: 0,
      is_new: 0,
      is_hot: 0
    });
  };

  return {
    filters,
    filterData,
    handleFilterChange,
    resetFilters,
    isLoading,
  };
}; 