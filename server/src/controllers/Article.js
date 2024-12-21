import Article from "../models/Article.js";
import User from "../models/User.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createArticle = asyncHandler(async (req, res, next) => {
  const { title, content, featuredImage, status, slug } = req.body;


  const userId = req.userId;

  const user = await User.findById(userId);

  if (!title || !content || !featuredImage || !status || !slug) {
    return next(new apiError(400, "Please provide all fields"));
  }

  const articleExists = await Article.findOne({ slug });

  if (articleExists) {
    return next(new apiError(400, "Article already exists"));
  }

  const newArticle = new Article({
    title,
    content,
    featuredImage,
    status,
    slug,
    userId,
  });

  const savedArticle = await newArticle.save();

  user.articles.push(savedArticle._id);
  await user.save();

  res.status(201).json({
    message: "Article created",
    success: true,
    data: savedArticle,
  });
});

export const updateArticle = asyncHandler(async (req, res, next) => {
  const { title, content, featuredImage, status, slug } = req.body;
  const userId = req.userId;

  if (!title || !content || !featuredImage || !status || !slug) {
    return next(new apiError(400, "Please provide all fields"));
  }

  const article = await Article.findOne({
   _id: slug,
  });

  if (!article) {
    return next(new apiError(400, "Article does not exist"));
  }


  article.title = title;
  article.content = content;
  article.featuredImage = featuredImage;
  article.status = status;
  article.slug = slug;

  const updatedArticle = await article.save();

  res.status(200).json({
    message: "Article updated",
    success: true,
    data: updatedArticle,
  });
});

export const deleteArticle = asyncHandler(async (req, res, next) => {
  const { slug } = req.body;
  const userId = req.userId;
  const user = await User.findById(userId);

  if (!slug) {
    return next(new apiError(400, "Please provide all fields"));
  }

  const article = await Article.findOne({
    slug,
  });

  if (!article) {
    return next(new apiError(400, "Article does not exist"));
  }

  if (article.userId.toString() !== userId.toString()) {
    return next(
      new apiError(401, "You are not authorized to delete this article")
    );
  }

  await article.remove();

  user.articles.pull(article._id);
  await req.user.save();

  res.status(200).json({
    message: "Article deleted",
    success: true,
  });
});

export const getSingularArticle = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;


  if (!slug) {
    return next(new apiError(400, "Please provide all fields"));
  }

  const article = await Article.findOne({
    _id: slug,
  });


  if (!article) {
    return next(new apiError(400, "Article does not exist"));
  }

  res.status(200).json({
    message: "Article found",
    success: true,
    data: article,
  });
});

export const getAllArticles = asyncHandler(async (req, res, next) => {
  const articles = await Article.find({ status: "active" });

  res.status(200).json({
    message: "Articles found",
    success: true,
    data: articles,
  });
});
