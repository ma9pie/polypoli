import axios from "./index.js";

let FeedUserMappingAPI = {};

FeedUserMappingAPI.upsertFeedLike = (feed_id, user_id, like) => {
  return axios.post("api/v1/feedUserMapping", {
    feedId: feed_id,
    userId: user_id,
    like: like,
  });
};

export default FeedUserMappingAPI;
