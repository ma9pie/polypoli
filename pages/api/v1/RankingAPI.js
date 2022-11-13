import axios from "./index.js";

let RankingAPI = {};

RankingAPI.getRanking = (year, month) => {
  return axios.get("api/v1/ranking", {
    params: {
      year: year,
      month: month,
    },
  });
};
RankingAPI.upsertRankingData = (
  congressmanId,
  likes,
  dislikes,
  year,
  month,
  week
) => {
  return axios.post("api/v1/rankingData", {
    congressmanId: congressmanId,
    likes: likes,
    dislikes: dislikes,
    year: year,
    month: month,
    week: week,
  });
};

export default RankingAPI;
