import request from "supertest";
import express from "express";
import CategoryController from "../../controllers/categoryController";
import { CategoryService } from "../../services/categoryService";

jest.mock("../../services/categoryService");

const app = express();
app.use(express.json());

const categoryController = new CategoryController();
app.get("/api/categories", categoryController.getCategories);
app.post("/api/categories", categoryController.addCategory);
app.put("/api/categories/:id", categoryController.editCategory);
app.delete("/api/categories/:id", categoryController.deleteCategory);

describe("CategoryController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/categories", () => {
    it("should return all categories", async () => {
      const mockCategories = [
        { _id: "1", categoryName: "Category 1" },
        { _id: "2", categoryName: "Category 2" },
      ];
      (
        CategoryService.prototype.getAllCategories as jest.Mock
      ).mockResolvedValue(mockCategories);

      const response = await request(app).get("/api/categories");

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(1);
      expect(response.body.data).toEqual(mockCategories);
    });

    it("should handle errors", async () => {
      (
        CategoryService.prototype.getAllCategories as jest.Mock
      ).mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/categories");

      expect(response.status).toBe(500);
      expect(response.body.status).toBe(0);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("POST /api/categories", () => {
    it("should add a new category", async () => {
      const newCategory = { categoryName: "New Category" };
      (CategoryService.prototype.addCategory as jest.Mock).mockResolvedValue(
        newCategory
      );

      const response = await request(app)
        .post("/api/categories")
        .send(newCategory);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe(1);
      expect(response.body.message).toBe("Category added successfully");
      expect(response.body.data).toEqual(newCategory);
    });

    it("should handle errors", async () => {
      (CategoryService.prototype.addCategory as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app)
        .post("/api/categories")
        .send({ categoryName: "New Category" });

      expect(response.status).toBe(500);
      expect(response.body.status).toBe(0);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("PUT /api/categories/:id", () => {
    it("should update a category", async () => {
      const updatedCategory = { categoryName: "Updated Category" };
      (CategoryService.prototype.updateCategory as jest.Mock).mockResolvedValue(
        updatedCategory
      );

      const response = await request(app)
        .put("/api/categories/1")
        .send(updatedCategory);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(1);
      expect(response.body.message).toBe("Category updated successfully");
      expect(response.body.data).toEqual(updatedCategory);
    });

    it("should handle errors", async () => {
      (CategoryService.prototype.updateCategory as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app)
        .put("/api/categories/1")
        .send({ categoryName: "Updated Category" });

      expect(response.status).toBe(500);
      expect(response.body.status).toBe(0);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("DELETE /api/categories/:id", () => {
    it("should delete a category", async () => {
      (CategoryService.prototype.deleteCategory as jest.Mock).mockResolvedValue(
        true
      );

      const response = await request(app).delete("/api/categories/1");

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(1);
      expect(response.body.message).toBe("Category deleted successfully");
    });

    it("should handle errors", async () => {
      (CategoryService.prototype.deleteCategory as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).delete("/api/categories/1");

      expect(response.status).toBe(500);
      expect(response.body.status).toBe(0);
      expect(response.body.message).toBe("Database error");
    });
  });
});
