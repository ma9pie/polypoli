import axios from "./index.js";

let BillUserMappingAPI = {};

BillUserMappingAPI.upsertBillLike = (bill_id, user_id, like) => {
  return axios.post("api/v1/billUserMapping", {
    billId: bill_id,
    userId: user_id,
    like: like,
  });
};

export default BillUserMappingAPI;
