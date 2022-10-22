import axios from "./index.js";

let CongressmanBillMappingAPI = {};

CongressmanBillMappingAPI.getCongressmanBillMapping = (congressmanId) => {
  return axios.get("api/v1/congressmanBillMapping", {
    params: {
      congressmanId: congressmanId,
    },
  });
};

export default CongressmanBillMappingAPI;
