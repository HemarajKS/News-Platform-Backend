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
