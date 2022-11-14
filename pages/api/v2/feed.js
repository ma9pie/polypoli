import dbConnect from "@/db/dbConnect";
import Congressman from "@/db/schemas/Congressman";
import Feed from "@/db/schemas/Feed";

export default async function handler(req, res) {
  const { query, method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const feed = await Feed.find(query).lean();

        for (let i = 0; i < feed.length; i++) {
          const congressman = await Congressman.findOne({
            congressmanId: feed[i].congressmanId,
          });

          feed[i].congressman = congressman;
        }

        res.status(200).json(feed);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
