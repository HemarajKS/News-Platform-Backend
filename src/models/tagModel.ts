/**
 * Represents a Tag document in the MongoDB database.
 * 
 * This model defines the schema for a Tag, which includes:
 * - `name`: A unique, trimmed string that is required.
 * 
 * The schema also includes timestamps for `createdAt` and `updatedAt`.
 * 
 * @interface TagDocument
 * @extends {Document}
 * 
 * @property {string} name - The name of the tag. It must be unique, required, and trimmed.
 */
import mongoose, { Schema, Document } from "mongoose";

export interface TagDocument extends Document {
  name: string;
}

const TagSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<TagDocument>("Tag", TagSchema);
