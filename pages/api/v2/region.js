import dbConnect from "@/db/dbConnect";
import Region from "@/db/schemas/Region";

export default async function handler(req, res) {
  const { query, method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const region = await Region.find({}).lean();
        res.status(200).json(region);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
