import { Router } from "express";
import TagController from "../controllers/tagController";

const router = Router();
const tagController = new TagController();

router.get("/", tagController.getTags.bind(tagController));
router.post("/", tagController.addTag.bind(tagController));
router.delete("/:id", tagController.deleteTag.bind(tagController));

export default router;
