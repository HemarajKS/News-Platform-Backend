import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Tag from "../../models/tagModel";

describe("Tag Model", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    // ⛏️ Ensures that unique index is created before tests run
    await Tag.syncIndexes();
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

  it("should save a valid tag", async () => {
    const tag = new Tag({ name: "JavaScript" });
    const saved = await tag.save();

    expect(saved._id).toBeDefined();
    expect(saved.name).toBe("JavaScript");
  });

  it("should trim the tag name", async () => {
    const tag = new Tag({ name: "  trimmedTag  " });
    const saved = await tag.save();
    expect(saved.name).toBe("trimmedTag");
  });

  it("should fail to save tag without name", async () => {
    const tag = new Tag({});
    await expect(tag.save()).rejects.toThrowError(/name.*required/);
  });
});
