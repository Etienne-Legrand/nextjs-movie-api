import { OrmService } from "../../services/OrmService";
import { MongoConfigService } from "../../services/MongoConfigService";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const payload = req.body;

  switch (req.method) {
    case "GET":
      const movies = await OrmService.connectAndFind(
        MongoConfigService.collections.movies,
        { _id: "573a1390f29313caabcd446f" }
      );
      res.status(200).json({ data: movies });
      break;
    case "POST":
      const newMovieId = await OrmService.connectAndInsertOne(
        MongoConfigService.collections.movies,
        payload
      );
      res.status(200).json({ data: { newMovieId } });
      break;
  }
}
