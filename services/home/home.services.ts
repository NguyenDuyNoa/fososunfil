import axios from "@/utils/axios/axios-customize";

const apiHome = {
  getListData() {
    return axios.get("/api_web/Api_homepage/getListData");
  },

  getListItemView(item_ids: string[]) {
    return axios.post("/api_web/Api_homepage/getListItemView", {
      item_id: item_ids
    });
  },
};

export default apiHome;