import { FilterData, CategoryPrice } from "../../hooks/useProductFilter";
import { Brand, Origin, YearManu } from "@/types/products/IProducts";

export const mockFilterData: FilterData = {
  categoryPrice: [
    {
      id: 1,
      name: "Sản phẩm đã mua",
      min: 0,
      max: 0
    },
    {
      id: 2,
      name: "Sản phẩm bán chạy",
      min: 0,
      max: 0
    },
    {
      id: 3,
      name: "Sản phẩm mới",
      min: 0,
      max: 0
    },
    {
      id: 4,
      name: "Sản phẩm chưa mua",
      min: 0,
      max: 0
    }
  ],
  brand: [
    {
      id: "1",
      code: "toyota",
      name: "Toyota",
      count: 120
    },
    {
      id: "2",
      code: "honda",
      name: "Honda",
      count: 98
    },
    {
      id: "3",
      code: "bmw",
      name: "BMW",
      count: 76
    },
    {
      id: "4",
      code: "mercedes",
      name: "Mercedes-Benz",
      count: 85
    },
    {
      id: "5",
      code: "audi",
      name: "Audi",
      count: 62
    },
    {
      id: "6",
      code: "ford",
      name: "Ford",
      count: 71
    }
  ],
  yearManu: [
    {
      name: 2023,
      count: 45
    },
    {
      name: 2022,
      count: 78
    },
    {
      name: 2021,
      count: 92
    },
    {
      name: 2020,
      count: 103
    },
    {
      name: 2019,
      count: 87
    },
    {
      name: 2018,
      count: 65
    }
  ],
  origin: [
    {
      id: "1",
      code: "sedan",
      name: "Sedan",
      count: 89
    },
    {
      id: "2",
      code: "suv",
      name: "SUV",
      count: 112
    },
    {
      id: "3",
      code: "hatchback",
      name: "Hatchback",
      count: 67
    },
    {
      id: "4",
      code: "crossover",
      name: "Crossover",
      count: 54
    },
    {
      id: "5",
      code: "coupe",
      name: "Coupe",
      count: 32
    }
  ]
};

// Dữ liệu bổ sung cho Hãng, Model, Năm, Động cơ, Thân xe
export const additionalFilterData = {
  manufacturers: {
    label: "Hãng",
    data: [
      { id: "1", name: "Toyota", count: 120 },
      { id: "2", name: "Honda", count: 98 },
      { id: "3", name: "BMW", count: 76 },
      { id: "4", name: "Mercedes-Benz", count: 85 },
      { id: "5", name: "Audi", count: 62 }
    ]
  },
  models: {
    label: "Model",
    data: [
      { id: "1", brandId: "1", name: "Camry", count: 34 },
      { id: "2", brandId: "1", name: "Corolla", count: 42 },
      { id: "3", brandId: "1", name: "RAV4", count: 27 },
      { id: "4", brandId: "2", name: "Civic", count: 38 },
      { id: "5", brandId: "2", name: "CR-V", count: 29 },
      { id: "6", brandId: "3", name: "X5", count: 18 },
      { id: "7", brandId: "3", name: "3 Series", count: 31 },
      { id: "8", brandId: "4", name: "C-Class", count: 26 },
      { id: "9", brandId: "4", name: "E-Class", count: 19 },
      { id: "10", brandId: "5", name: "A4", count: 22 },
      { id: "11", brandId: "5", name: "Q5", count: 24 }
    ]
  },
  years: {
    label: "Năm sản xuất",
    data: [
      { id: "1", name: "2023", count: 45 },
      { id: "2", name: "2022", count: 78 },
      { id: "3", name: "2021", count: 92 },
      { id: "4", name: "2020", count: 103 },
      { id: "5", name: "2019", count: 87 },
      { id: "6", name: "2018", count: 65 }
    ]
  },
  engines: {
    label: "Động cơ",
    data: [
      { id: "1", name: "1.5L", count: 64 },
      { id: "2", name: "1.8L", count: 53 },
      { id: "3", name: "2.0L", count: 87 },
      { id: "4", name: "2.5L", count: 42 },
      { id: "5", name: "3.0L", count: 29 },
      { id: "6", name: "3.5L", count: 18 }
    ]
  },
  bodyTypes: {
    label: "Dòng xe",
    data: [
      { id: "1", name: "Sedan", count: 89 },
      { id: "2", name: "SUV", count: 112 },
      { id: "3", name: "Hatchback", count: 67 },
      { id: "4", name: "Crossover", count: 54 },
      { id: "5", name: "Coupe", count: 32 },
      { id: "6", name: "Convertible", count: 15 }
    ]
  }
};
