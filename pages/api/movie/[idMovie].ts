import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { idMovie } = req.query;
  const payload = req.body;

  const client = await clientPromise;
  const db = client.db("sample_mflix");

  switch (req.method) {
    case "GET":
      const dbMovie = await db
        .collection("movies")
        .findOne({ _id: new ObjectId(idMovie as string) });
      res.json({ status: 200, data: { movie: dbMovie } });
      break;
    case "PUT":
      const updated = await db
        .collection("movies")
        .updateOne({ _id: new ObjectId(idMovie as string) }, { $set: payload });
      res.json({ status: 200, data: { updated } });
      break;
    case "DELETE":
      const deleted = await db
        .collection("movies")
        .deleteOne({ _id: new ObjectId(idMovie as string) });
      res.json({ status: 200, data: { deleted } });
      break;
  }
}
