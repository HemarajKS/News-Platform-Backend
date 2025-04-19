import { Schema, model } from "mongoose";
export interface CategoryDocument {
  categoryId: string;
  categoryName: string;
}
const categorySchema: Schema<CategoryDocument> = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

const Category = model("Category", categorySchema);

export default Category;
