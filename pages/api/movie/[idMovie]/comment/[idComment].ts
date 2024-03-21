import type { NextApiRequest, NextApiResponse } from "next";
import { OrmService } from "@/services/OrmService";
import { MongoConfigService } from "@/services/MongoConfigService";

type ResponseData = {
  data?: any;
  error?: string;
};

/**
 * @swagger
 * /api/movie/{idMovie}/comment/{idComment}:
 *   get:
 *     summary: Retrieve a comment for a movie
 *     tags: [Comments]
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the movie
 *       - name: idComment
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the comment
 *     responses:
 *       200:
 *         description: Returns a comment for a movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: An error occurred while fetching the comment
 *
 *   put:
 *     summary: Update a comment for a movie
 *     tags: [Comments]
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the movie
 *       - name: idComment
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Returns the count of modified comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modifiedCount:
 *                   type: integer
 *       404:
 *         description: Comment not found
 *       500:
 *         description: An error occurred while updating the movie
 *
 *   delete:
 *     summary: Delete a comment for a movie
 *     tags: [Comments]
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the movie
 *       - name: idComment
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the comment
 *     responses:
 *       200:
 *         description: Returns the count of deleted comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: integer
 *       404:
 *         description: Comment not found
 *       500:
 *         description: An error occurred while deleting the comment
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { idMovie, idComment } = req.query;
  const payload = req.body;

  switch (req.method) {
    // Get one comment for a movie
    case "GET":
      try {
        const comment = await OrmService.connectAndFindOne(
          MongoConfigService.collections.comments,
          idComment as string,
          "movie_id",
          idMovie as string
        );
        if (!comment) {
          return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json({ data: comment });
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while fetching the comment" });
      }
      break;

    // Update a comment for a movie
    case "PUT":
      try {
        const modifiedCount = await OrmService.connectAndUpdateOne(
          MongoConfigService.collections.comments,
          idComment as string,
          payload,
          "movie_id",
          idMovie as string
        );
        if (modifiedCount === 0) {
          return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json({ data: { modifiedCount } });
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while updating the comment" });
      }
      break;

    // Delete a comment for a movie
    case "DELETE":
      try {
        const deletedCount = await OrmService.connectAndDeleteOne(
          MongoConfigService.collections.comments,
          idComment as string,
          "movie_id",
          idMovie as string
        );
        if (deletedCount === 0) {
          return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json({ data: { deletedCount } });
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while deleting the comment" });
      }
      break;
  }
}
