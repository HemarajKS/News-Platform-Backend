import request from "supertest";
import express from "express";
import AuthorController from "../../controllers/authorController";
import { AuthorService } from "../../services/authorService";

jest.mock("../../services/authorService");

const app = express();
app.use(express.json());

const authorController = new AuthorController();
app.get("/api/authors", authorController.getAuthors);
app.get("/api/authors/:id", authorController.getAuthorById);
app.post("/api/authors", authorController.createAuthor);
app.put("/api/authors/:id", authorController.updateAuthor);
app.delete("/api/authors/:id", authorController.deleteAuthor);

describe("AuthorController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/authors", () => {
    it("should return all authors", async () => {
      const mockAuthors = [
        { _id: "1", authorName: "Author 1", description: "Description 1" },
        { _id: "2", authorName: "Author 2", description: "Description 2" },
      ];
      (AuthorService.prototype.getAllAuthors as jest.Mock).mockResolvedValue(
        mockAuthors
      );

      const response = await request(app).get("/api/authors");

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(1);
      expect(response.body.data).toEqual(mockAuthors);
    });

    it("should handle errors", async () => {
      (AuthorService.prototype.getAllAuthors as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).get("/api/authors");

      expect(response.status).toBe(500);
      expect(response.body.status).toBe(0);
      expect(response.body.message).toBe("failed");
    });
  });

  describe("GET /api/authors/:id", () => {
    it("should return an author by ID", async () => {
      const mockAuthor = {
        _id: "1",
        authorName: "Author 1",
        description: "Description 1",
      };
      (AuthorService.prototype.getAuthorById as jest.Mock).mockResolvedValue(
        mockAuthor
      );

      const response = await request(app).get("/api/authors/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAuthor);
    });

    it("should return 404 if author not found", async () => {
      (AuthorService.prototype.getAuthorById as jest.Mock).mockResolvedValue(
        null
      );

      const response = await request(app).get("/api/authors/1");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Author not found");
    });

    it("should handle errors", async () => {
      (AuthorService.prototype.getAuthorById as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).get("/api/authors/1");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Error fetching author");
    });
  });

  describe("POST /api/authors", () => {
    it("should create a new author", async () => {
      const newAuthor = {
        authorName: "New Author",
        description: "New Description",
      };
      (AuthorService.prototype.createAuthor as jest.Mock).mockResolvedValue(
        newAuthor
      );

      const response = await request(app).post("/api/authors").send(newAuthor);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newAuthor);
    });

    it("should handle errors", async () => {
      (AuthorService.prototype.createAuthor as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app)
        .post("/api/authors")
        .send({ authorName: "New Author" });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Error creating author");
    });
  });

  describe("PUT /api/authors/:id", () => {
    it("should update an author", async () => {
      const updatedAuthor = {
        authorName: "Updated Author",
        description: "Updated Description",
      };
      (AuthorService.prototype.updateAuthor as jest.Mock).mockResolvedValue(
        updatedAuthor
      );

      const response = await request(app)
        .put("/api/authors/1")
        .send(updatedAuthor);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedAuthor);
    });

    it("should return 404 if author not found", async () => {
      (AuthorService.prototype.updateAuthor as jest.Mock).mockResolvedValue(
        null
      );

      const response = await request(app)
        .put("/api/authors/1")
        .send({ authorName: "Updated Author" });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Author not found");
    });

    it("should handle errors", async () => {
      (AuthorService.prototype.updateAuthor as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app)
        .put("/api/authors/1")
        .send({ authorName: "Updated Author" });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Error updating author");
    });
  });

  describe("DELETE /api/authors/:id", () => {
    it("should delete an author", async () => {
      (AuthorService.prototype.deleteAuthor as jest.Mock).mockResolvedValue(
        true
      );

      const response = await request(app).delete("/api/authors/1");

      expect(response.status).toBe(204);
    });

    it("should return 404 if author not found", async () => {
      (AuthorService.prototype.deleteAuthor as jest.Mock).mockResolvedValue(
        false
      );

      const response = await request(app).delete("/api/authors/1");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Author not found");
    });

    it("should handle errors", async () => {
      (AuthorService.prototype.deleteAuthor as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).delete("/api/authors/1");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Error deleting author");
    });
  });
});
