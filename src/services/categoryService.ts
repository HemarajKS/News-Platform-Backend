import CategoryModel, { CategoryDocument } from "../models/categoryModel";

export class CategoryService {
  public async getAllCategories(): Promise<CategoryDocument[]> {
    return await CategoryModel.find();
  }

  public async getCategoryById(
    categoryId: string
  ): Promise<CategoryDocument | null> {
    return await CategoryModel.findById(categoryId);
  }

  public async addCategory(
    categoryData: Partial<CategoryDocument>
  ): Promise<CategoryDocument> {
    const newCategory = new CategoryModel(categoryData);
    return await newCategory.save();
  }

  public async updateCategory(
    categoryId: string,
    updatedCategory: Partial<CategoryDocument>
  ): Promise<CategoryDocument | null> {
    return await CategoryModel.findByIdAndUpdate(categoryId, updatedCategory, {
      new: true,
    });
  }

  public async deleteCategory(categoryId: string): Promise<boolean> {
    const result = await CategoryModel.findByIdAndDelete(categoryId);
    return result !== null;
  }
}
