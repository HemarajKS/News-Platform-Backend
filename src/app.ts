import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Import cors middleware
import articleRoutes from "./routes/articleRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import authorRoutes from "./routes/authorRoutes";
import tagRoutes from "./routes/tagRoutes";
import mongoose from "mongoose";
import seedDatabase from "./lib/seeddata";

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI = "mongodb://127.0.0.1:27017/news-platform";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    seedDatabase();
  })
  .catch((error) => console.error("MongoDB connection error:", error));

// Add CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/articles", articleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/tags", tagRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
