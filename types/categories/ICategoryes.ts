export interface IListCategories {
  id: string;
  name: string;
  key_items: string;
  images: string;
  description: string | null;
  content: string | null;
  images_items: string | null;
  images_items_detail: string | null;
  title: string;
}
export interface IResponCategoriesHome {
  data: IListCategories[];
  result: boolean;
}

export interface ItemCategoryProduct {
  name: string;
  image: string;
}

export interface MenuItem {
  id: string;
  child?: MenuItem[];
  code?: string;
  icon?: string;
  items?: any[];
  name: string;
  slug?: string;
}
