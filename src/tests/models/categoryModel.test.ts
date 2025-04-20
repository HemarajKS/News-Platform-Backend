import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Category from "../../models/categoryModel";

describe("Category Model", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    await Category.syncIndexes();
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

  it("should save a valid category", async () => {
    const category = new Category({
      categoryName: "Technology",
    });

    const saved = await category.save();
    expect(saved._id).toBeDefined();
    expect(saved.categoryName).toBe("Technology");
  });

  it("should fail to save category without categoryName", async () => {
    const category = new Category({});
    await expect(category.save()).rejects.toThrowError(
      /categoryName.*required/
    );
  });
});
