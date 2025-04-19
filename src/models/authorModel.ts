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
