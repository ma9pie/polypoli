import mongoose from "mongoose";

const CongressmanSchema = new mongoose.Schema(
  {
    congressman_id: Number,
    member_seq: Number,
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
    academic_background: String,
    career: String,
    profile_image: String,
  },
  { collection: "congressman" }
);

export default mongoose.models.Congressman ||
  mongoose.model("Congressman", CongressmanSchema);
