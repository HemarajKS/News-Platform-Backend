import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Author from "../../models/authorModel"; // Adjust the path if needed

describe("Author Model", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
  });

  it("should save a valid author with default values", async () => {
    const author = new Author({
      authorName: "Jane Doe",
    });

    const savedAuthor = await author.save();

    expect(savedAuthor._id).toBeDefined();
    expect(savedAuthor.authorName).toBe("Jane Doe");
    expect(savedAuthor.authorImage).toBe(
      "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
    );
    expect(savedAuthor.description).toBe("");
  });

  it("should save a valid author with custom image and description", async () => {
    const author = new Author({
      authorName: "John Smith",
      authorImage: "https://example.com/avatar.jpg",
      description: "Tech writer and editor.",
    });

    const savedAuthor = await author.save();

    expect(savedAuthor.authorName).toBe("John Smith");
    expect(savedAuthor.authorImage).toBe("https://example.com/avatar.jpg");
    expect(savedAuthor.description).toBe("Tech writer and editor.");
  });

  it("should fail to save without required authorName", async () => {
    const author = new Author({});

    await expect(author.save()).rejects.toThrowError(/authorName.*required/);
  });
});
