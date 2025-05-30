import { useState, useEffect } from "react";
import { useGetCategoryFilter } from "@/managers/api-management/products/useGetCategoryFilter";
import { Brand, Origin, YearManu } from "@/types/products/IProducts";

export interface FilterState {
  brand_id: string[];
  origin_id: string[];
  year_manu: string[];
  price: number;
}

export interface CategoryPrice {
  id: number;
  name: string;
  min: number;
  max: number;
}

export interface FilterData {
  categoryPrice?: CategoryPrice[];
  brand?: Brand[];
  origin?: Origin[];
  yearManu?: YearManu[];
}

export const useProductFilter = (slug: string) => {
  const [filters, setFilters] = useState<FilterState>({
    brand_id: [],
    origin_id: [],
    year_manu: [],
    price: 0,
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
    if (type === "price") {
      const newValue = filters.price === Number(value) ? 0 : Number(value);
      setFilters({
        ...filters,
        [type]: newValue,
      });
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
      price: 0,
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