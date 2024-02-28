import clientPromise from "../../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  status: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { idMovie } = req.query;
  const payload = req.body;

  const client = await clientPromise;
  const db = client.db("sample_mflix");

  switch (req.method) {
    case "GET":
      const movies = await db
        .collection("comments")
        .find({})
        .limit(10)
        .toArray();
      res.json({ status: 200, data: movies });
      break;

    case "POST":
      const id = await db.collection("comments").insertOne(payload);
      res.json({ status: 200, data: { id } });
      break;
  }
}