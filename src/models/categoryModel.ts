/**
 * Represents the structure of a Category document in the database.
 * 
 * @interface CategoryDocument
 * @property {string} categoryId - The unique identifier for the category.
 * @property {string} categoryName - The name of the category.
 */

/**
 * Mongoose schema for the Category model.
 * Defines the structure of the Category collection in the database.
 * 
 * @constant
 * @type {Schema<CategoryDocument>}
 */

/**
 * Mongoose model for the Category collection.
 * Provides an interface for interacting with the Category documents in the database.
 * 
 * @constant
 * @type {Model<CategoryDocument>}
 */
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
