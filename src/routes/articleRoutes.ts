/**
 * Express router for handling article-related routes.
 *
 * Routes:
 * - `GET /` - Retrieves all articles.
 * - `GET /filter` - Filters articles based on query parameters.
 * - `POST /create` - Creates a new article.
 * - `PUT /edit/:id` - Updates an existing article by its ID.
 * - `DELETE /delete/:id` - Deletes an article by its ID.
 * - `GET /:id` - Retrieves a specific article by its ID.
 *
 * Controller:
 * - Uses `ArticleController` to handle the logic for each route.
 *
 * @module ArticleRoutes
 */
import { Router } from "express";
import ArticleController from "../controllers/articleController";

const router = Router();
const articleController = new ArticleController();

router.get("/", articleController.getAllArticles);
router.get("/filter", articleController.filterArticles);
router.post("/create", articleController.createArticle);
router.put("/edit/:id", articleController.updateArticle);
router.delete("/delete/:id", articleController.deleteArticle);
router.get("/:id", articleController.getArticleById);

export default router;
