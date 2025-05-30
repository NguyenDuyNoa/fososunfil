import axios from "@/utils/axios/axios-customize";

const apiProducts = {
  // danh sách sản phẩm
  getListCategory(params: any, page: number = 1, limit: number = 10) {
    const newParams = {
      ...params,
      page,
      limit,
    };
    return axios.post(
      `/api_web/Api_category_product/getListCategory`,
      newParams
    );
  },

  getListItem(
    slug: string,
    filter: any = {},
    sort: { is_new?: number; is_hot?: number } = {},
    sort_price: "asc" | "desc" | number = -1,
    page: number = 1,
    limit: number = 10
  ) {
    return axios.post(`/api_web/Api_category_product/getListItem`, {
      category_id: slug,
      page,
      limit,
      filter,
      sort_price,
      ...sort,
    });
  },

  getPageProduct(slug: string, page: number = 1, limit: number = 10) {
    return axios.get(
      `/api_web/Api_category_product/getPageProduct?category_id=${slug}&page=${page}&limit=${limit}`
    );
  },

  categoryFilter(slug: string) {
    return axios.get(
      `/api_web/Api_category_product/categoryFilter?category_id=${slug}`
    );
  },

  getDetailItem(item_id: string) {
    return axios.get(
      `/api_web/Api_category_product/getDetailItem?item_id=${item_id}`
    );
  },

  getReview(item_id: string, page: number = 1, limit: number = 1) {
    return axios.get(
      `/api_web/Api_category_product/getListReview?item_id=${item_id}&page=${page}&limit=${limit}`
    );
  },

  addReviewItem(data: any) {
    return axios.post(`/api_web/Api_Clients/addReviewItem`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default apiProducts;
