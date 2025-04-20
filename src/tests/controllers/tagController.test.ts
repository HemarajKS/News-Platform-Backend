import request from "supertest";
import express from "express";
import TagController from "../../controllers/tagController";
import { TagService } from "../../services/tagService";

// Mock TagService methods
jest.mock("../../services/tagService");

describe("TagController", () => {
  let app: express.Application;
  let tagController: TagController;

  beforeAll(() => {
    app = express();
    app.use(express.json()); // To parse JSON request body
    tagController = new TagController();
    app.get("/tags", (req, res) => tagController.getTags(req, res));
    app.post("/tags", (req, res) => tagController.addTag(req, res));
    app.delete("/tags/:id", (req, res) => tagController.deleteTag(req, res));
  });

  it("should return all tags on GET /tags", async () => {
    // Mock the getAllTags method
    const mockTags = [{ name: "JavaScript" }, { name: "React" }];
    (TagService.prototype.getAllTags as jest.Mock).mockResolvedValue(mockTags);

    const response = await request(app).get("/tags");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(1);
    expect(response.body.message).toBe("success");
    expect(response.body.data).toEqual(mockTags);
  });

  it("should add a new tag on POST /tags", async () => {
    const newTag = { name: "Node.js" };

    // Mock the addTag method to return the tag
    (TagService.prototype.addTag as jest.Mock).mockResolvedValue(newTag);

    const response = await request(app).post("/tags").send(newTag);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(1);
    expect(response.body.message).toBe("Tag added successfully");
    expect(response.body.data).toEqual(newTag);
  });

  it("should do nothing if tag already exists on POST /tags", async () => {
    const duplicateTag = { name: "React" };

    // Mock addTag to return null (simulate duplicate check)
    (TagService.prototype.addTag as jest.Mock).mockResolvedValue(null);

    const response = await request(app).post("/tags").send(duplicateTag);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(1);
    expect(response.body.message).toBe("Tag added successfully");
    expect(response.body.data).toBeNull();
  });

  it("should return 404 when trying to delete a non-existent tag", async () => {
    const nonExistentTagId = "60f7b0f8f77b350017c274cc";

    // Mock deleteTag to return false (simulate tag not found)
    (TagService.prototype.deleteTag as jest.Mock).mockResolvedValue(false);

    const response = await request(app).delete(`/tags/${nonExistentTagId}`);

    expect(response.status).toBe(404);
    expect(response.body.status).toBe(0);
    expect(response.body.message).toBe("Tag not found");
  });

  it("should delete a tag successfully", async () => {
    const tagId = "60f7b0f8f77b350017c274cc";

    // Mock deleteTag to return true (simulate successful deletion)
    (TagService.prototype.deleteTag as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete(`/tags/${tagId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(1);
    expect(response.body.message).toBe("Tag deleted successfully");
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });
});
