import TagModel, { TagDocument } from "../models/tagModel";

export class TagService {
  public async getAllTags(): Promise<TagDocument[]> {
    return await TagModel.find();
  }

  public async addTag(tagName: string): Promise<TagDocument | null> {
    const existingTag = await TagModel.findOne({ name: tagName });
    if (existingTag) {
      return null; // Return null if the tag already exists
    }
    const newTag = new TagModel({ name: tagName });
    return await newTag.save();
  }

  public async deleteTag(tagId: string): Promise<boolean> {
    const result = await TagModel.findByIdAndDelete(tagId);
    return result !== null;
  }
}
