import mongoose from "mongoose";

const RegionSchema = new mongoose.Schema(
  {
    code: Number,
    city: String,
    town: String,
    townShip: String,
    electoralDistrict: String,
  },
  { collection: "region" }
);

export default mongoose.models.Region || mongoose.model("Region", RegionSchema);
