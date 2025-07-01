interface IDetailProductParameter {
  id: string | null;
  id_parameter_detail: string | null;
  id_product: string | null;
  code_lead: string | null;
  id_product_lead: string | null;
  type_view: string | null;
}

interface ICodeProduct {
  id: string | null;
  code: string | null;
  code_leads: string | null;
  name: string | null;
  images: string | null;
  type_items: string | null;
  create_by: string | null;
  date_create: string | null;
  is_website: string | null;
  tag_code: string;
  type_code: string;
  filter_type: string;
}
interface IDetailCodeProduct {
  id: string | null;
  code: string | null;
  name: string | null;
  images: string | null;
  type_items: string | null;
  create_by: string | null;
  date_create: string | null;
  product_id: string | null;
  tag_code: string[] | [];
  specification: {
    name: string | null;
    is_value: string | null;
    order_by: string | null;
  }[];
  reference:
    | {
        name: string | null;
        is_value: string | null;
        order_by: string | null;
      }[]
    | [];
  parameter: {
    id: string | null;
    name: string | null;
    type_item: string | null;
    id_product: string | null;
    order_by: string | null;
    detail:
      | {
          id: string | null;
          id_parameter: string | null;
          id_product: string | null;
          year: string | null;
          engine_vol: string | null;
          engine_no: string | null;
          td_body: string | null;
          oil?: IDetailProductParameter[];
          air?: IDetailProductParameter[];
          diesel?: IDetailProductParameter[];
          cabin?: IDetailProductParameter[];
          transmission?: IDetailProductParameter[];
          gasoline?: IDetailProductParameter[];
          fuel_water?: IDetailProductParameter[];
          hydraulic_oil?: IDetailProductParameter[];
          air_purifier?: IDetailProductParameter[];
          hvac?: IDetailProductParameter[];
          other?: IDetailProductParameter[];
        }[]
      | [];
  }[];
  couple_filter: {
    id: string;
    code: string;
  }[];
}

interface IDetailCodeApplication {
  id: string;
  year: string;
  year_start: string;
  year_end: string;
  engine_vol: string;
  engine_no: string;
  td_body: string;
  manufacturer: string;
  model: string;
  oil?: IDetailProductParameter[];
  air?: IDetailProductParameter[];
  air_dryer?: IDetailProductParameter[]; //
  air_oil_separator?: IDetailProductParameter[]; //
  air_purifier?: IDetailProductParameter[];
  coolant_filter?: IDetailProductParameter[]; //
  filter_bag?: IDetailProductParameter[]; //
  filter_cartridges?: IDetailProductParameter[]; //
  fuel_pump?: IDetailProductParameter[]; //
  fuel_water?: IDetailProductParameter[];
  gas_filter?: IDetailProductParameter[]; //
  hvac?: IDetailProductParameter[];
  hydraulic_oil?: IDetailProductParameter[];
  urea_filter?: IDetailProductParameter[]; //
  diesel?: IDetailProductParameter[];
  cabin?: IDetailProductParameter[];
  transmission?: IDetailProductParameter[];
  other?: IDetailProductParameter[];
}

interface IFullCodeProduct {
  data: ICodeProduct[];
  data_active: IDetailCodeProduct;
  success: boolean;
}

export type {
  IDetailCodeProduct,
  IDetailCodeApplication,
  ICodeProduct,
  IFullCodeProduct,
};

export interface ProductItem {
  id: string;
  code?: string;
  name: string;
  images?: string;
  percent?: string;
  price?: string;
  price_promotion?: number;
  promotion_name?: string;
}

export interface Category {
  id: string;
  code: string;
  name: string;
  title: string;
  sub_title: string;
  image: string;
  background: string;
}

export interface ProductResponse {
  data: {
    dataItems: ProductItem[];
    dtCategory: Category;
  };
  result: boolean;
}

export interface Category {
  id: string;
  icon: string;
  code: string;
  name: string;
  count: number;
}

export interface Brand {
  id: string;
  code: string;
  name: string;
  count: number;
}

export interface Origin {
  id: string;
  code: string;
  name: string;
  count: number;
}

export interface YearManu {
  name: number;
  count: number;
}

export interface CategoryFilterResponse {
  data: {
    category: Category[];
    brand: Brand[];
    origin: Origin[];
    yearManu: YearManu[];
  };
}

export interface FilterState {
  year_manu: string[];
  brand_id: string[];
  origin_id: string[];
  price: number;
  is_new?: number;
  is_hot?: number;
}

export interface IParameterItem {
  name: string;
  value: string;
}

export interface IParameter {
  id: string;
  product_id: string;
  name: string;
  item: IParameterItem[];
}

export interface IPromotion {
  id: string;
  name: string;
  title: string;
}

export interface IReviewItem {
  id: number;
  name: string;
  count: number;
}

export interface IReviewSummary {
  totalReview: string;
  totalRating: string;
  items: IReviewItem[];
}

export interface ICustomer {
  id: string;
  name: string;
  image: string;
}

export interface IReviewFile {
  file_name: string;
  file: string;
}

export interface IReview {
  id: string;
  star: string;
  content: string;
  created_at: string;
  arrfile: IReviewFile[];
  customer: ICustomer;
  likeCount: number;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IBrand {
  id: string;
  name: string;
}

export interface IOrigin {
  id: string;
  name: string;
}

export interface IRelatedProduct {
  id: string;
  name: string;
  code: string;
  images: string;
  price: string;
  percent: string;
  promotion_name: string;
  price_promotion: number;
}

export interface IProduct {
  id: string;
  name: string;
  code: string;
  images: string[];
  image_detail: string;
  price: string;
  year_manu: string;
  percent: string;
  promotion_name: string;
  price_promotion: number;
  category: ICategory;
  brand: IBrand;
  origin: IOrigin;
  parameter: IParameter[];
  arrPromotion: IPromotion[];
  reviewItem: IReviewSummary;
  listReview: IReview[];
  dataItems: IRelatedProduct[];
  result: boolean;
} 
