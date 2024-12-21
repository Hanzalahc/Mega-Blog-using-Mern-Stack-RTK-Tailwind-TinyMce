import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    index: true,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  articles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  }],
}, { timestamps: true });

export default mongoose.model("User", userSchema);