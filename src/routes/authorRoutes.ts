/**
 * Express router for handling author-related routes.
 *
 * Routes:
 * - `GET /` - Retrieves a list of all authors.
 * - `GET /:id` - Retrieves a specific author by their ID.
 * - `POST /` - Creates a new author.
 * - `PUT /:id` - Updates an existing author by their ID.
 * - `DELETE /:id` - Deletes an author by their ID.
 *
 * @module AuthorRoutes
 */
import { Router } from "express";
import AuthorController from "../controllers/authorController";

const router = Router();
const authorController = new AuthorController();

router.get("/", authorController.getAuthors);
router.get("/:id", authorController.getAuthorById);
router.post("/", authorController.createAuthor);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);

export default router;
