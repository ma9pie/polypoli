import dbConnect from "@/db/dbConnect";
import Congressman from "@/db/schemas/Congressman";

export default async function handler(req, res) {
  const { query, method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const congressman = await Congressman.findOne(query);
        res.status(200).json(congressman);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
