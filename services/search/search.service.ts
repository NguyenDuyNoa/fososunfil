import axios from "@/utils/axios/axios-customize";

const apiSearch = {
  getSearchHistory(name_search: string) {
    return axios.get(
      `api_web/Api_homepage/searchProduct?name_search=${name_search}`
    );
  },
};

export default apiSearch;
