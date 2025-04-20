/**
 * Express router for handling category-related routes.
 * 
 * Routes:
 * - `GET /` - Retrieves a list of all categories.
 * - `POST /` - Adds a new category.
 * - `PUT /:id` - Updates an existing category by its ID.
 * - `DELETE /:id` - Deletes a category by its ID.
 * 
 * @module categoryRoutes
 */
import { Router } from "express";
import CategoryController from "../controllers/categoryController";

const router = Router();
const categoryController = new CategoryController();

router.get("/", categoryController.getCategories);
router.post("/", categoryController.addCategory);
router.put("/:id", categoryController.editCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
