import { Request, Response } from "express";
import { ArticleService } from "../services/articleService";
import mongoose from "mongoose";
import { AuthorService } from "../services/authorService";

class ArticleController {
  private articleService: ArticleService;
  private authorService: AuthorService;

  constructor() {
    this.articleService = new ArticleService();
    this.authorService = new AuthorService();
    this.getAllArticles = this.getAllArticles.bind(this);
    this.getArticleById = this.getArticleById.bind(this);
    this.filterArticles = this.filterArticles.bind(this);
    this.createArticle = this.createArticle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  public async getAllArticles(_req: Request, res: Response): Promise<void> {
    try {
      const articles = await this.articleService.getAllArticles();
      res.status(200).json({ status: 1, message: "success", data: articles });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ status: 0, message: errorMessage });
    }
  }

  public async getArticleById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const article = await this.articleService.getArticleById(id);
      if (article) {
        res.status(200).json({ status: 1, message: "success", data: article });
      } else {
        res.status(404).json({ status: 0, message: "Article not found" });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ status: 0, message: errorMessage });
    }
  }

  public async filterArticles(req: Request, res: Response): Promise<void> {
    const {
      categories,
      author,
      tag,
      articleType,
      page = "1",
      limit = "5",
    } = req.query as {
      categories?: string | string[];
      author?: string;
      tag?: string;
      articleType?: string;
      page?: string;
      limit?: string;
    };

    try {
      const { Types } = mongoose;
      const categoryIds =
        categories && Array.isArray(categories)
          ? categories
              .filter((category) => Types.ObjectId.isValid(category))
              .map((category) => new Types.ObjectId(category))
          : categories && Types.ObjectId.isValid(categories)
          ? [new Types.ObjectId(categories)]
          : undefined;

      const authorId =
        author && Types.ObjectId.isValid(author)
          ? new Types.ObjectId(author)
          : undefined;

      let authorData = null;

      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);
      const skip = (pageNumber - 1) * pageSize;

      if (author && authorId) {
        const authorDoc = await this.authorService.getAuthorById(author);

        if (author && authorDoc) {
          authorData = authorDoc ?? "Anonymous";
        }
      }

      const { articles, total } = await this.articleService.filterArticles(
        categoryIds,
        authorId,
        tag as string | undefined,
        articleType as string | undefined,
        skip,
        pageSize
      );

      const totalPages = Math.ceil(total / pageSize);

      const simplifiedArticles = articles.map((article) => ({
        title: article.title,
        hero: article.hero,
        articleId: article._id,
        categoryId: article.category ?? null,
        authorId: article.author ?? null,
        articleType: article.articleType ?? null,
        tags: article.tags ?? [],
      }));

      res.status(200).json({
        status: 1,
        message: "success",
        data: {
          categoryIds: categoryIds ?? null,
          tag: tag ?? null,
          author: {
            authorName: authorData?.authorName ?? "Anonymous",
            authorId: authorData?._id ?? null,
          },
          articles: simplifiedArticles,
          page: pageNumber,
          totalPages,
        },
      });
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ status: 0, message: errorMessage });
    }
  }

  public async createArticle(req: Request, res: Response): Promise<void> {
    try {
      const newArticle = await this.articleService.createArticle(req.body);
      res
        .status(201)
        .json({ status: 1, message: "Article created", data: newArticle });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ status: 0, message: errorMessage });
    }
  }

  public async updateArticle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const isUpdated = await this.articleService.updateArticle(id, req.body);
      if (isUpdated) {
        res.status(200).json({ status: 1, message: "Article updated" });
      } else {
        res.status(404).json({ status: 0, message: "Article not found" });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ status: 0, message: errorMessage });
    }
  }

  public async deleteArticle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const isDeleted = await this.articleService.deleteArticle(id);
      if (isDeleted) {
        res.status(200).json({ status: 1, message: "Article deleted" });
      } else {
        res.status(404).json({ status: 0, message: "Article not found" });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ status: 0, message: errorMessage });
    }
  }
}

export default ArticleController;
