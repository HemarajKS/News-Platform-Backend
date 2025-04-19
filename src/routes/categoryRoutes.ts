import { Router } from "express";
import CategoryController from "../controllers/categoryController";

const router = Router();
const categoryController = new CategoryController();

router.get("/", categoryController.getCategories);
router.post("/", categoryController.addCategory);
router.put("/:id", categoryController.editCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
