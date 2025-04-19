import mongoose from "mongoose";

import Category from "../models/categoryModel";
import Article from "../models/articleModel";
import Author from "../models/authorModel";
import { categories } from "../data/categories";
import { articles } from "../data/articles";
import { authors } from "../data/author";

const MONGO_URI = "mongodb://127.0.0.1:27017/news-platform";

export default async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Seed Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      console.log("Seeding categories...");
      await Category.insertMany(categories);
      console.log("Categories seeded successfully");
    } else {
      console.log("Categories already exist, skipping seeding");
    }

    // Seed Articles
    const articleCount = await Article.countDocuments();
    if (articleCount === 0) {
      console.log("Seeding articles...");

      await Article.insertMany(articles);
      console.log("Articles seeded successfully");
    } else {
      console.log("Articles already exist, skipping seeding");
    }

    // Seed Authors (if applicable from homePage.json)
    const authorCount = await Author.countDocuments();
    if (authorCount === 0) {
      console.log("Seeding authors...");

      await Author.insertMany(authors);
      console.log("Authors seeded successfully");
    } else {
      console.log("Authors already exist, skipping seeding");
    }

    // Close the connection
    // mongoose.connection.close();
    console.log("Database seeding completed and connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    // mongoose.connection.close();
  }
}
