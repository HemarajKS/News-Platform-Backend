import { TagService } from "../../services/tagService";
import TagModel from "../../models/tagModel";

jest.mock("../../models/tagModel");

describe("TagService", () => {
  const tagService = new TagService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all tags", async () => {
    const mockTags = [
      { _id: "1", name: "Tag 1" },
      { _id: "2", name: "Tag 2" },
    ];
    (TagModel.find as jest.Mock).mockResolvedValue(mockTags);

    const tags = await tagService.getAllTags();

    expect(tags).toEqual(mockTags);
    expect(TagModel.find).toHaveBeenCalledTimes(1);
  });

  it("should add a new tag if it does not already exist", async () => {
    const newTag = { _id: "1", name: "New Tag" };
    (TagModel.findOne as jest.Mock).mockResolvedValue(null); // No existing tag
    (TagModel.prototype.save as jest.Mock).mockResolvedValue(newTag);

    const result = await tagService.addTag("New Tag");

    expect(result).toEqual(newTag);
    expect(TagModel.findOne).toHaveBeenCalledWith({ name: "New Tag" });
    expect(TagModel.prototype.save).toHaveBeenCalledTimes(1);
  });

  it("should return null if the tag already exists", async () => {
    const existingTag = { _id: "1", name: "Existing Tag" };
    (TagModel.findOne as jest.Mock).mockResolvedValue(existingTag);

    const result = await tagService.addTag("Existing Tag");

    expect(result).toBeNull();
    expect(TagModel.findOne).toHaveBeenCalledWith({ name: "Existing Tag" });
    expect(TagModel.prototype.save).not.toHaveBeenCalled();
  });

  it("should delete a tag by ID", async () => {
    (TagModel.findByIdAndDelete as jest.Mock).mockResolvedValue({});

    const result = await tagService.deleteTag("1");

    expect(result).toBe(true);
    expect(TagModel.findByIdAndDelete).toHaveBeenCalledWith("1");
    expect(TagModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
  });

  it("should return false if delete fails (tag not found)", async () => {
    (TagModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const result = await tagService.deleteTag("1");

    expect(result).toBe(false);
    expect(TagModel.findByIdAndDelete).toHaveBeenCalledWith("1");
    expect(TagModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
  });
});
