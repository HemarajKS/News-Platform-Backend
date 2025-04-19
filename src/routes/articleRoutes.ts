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
