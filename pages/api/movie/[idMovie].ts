import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { OrmService } from "@/services/OrmService";
import { MongoConfigService } from "@/services/MongoConfigService";

type ResponseData = {
  data?: any;
  error?: string;
};

/**
 * @swagger
 * /api/movie/{id}:
 *   get:
 *     summary: Retrieve a movie
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the movie
 *     responses:
 *       200:
 *         description: Returns a movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 *       500:
 *         description: An error occurred while fetching the movie
 *
 *   put:
 *     summary: Update a movie
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Returns the count of modified movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modifiedCount:
 *                   type: integer
 *       404:
 *         description: Movie not found
 *       500:
 *         description: An error occurred while updating the movie
 *
 *   delete:
 *     summary: Delete a movie
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the movie
 *     responses:
 *       200:
 *         description: Returns the count of deleted movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: integer
 *       404:
 *         description: Movie not found
 *       500:
 *         description: An error occurred while deleting the movie
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { idMovie } = req.query;
  const payload = req.body;

  switch (req.method) {
    // Get one movie
    case "GET":
      try {
        const movie = await OrmService.connectAndFindOne(
          MongoConfigService.collections.movies,
          idMovie as string
        );
        if (!movie) {
          return res.status(404).json({ error: "Movie not found" });
        }
        res.status(200).json({ data: movie });
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while fetching the movie" });
      }
      break;

    // Update a movie
    case "PUT":
      try {
        const modifiedCount = await OrmService.connectAndUpdateOne(
          MongoConfigService.collections.movies,
          idMovie as string,
          payload
        );
        if (modifiedCount === 0) {
          return res.status(404).json({ error: "Movie not found" });
        }
        res.status(200).json({ data: { modifiedCount } });
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while updating the movie" });
      }
      break;

    // Delete a movie
    case "DELETE":
      try {
        const deletedCount = await OrmService.connectAndDeleteOne(
          MongoConfigService.collections.movies,
          idMovie as string
        );
        if (deletedCount === 0) {
          return res.status(404).json({ error: "Movie not found" });
        }
        res.status(200).json({ data: { deletedCount } });
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while deleting the movie" });
      }
      break;
  }
}
