import { ArticleService } from "../../services/articleService";
import ArticleModel from "../../models/articleModel";

jest.mock("../../models/articleModel");

describe("ArticleService", () => {
  const articleService = new ArticleService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of all articles", async () => {
    const mockArticles = [
      { title: "Article 1", description: "Description 1" },
      { title: "Article 2", description: "Description 2" },
    ];
    (ArticleModel.find as jest.Mock).mockResolvedValue(mockArticles);

    const articles = await articleService.getAllArticles();

    expect(articles).toEqual(mockArticles);
    expect(ArticleModel.find).toHaveBeenCalledTimes(1);
  });

  it("should return a single article by ID with populated fields", async () => {
    const mockArticle = { title: "Article 1", description: "Description 1" };
    const mockPopulateAuthor = jest.fn().mockResolvedValue(mockArticle);
    const mockPopulateCategory = jest.fn().mockReturnValue({
      populate: mockPopulateAuthor,
    });

    (ArticleModel.findById as jest.Mock).mockReturnValue({
      populate: mockPopulateCategory,
    });

    const article = await articleService.getArticleById("123");

    expect(article).toEqual(mockArticle);
    expect(ArticleModel.findById).toHaveBeenCalledWith("123");
    expect(mockPopulateCategory).toHaveBeenCalledWith({
      path: "category",
      select: "_id categoryName",
    });
    expect(mockPopulateAuthor).toHaveBeenCalledWith({
      path: "author",
      select: "_id authorName authorImage description",
    });
  });

  it("should create and return a new article", async () => {
    const newArticle = { title: "New Article", description: "New Description" };
    (ArticleModel.prototype.save as jest.Mock).mockResolvedValue(newArticle);

    const result = await articleService.createArticle(newArticle);

    expect(result).toEqual(newArticle);
    expect(ArticleModel.prototype.save).toHaveBeenCalledTimes(1);
  });

  it("should return true when an article is successfully updated", async () => {
    const updatedArticle = {
      title: "Updated Article",
      description: "Updated Description",
    };

    (ArticleModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
      updatedArticle
    );

    const result = await articleService.updateArticle("123", updatedArticle);

    expect(result).toBe(true);
    expect(ArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      updatedArticle,
      { new: true }
    );
    expect(ArticleModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
  });

  it("should return false if update fails (article not found)", async () => {
    (ArticleModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const result = await articleService.updateArticle("123", { title: "Fail" });

    expect(result).toBe(false);
  });

  it("should return true when an article is successfully deleted", async () => {
    const validObjectId = "507f191e810c19729de860ea";

    (ArticleModel.findByIdAndDelete as jest.Mock).mockResolvedValue({});

    const result = await articleService.deleteArticle(validObjectId);

    expect(result).toBe(true);
    expect(ArticleModel.findByIdAndDelete).toHaveBeenCalledWith(validObjectId);
    expect(ArticleModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
  });

  it("should return false if delete fails (article not found)", async () => {
    (ArticleModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const result = await articleService.deleteArticle("123");

    expect(result).toBe(false);
  });

  it("should filter articles by provided parameters", async () => {
    const mockArticles = [
      { title: "Filtered Article", description: "Filtered Description" },
    ];
    const mockTotal = 1;

    (ArticleModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockArticles),
    });

    (ArticleModel.countDocuments as jest.Mock).mockResolvedValue(mockTotal);

    const result = await articleService.filterArticles(
      undefined,
      undefined,
      "tag1",
      "typeA",
      0,
      10
    );

    expect(result).toEqual({ articles: mockArticles, total: mockTotal });
  });
});
