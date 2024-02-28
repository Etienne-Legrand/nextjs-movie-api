import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { idMovie, idComment } = req.query;
  const payload = req.body;

  const client = await clientPromise;
  const db = client.db("sample_mflix");

  switch (req.method) {
    case "GET":
      const dbComment = await db.collection("comments").findOne({
        _id: new ObjectId(idComment as string),
        movie_id: new ObjectId(idMovie as string),
      });
      res.status(200).json({ data: { comment: dbComment } });
      break;

    case "PUT":
      const updated = await db
        .collection("comments")
        .updateOne(
          { _id: new ObjectId(idComment as string) },
          { $set: payload }
        );
      res.status(200).json({ data: { updated } });
      break;

    case "DELETE":
      const deleted = await db
        .collection("comments")
        .deleteOne({ _id: new ObjectId(idComment as string) });
      res.status(200).json({ data: { deleted } });
      break;
  }
}
