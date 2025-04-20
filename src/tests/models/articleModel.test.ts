import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Article from "../../models/articleModel";

describe("Article Model", () => {
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
    if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
  });

  it("should save a valid TEXT article", async () => {
    const article = new Article({
      title: "Test Article",
      subtitle: "Subtitle here",
      hero: "https://example.com/hero.jpg",
      articleType: "TEXT",
      description: "<p>This is an HTML description.</p>",
      published: new Date(),
      category: new mongoose.Types.ObjectId(),
      tags: ["news", "tech"],
      author: new mongoose.Types.ObjectId(),
    });

    const savedArticle = await article.save();

    expect(savedArticle._id).toBeDefined();
    expect(savedArticle.title).toBe("Test Article");
  });

  it("should require mediaUrl for AUDIO articles", async () => {
    const article = new Article({
      title: "Audio Article",
      subtitle: "Subtitle",
      hero: "https://example.com/hero.jpg",
      articleType: "AUDIO",
      description: "<div>Audio content</div>",
      published: new Date(),
      category: new mongoose.Types.ObjectId(),
      tags: ["audio"],
      author: new mongoose.Types.ObjectId(),
    });

    await expect(article.save()).rejects.toThrowError(/`mediaUrl` is required/);
  });

  it("should reject invalid HTML in description", async () => {
    const article = new Article({
      title: "Invalid HTML",
      subtitle: "Subtitle",
      hero: "https://example.com/hero.jpg",
      articleType: "TEXT",
      description: "Just plain text", // invalid
      published: new Date(),
      category: new mongoose.Types.ObjectId(),
      tags: ["plain"],
      author: new mongoose.Types.ObjectId(),
    });

    await expect(article.save()).rejects.toThrowError(
      /Description must be a valid HTML string/
    );
  });

  it("should reject invalid mediaUrl format", async () => {
    const article = new Article({
      title: "Invalid Media URL",
      subtitle: "Subtitle",
      hero: "https://example.com/hero.jpg",
      articleType: "VIDEO",
      description: "<div>Video Content</div>",
      mediaUrl: "not-a-valid-url",
      published: new Date(),
      category: new mongoose.Types.ObjectId(),
      tags: ["video"],
      author: new mongoose.Types.ObjectId(),
    });

    await expect(article.save()).rejects.toThrowError(
      /Media URL must be a valid URL/
    );
  });

  it("should save a valid VIDEO article with mediaUrl", async () => {
    const article = new Article({
      title: "Video Article",
      subtitle: "Subtitle",
      hero: "https://example.com/hero.jpg",
      articleType: "VIDEO",
      description: "<section>Video HTML</section>",
      mediaUrl: "https://example.com/video.mp4",
      category: new mongoose.Types.ObjectId(),
      tags: ["video"],
      author: new mongoose.Types.ObjectId(),
    });

    const saved = await article.save();
    expect(saved._id).toBeDefined();
    expect(saved.mediaUrl).toBe("https://example.com/video.mp4");
  });
});
