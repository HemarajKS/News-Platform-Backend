import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
    this.getCategories = this.getCategories.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  public async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json({ status: 1, message: "success", data: categories });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  public async addCategory(req: Request, res: Response): Promise<void> {
    try {
      const newCategory = await this.categoryService.addCategory(req.body);
      res.status(201).json({
        status: 1,
        message: "Category added successfully",
        data: newCategory,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  public async editCategory(req: Request, res: Response): Promise<void> {
    try {
      const updatedCategory = await this.categoryService.updateCategory(
        req.params.id,
        req.body
      );
      res.status(200).json({
        status: 1,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  public async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      await this.categoryService.deleteCategory(req.params.id);
      res.status(200).json({
        status: 1,
        message: "Category deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }
}

export default CategoryController;
