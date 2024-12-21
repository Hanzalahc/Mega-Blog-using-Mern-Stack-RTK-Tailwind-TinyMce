import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/errorHandler.js";

const app = express();

// defaults middlweares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

// importing routes
import GalleryRoutes from "./routes/Gallery.js";
import UserRoutes from "./routes/User.js";
import ArticleRoutes from "./routes/Article.js";

// routes declaration
app.use("/gallery", GalleryRoutes);
app.use("/user", UserRoutes);
app.use("/article", ArticleRoutes);

// / Error handler middleware
app.use(errorHandler);

export default app;
