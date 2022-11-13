import axios from "@/api/index.js";

let RegionListAPI = {};

RegionListAPI.getRegionList = () => {
  return axios.get("api/v1/getRegionList", {});
};

export default RegionListAPI;
