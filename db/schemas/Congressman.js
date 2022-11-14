import mongoose from "mongoose";

const CongressmanSchema = new mongoose.Schema(
  {
    congressmanId: Number,
    memberSeq: Number,
    name: String,
    hjNm: String,
    party: String,
    region: String,
    committee: String,
    win: String,
    age: Number,
    gender: String,
    tel: String,
    email: String,
    academicBackground: String,
    career: String,
    profileImage: String,
  },
  { collection: "congressman" }
);

export default mongoose.models.Congressman ||
  mongoose.model("Congressman", CongressmanSchema);
