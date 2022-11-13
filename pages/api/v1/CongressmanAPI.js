import axios from "./index.js";

let CongressmanAPI = {};

CongressmanAPI.getCongressman = (id) => {
  return axios.get("api/v1/congressman", {
    params: {
      id: id,
    },
  });
};
CongressmanAPI.getCongressmanList = () => {
  return axios.get("api/v1/congressmanList", {});
};
CongressmanAPI.getInterestCongressmenByUserId = (userId) => {
  return axios.get("api/v1/congressmenByUserId", {
    params: {
      userId: userId,
    },
  });
};
CongressmanAPI.getCongressmanByRegion = (region) => {
  return axios.get("api/v1/congressmanByRegion", {
    params: {
      region: region,
    },
  });
};
CongressmanAPI.searchCongressmanList = (name, region, party) => {
  return axios.get("api/v1/searchCongressmanList", {
    params: {
      name: name,
      region: region,
      party: party,
    },
  });
};

export default CongressmanAPI;
