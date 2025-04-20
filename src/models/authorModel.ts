/**
 * Represents the schema and model for an Author in the database.
 * 
 * This schema defines the structure of the Author document, including
 * required and optional fields, as well as default values for certain fields.
 * 
 * @interface AuthorDocument
 * @extends Document
 * 
 * @property {string} authorId - The unique identifier for the author.
 * @property {string} authorName - The name of the author. This field is required.
 * @property {string} [authorImage] - The URL of the author's image. Defaults to a placeholder image if not provided.
 * @property {string} [description] - A brief description of the author. Defaults to an empty string if not provided.
 * 
 * @constant {Schema<AuthorDocument>} authorSchema - The Mongoose schema for the Author model.
 * @constant {Model<AuthorDocument>} Author - The Mongoose model for the Author schema.
 * 
 * @default
 * authorImage: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
 * description: ""
 */
import { Schema, model, Document } from "mongoose";

interface AuthorDocument extends Document {
  authorId: string;
  authorName: string;
  authorImage?: string;
  description?: string;
}

const authorSchema = new Schema<AuthorDocument>({
  authorName: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png", // Default fallback placeholder image
  },
  description: {
    type: String,
    default: "",
  },
});

const Author = model<AuthorDocument>("Author", authorSchema);

export { AuthorDocument };
export default Author;
