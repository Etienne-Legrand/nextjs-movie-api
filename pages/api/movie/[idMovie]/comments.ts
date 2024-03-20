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
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - movie_id
 *         - text
 *         - date
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         name:
 *           type: string
 *           description: The name of the person who made the comment
 *         email:
 *           type: string
 *           description: The email of the person who made the comment
 *         movie_id:
 *           type: string
 *           description: The id of the movie to which the comment is related
 *         text:
 *           type: string
 *           description: The text of the comment
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the comment was made
 */
/**
 * @swagger
 * /api/movie/{idMovie}/comments:
 *   get:
 *      summary: Get all comments for a movie
 *      parameters:
 *       - name: idMovie
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the movie to retrieve comments
 *      responses:
 *        200:
 *          description: Returns all comments for a movie
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Comment'
 *        500:
 *          description: Error fetching comments.
 *
 *   post:
 *     summary: Create a new comment for a movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Returns the id of the new comment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Error creating comment.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { idMovie } = req.query;
  const payload = req.body;

  switch (req.method) {
    // Get all comments
    case "GET":
      try {
        const comments = await OrmService.connectAndFindAllById(
          MongoConfigService.collections.comments,
          "movie_id",
          idMovie as string
        );
        res.status(200).json({ data: comments });
      } catch (error) {
        res.status(500).json({ error: "Error fetching comments" });
      }
      break;

    // Create a new comment
    case "POST":
      try {
        const newCommentId = await OrmService.connectAndInsertOne(
          MongoConfigService.collections.comments,
          payload
        );
        res.status(200).json({ data: { newCommentId } });
      } catch (error) {
        res.status(500).json({ error: "Error creating comment" });
      }
      break;
  }
}
