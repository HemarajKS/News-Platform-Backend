import AuthorModel, { AuthorDocument } from "../models/authorModel";

export class AuthorService {
  public async getAllAuthors(): Promise<AuthorDocument[]> {
    return await AuthorModel.find();
  }

  public async getAuthorById(authorId: string): Promise<AuthorDocument | null> {
    return await AuthorModel.findOne({ _id: authorId });
  }

  public async createAuthor(
    authorData: Partial<AuthorDocument>
  ): Promise<AuthorDocument> {
    const newAuthor = new AuthorModel(authorData);
    return (await newAuthor.save()) as AuthorDocument;
  }

  public async updateAuthor(
    authorId: string,
    updatedAuthor: Partial<AuthorDocument>
  ): Promise<AuthorDocument | null> {
    return await AuthorModel.findOneAndUpdate(
      { _id: authorId },
      updatedAuthor,
      {
        new: true,
      }
    );
  }

  public async deleteAuthor(authorId: string): Promise<boolean> {
    const result = await AuthorModel.findOneAndDelete({ _id: authorId });
    return result !== null;
  }
}
