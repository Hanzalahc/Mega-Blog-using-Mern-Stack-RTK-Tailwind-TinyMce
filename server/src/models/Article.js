import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    index: true,
    enum: ["active", "inactive", "draft" ],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

export default mongoose.model("Article", articleSchema);
