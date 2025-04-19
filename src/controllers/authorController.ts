import { Request, Response } from "express";
import { AuthorService } from "../services/authorService";

class AuthorController {
  private authorService: AuthorService;

  constructor() {
    this.authorService = new AuthorService();
    this.getAuthors = this.getAuthors.bind(this);
    this.getAuthorById = this.getAuthorById.bind(this);
    this.createAuthor = this.createAuthor.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  public async getAuthors(req: Request, res: Response): Promise<void> {
    try {
      const authors = await this.authorService.getAllAuthors();

      res.status(200).json({ status: 1, message: "success", data: authors });
    } catch (error) {
      res.status(500).json({ status: 0, message: "failed", error });
    }
  }

  public async getAuthorById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const author = await this.authorService.getAuthorById(id);
      if (author) {
        res.status(200).json(author);
      } else {
        res.status(404).json({ message: "Author not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching author", error });
    }
  }

  public async createAuthor(req: Request, res: Response): Promise<void> {
    const authorData = req.body;
    try {
      const newAuthor = await this.authorService.createAuthor(authorData);
      res.status(201).json(newAuthor);
    } catch (error) {
      res.status(500).json({ message: "Error creating author", error });
    }
  }

  public async updateAuthor(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const authorData = req.body;
    try {
      const updatedAuthor = await this.authorService.updateAuthor(
        id,
        authorData
      );
      if (updatedAuthor) {
        res.status(200).json(updatedAuthor);
      } else {
        res.status(404).json({ message: "Author not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating author", error });
    }
  }

  public async deleteAuthor(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deleted = await this.authorService.deleteAuthor(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Author not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting author", error });
    }
  }
}

export default AuthorController;
