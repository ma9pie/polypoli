import axios from "./index.js";

let BillAPI = {};

BillAPI.getBill = (billId) => {
  return axios.get("api/v1/bill", {
    params: {
      billId: billId,
    },
  });
};

BillAPI.getBills = (billIds) => {
  return axios.get("api/v1/bills", {
    params: {
      billIds: billIds,
    },
  });
};

BillAPI.getBillWithUserId = (billId, userId) => {
  return axios.get("api/v1/billWithUserId", {
    params: {
      billId: billId,
      userId: userId,
    },
  });
};

BillAPI.getHotBills = (week, month, year, userKey) => {
  return axios.get("api/v1/hotBills", {
    params: {
      week: week,
      month: month,
      year: year,
      userKey: userKey,
    },
  });
};

BillAPI.searchBills = (searchWord) => {
  return axios.get("api/v1/searchBills", {
    params: {
      searchWord: searchWord,
    },
  });
};

export default BillAPI;
