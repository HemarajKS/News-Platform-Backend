import request from "supertest";
import express from "express";
import ArticleController from "../../controllers/articleController";
import { ArticleService } from "../../services/articleService";

jest.mock("../../services/articleService");

const app = express();
app.use(express.json());

const articleController = new ArticleController();
app.get("/api/articles", articleController.getAllArticles);
app.get("/api/articles/:id", articleController.getArticleById);
app.post("/api/articles", articleController.createArticle);
app.put("/api/articles/:id", articleController.updateArticle);
app.delete("/api/articles/:id", articleController.deleteArticle);

describe("ArticleController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/articles", () => {
    it("should return all articles", async () => {
      const mockArticles = [
        { title: "Article 1", description: "Description 1" },
        { title: "Article 2", description: "Description 2" },
      ];
      (ArticleService.prototype.getAllArticles as jest.Mock).mockResolvedValue(
        mockArticles
      );

      const response = await request(app).get("/api/articles");

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(1);
      expect(response.body.data).toEqual(mockArticles);
    });

    it("should handle errors", async () => {
      (ArticleService.prototype.getAllArticles as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).get("/api/articles");

      expect(response.status).toBe(500);
      expect(response.body.status).toBe(0);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("GET /api/articles/:id", () => {
    it("should return an article by ID", async () => {
      const mockArticle = { title: "Article 1", description: "Description 1" };
      (ArticleService.prototype.getArticleById as jest.Mock).mockResolvedValue(
        mockArticle
      );

      const response = await request(app).get("/api/articles/123");

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(1);
      expect(response.body.data).toEqual(mockArticle);
    });

    it("should return 404 if article not found", async () => {
      (ArticleService.prototype.getArticleById as jest.Mock).mockResolvedValue(
        null
      );

      const response = await request(app).get("/api/articles/123");

      expect(response.status).toBe(404);
      expect(response.body.status).toBe(0);
      expect(response.body.message).toBe("Article not found");
    });

    it("should handle errors", async () => {
      (ArticleService.prototype.getArticleById as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).get("/api/articles/123");

      expect(response.status).toBe(500);
      expect(response.body.status).toBe(0);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("POST /api/articles", () => {
    it("should create a new article", async () => {
      const newArticle = {
        title: "New Article",
        description: "New Description",
      };
      (ArticleService.prototype.createArticle as jest.Mock).mockResolvedValue(
        newArticle
      );

      const response = await request(app)
        .post("/api/articles")
        .send(newArticle);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe(1);
      expect(response.body.message).toBe("Article created");
      expect(response.body.data).toEqual(newArticle);
    });

    it("should handle errors", async () => {
      (ArticleService.prototype.createArticle as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app)
        .post("/api/articles")
        .send({ title: "New Article" });

      expect(response.status).toBe(500);
      expect(response.body.status).toBe(0);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("PUT /api/articles/:id", () => {
    it("should update an article", async () => {
      (ArticleService.prototype.updateArticle as jest.Mock).mockResolvedValue(
        true
      );

      const response = await request(app)
        .put("/api/articles/123")
        .send({ title: "Updated Article" });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(1);
      expect(response.body.message).toBe("Article updated");
    });

    it("should return 404 if article not found", async () => {
      (ArticleService.prototype.updateArticle as jest.Mock).mockResolvedValue(
        false
      );

      const response = await request(app)
        .put("/api/articles/123")
        .send({ title: "Updated Article" });

      expect(response.status).toBe(404);
      expect(response.body.status).toBe(0);
      expect(response.body.message).toBe("Article not found");
    });

    it("should handle errors", async () => {
      (ArticleService.prototype.updateArticle as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app)
        .put("/api/articles/123")
        .send({ title: "Updated Article" });

      expect(response.status).toBe(500);
      expect(response.body.status).toBe(0);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("DELETE /api/articles/:id", () => {
    it("should delete an article", async () => {
      (ArticleService.prototype.deleteArticle as jest.Mock).mockResolvedValue(
        true
      );

      const response = await request(app).delete("/api/articles/123");

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(1);
      expect(response.body.message).toBe("Article deleted");
    });

    it("should return 404 if article not found", async () => {
      (ArticleService.prototype.deleteArticle as jest.Mock).mockResolvedValue(
        false
      );

      const response = await request(app).delete("/api/articles/123");

      expect(response.status).toBe(404);
      expect(response.body.status).toBe(0);
      expect(response.body.message).toBe("Article not found");
    });

    it("should handle errors", async () => {
      (ArticleService.prototype.deleteArticle as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).delete("/api/articles/123");

      expect(response.status).toBe(500);
      expect(response.body.status).toBe(0);
      expect(response.body.message).toBe("Database error");
    });
  });
});
