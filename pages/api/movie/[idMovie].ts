import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { OrmService } from "../../../services/OrmService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { idMovie } = req.query;
  const payload = req.body;

  switch (req.method) {
    case "GET":
      const movie = await OrmService.connectAndFindOne(
        "movies",
        idMovie as string
      );
      res.json({ status: 200, data: { movie: movie } });
      break;

    //   case "PUT":
    //     const updated = await db
    //       .collection("movies")
    //       .updateOne({ _id: new ObjectId(idMovie as string) }, { $set: payload });
    //     res.json({ status: 200, data: { updated } });
    //     break;

    //   case "DELETE":
    //     const deleted = await db
    //       .collection("movies")
    //       .deleteOne({ _id: new ObjectId(idMovie as string) });
    //     res.json({ status: 200, data: { deleted } });
    //     break;
    // }
  }
}
