import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  status: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const movies = await db.collection("movies").find({}).limit(10).toArray();
  // res.json({ status: 200, data: movies });
  // res.status(200).json({ data: "Hello from Next.js!" });

  switch (req.method) {
    case "POST":
      res.json({ status: 200, data: "Post method" });
      break;
    case "GET":
      res.json({ status: 200, data: "Get method" });
      break;
  }
}
