import { Request, Response } from "express";
import { TagService } from "../services/tagService";

class TagController {
  private tagService: TagService;

  constructor() {
    this.tagService = new TagService();
  }

  public async getTags(req: Request, res: Response): Promise<void> {
    try {
      const tags = await this.tagService.getAllTags();
      res.status(200).json({ status: 1, message: "success", data: tags });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  public async addTag(req: Request, res: Response): Promise<void> {
    try {
      const { tagName } = req.body;
      const newTag = await this.tagService.addTag(tagName);
      res
        .status(201)
        .json({ status: 1, message: "Tag added successfully", data: newTag });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  public async deleteTag(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.tagService.deleteTag(id);
      if (deleted) {
        res
          .status(200)
          .json({ status: 1, message: "Tag deleted successfully" });
      } else {
        res.status(404).json({ status: 0, message: "Tag not found" });
      }
    } catch (error) {
      res.status(500).json({
        status: 0,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }
}

export default TagController;
