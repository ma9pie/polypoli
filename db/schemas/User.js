import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
  },
  { collection: "user" }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
