import mongoose from "mongoose";
import ArticleModel, { ArticleDocument } from "../models/articleModel";

export class ArticleService {
  public async getAllArticles(): Promise<ArticleDocument[]> {
    return await ArticleModel.find();
  }

  public async getArticleById(
    articleId: string
  ): Promise<ArticleDocument | null> {
    return await ArticleModel.findById(articleId)
      .populate({
        path: "category",
        select: "_id categoryName",
      })
      .populate({
        path: "author",
        select: "_id authorName authorImage description",
      });
  }

  public async createArticle(
    article: Partial<ArticleDocument>
  ): Promise<ArticleDocument> {
    const newArticle = new ArticleModel(article);
    return await newArticle.save();
  }

  public async updateArticle(
    articleId: string,
    updatedArticle: Partial<ArticleDocument>
  ): Promise<boolean> {
    const result = await ArticleModel.findByIdAndUpdate(
      articleId,
      updatedArticle,
      { new: true }
    );
    return result !== null;
  }

  public async deleteArticle(articleId: string): Promise<boolean> {
    const result = await ArticleModel.findByIdAndDelete(articleId);
    return result !== null;
  }

  public async filterArticles(
    category?: mongoose.Types.ObjectId,
    author?: mongoose.Types.ObjectId,
    tag?: string,
    articleType?: string,
    skip: number = 0,
    pageSize: number = 10
  ): Promise<{ articles: ArticleDocument[]; total: number }> {
    const filter: Record<string, any> = {};
    if (category) filter.category = category;
    if (author) filter.author = author;
    if (tag) filter.tags = { $in: [tag] };
    if (articleType) filter.articleType = articleType;

    const articles = await ArticleModel.find(filter)
      .sort({ published: -1 }) // Sort by latest published date
      .skip(skip)
      .limit(pageSize);

    const total = await ArticleModel.countDocuments(filter);

    return { articles, total };
  }
}
