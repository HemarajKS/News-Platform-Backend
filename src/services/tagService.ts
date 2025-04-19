import TagModel, { TagDocument } from "../models/tagModel";

export class TagService {
  public async getAllTags(): Promise<TagDocument[]> {
    return await TagModel.find();
  }

  public async addTag(tagName: string): Promise<TagDocument> {
    const newTag = new TagModel({ tagName });
    return await newTag.save();
  }

  public async deleteTag(tagId: string): Promise<boolean> {
    const result = await TagModel.findByIdAndDelete(tagId);
    return result !== null;
  }
}
