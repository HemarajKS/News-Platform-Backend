import { AuthorService } from "../../services/authorService";
import AuthorModel from "../../models/authorModel";

jest.mock("../../models/authorModel");

describe("AuthorService", () => {
  const authorService = new AuthorService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all authors", async () => {
    const mockAuthors = [
      { _id: "1", authorName: "Author 1", description: "Description 1" },
      { _id: "2", authorName: "Author 2", description: "Description 2" },
    ];
    (AuthorModel.find as jest.Mock).mockResolvedValue(mockAuthors);

    const authors = await authorService.getAllAuthors();

    expect(authors).toEqual(mockAuthors);
    expect(AuthorModel.find).toHaveBeenCalledTimes(1);
  });

  it("should fetch a single author by ID", async () => {
    const mockAuthor = {
      _id: "1",
      authorName: "Author 1",
      description: "Description 1",
    };
    (AuthorModel.findOne as jest.Mock).mockResolvedValue(mockAuthor);

    const author = await authorService.getAuthorById("1");

    expect(author).toEqual(mockAuthor);
    expect(AuthorModel.findOne).toHaveBeenCalledWith({ _id: "1" });
    expect(AuthorModel.findOne).toHaveBeenCalledTimes(1);
  });

  it("should create a new author", async () => {
    const newAuthor = {
      authorName: "New Author",
      description: "New Description",
    };
    (AuthorModel.prototype.save as jest.Mock).mockResolvedValue(newAuthor);

    const result = await authorService.createAuthor(newAuthor);

    expect(result).toEqual(newAuthor);
    expect(AuthorModel.prototype.save).toHaveBeenCalledTimes(1);
  });

  it("should update an author by ID", async () => {
    const updatedAuthor = {
      authorName: "Updated Author",
      description: "Updated Description",
    };
    (AuthorModel.findOneAndUpdate as jest.Mock).mockResolvedValue(
      updatedAuthor
    );

    const result = await authorService.updateAuthor("1", updatedAuthor);

    expect(result).toEqual(updatedAuthor);
    expect(AuthorModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "1" },
      updatedAuthor,
      { new: true }
    );
    expect(AuthorModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
  });

  it("should return true when an author is successfully deleted", async () => {
    (AuthorModel.findOneAndDelete as jest.Mock).mockResolvedValue({});

    const result = await authorService.deleteAuthor("1");

    expect(result).toBe(true);
    expect(AuthorModel.findOneAndDelete).toHaveBeenCalledWith({ _id: "1" });
    expect(AuthorModel.findOneAndDelete).toHaveBeenCalledTimes(1);
  });

  it("should return false if delete fails (author not found)", async () => {
    (AuthorModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);

    const result = await authorService.deleteAuthor("1");

    expect(result).toBe(false);
    expect(AuthorModel.findOneAndDelete).toHaveBeenCalledWith({ _id: "1" });
    expect(AuthorModel.findOneAndDelete).toHaveBeenCalledTimes(1);
  });
});
