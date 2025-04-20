/**
 * Express router for handling tag-related routes.
 *
 * Routes:
 * - `GET /` - Retrieves a list of tags.
 * - `POST /` - Adds a new tag.
 * - `DELETE /:id` - Deletes a tag by its ID.
 *
 * @module tagRoutes
 * @requires express.Router
 * @requires ../controllers/tagController
 */
import { Router } from "express";
import TagController from "../controllers/tagController";

const router = Router();
const tagController = new TagController();

router.get("/", tagController.getTags.bind(tagController));
router.post("/", tagController.addTag.bind(tagController));
router.delete("/:id", tagController.deleteTag.bind(tagController));

export default router;
