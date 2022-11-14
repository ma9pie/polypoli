import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema(
  {
    content: String,
    date: String,
    billId: Number,
    congressmanId: Number,
  },
  { collection: "feed" }
);

export default mongoose.models.Feed || mongoose.model("Feed", FeedSchema);
