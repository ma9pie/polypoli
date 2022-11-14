import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: String,
    userPassword: String,
    userPhoneNumber: String,
    userArea: String,
    userRegion: String,
    regionCongressmanId: Number,
    userStamp: Number,
    userName: String,
    userGender: String,
    userYearOfBirth: Number,
    userImg: Number,
    userFollowings: String,
  },
  { collection: "user" }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
