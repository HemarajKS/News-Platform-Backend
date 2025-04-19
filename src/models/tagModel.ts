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
