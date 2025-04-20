/**
 * Represents the Article document in the MongoDB database.
 * This model defines the schema and TypeScript interface for articles.
 * Articles can be of type TEXT, AUDIO, or VIDEO and include metadata such as
 * title, subtitle, hero image, description, media URL, publication date, category,
 * tags, and author.
 *
 * @interface ArticleDocument
 * @extends {Document}
 *
 * @property {string} title - The title of the article. This field is required.
 * @property {string} subtitle - The subtitle of the article. This field is optional.
 * @property {string} hero - The URL of the hero image for the article. This field is required.
 * @property {"TEXT" | "AUDIO" | "VIDEO"} articleType - The type of the article. This field is required.
 * @property {string} description - A single HTML string representing the article's content. Must be valid HTML.
 * @property {string} [mediaUrl] - The URL of the media file (e.g., audio or video). Required for AUDIO and VIDEO articles.
 * @property {Date} published - The publication date of the article. Defaults to the current date.
 * @property {Schema.Types.ObjectId} category - A reference to the Category document. This field is required.
 * @property {string[]} tags - A list of tags associated with the article. This field is required.
 * @property {Schema.Types.ObjectId} author - A reference to the Author document. This field is required.
 *
 * @class Article
 * @extends {Model<ArticleDocument>}
 *
 * @description
 * The `Article` model is used to interact with the `articles` collection in the database.
 * It includes validation for fields such as `description` (valid HTML) and `mediaUrl` (valid URL).
 * The `mediaUrl` field is conditionally required based on the `articleType`.
 */
import { Schema, model, Document } from "mongoose";

// Define the TypeScript interface for the Article document
export interface ArticleDocument extends Document {
  title: string;
  subtitle: string;
  hero: string; // URL of the hero image
  articleType: "TEXT" | "AUDIO" | "VIDEO";
  description: string; // Single HTML string
  mediaUrl?: string; // Optional for TEXT articles
  published: Date;
  category: Schema.Types.ObjectId; // Reference to Category
  tags: string[]; // List of tags
  author: Schema.Types.ObjectId; // Reference to Author
}

// Define the Mongoose schema for the Article model
const articleSchema = new Schema<ArticleDocument>({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    // required: true,
  },
  hero: {
    type: String,
    required: true,
  },
  articleType: {
    type: String,
    enum: ["TEXT", "AUDIO", "VIDEO"],
    required: true,
  },
  description: {
    type: String, // Changed from array to single string
    validate: {
      validator: function (v: string) {
        // Validate that the string is a valid HTML snippet
        const htmlRegex = /<\/?[a-z][\s\S]*>/i;
        return htmlRegex.test(v);
      },
      message: "Description must be a valid HTML string.",
    },
  },
  mediaUrl: {
    type: String,
    required: function (this: ArticleDocument): boolean {
      return this.articleType === "AUDIO" || this.articleType === "VIDEO";
    },
    validate: {
      validator: function (v: string) {
        const urlRegex =
          /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?(#.*)?(\.(mp4|mp3|wav|avi))?$/;
        return urlRegex.test(v);
      },
      message: "Media URL must be a valid URL.",
    },
  },
  published: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
});

// Create and export the Article model
const Article = model<ArticleDocument>("Article", articleSchema);

export default Article;
