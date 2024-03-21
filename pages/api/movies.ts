import { OrmService } from "../../services/OrmService";
import { MongoConfigService } from "../../services/MongoConfigService";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

type ResponseData = {
  data?: any;
  error?: string;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         plot:
 *           type: string
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *         runtime:
 *           type: integer
 *         cast:
 *           type: array
 *           items:
 *             type: string
 *         num_mflix_comments:
 *           type: integer
 *         title:
 *           type: string
 *         fullplot:
 *           type: string
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *         released:
 *           type: string
 *           format: date-time
 *         directors:
 *           type: array
 *           items:
 *             type: string
 *         rated:
 *           type: string
 *         awards:
 *           type: object
 *           properties:
 *             wins:
 *               type: integer
 *             nominations:
 *               type: integer
 *             text:
 *               type: string
 *             lastupdated:
 *               type: string
 *             year:
 *               type: integer
 *         imdb:
 *           type: object
 *           properties:
 *             rating:
 *               type: number
 *             votes:
 *               type: integer
 *             id:
 *               type: integer
 *         countries:
 *           type: array
 *           items:
 *             type: string
 *         tomatoes:
 *           type: object
 *           properties:
 *             viewer:
 *               type: object
 *               properties:
 *                 rating:
 *                   type: number
 *                 numReviews:
 *                   type: integer
 *                 meter:
 *                   type: integer
 *                 lastUpdated:
 *                   type: string
 */
/**
 * @swagger
 * /api/movies:
 *   get:
 *      summary: Get all movies
 *      tags: [Movies]
 *      responses:
 *        200:
 *          description: Returns all movies
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Movie'
 *        500:
 *          description: Error fetching movies.
 *
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Returns the id of the new movie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Error creating movie.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const payload = req.body;

  switch (req.method) {
    // Get all movies
    case "GET":
      try {
        const movies = await OrmService.connectAndFindAll(
          MongoConfigService.collections.movies
          // { _id: new ObjectId("573a1390f29313caabcd446f" as string) }
        );
        res.status(200).json({ data: movies });
      } catch (error) {
        res.status(500).json({ error: "Error fetching movies" });
      }
      break;

    // Create a new movie
    case "POST":
      try {
        const newMovieId = await OrmService.connectAndInsertOne(
          MongoConfigService.collections.movies,
          payload
        );
        res.status(200).json({ data: { newMovieId } });
      } catch (error) {
        res.status(500).json({ error: "Error creating movie" });
      }
      break;
  }
}
