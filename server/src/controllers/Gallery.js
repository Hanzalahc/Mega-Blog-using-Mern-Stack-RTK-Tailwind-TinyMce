import Gallery from "../models/Gallery.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new apiError(400, "No file uploaded"));
  }

  // Upload the file to Cloudinary
  const cloudinaryResult = await uploadOnCloudinary(req.file);
  // console.log(cloudinaryResult);
  const newImage = new Gallery({
    image: cloudinaryResult.secure_url,
  });

  const savedImage = await newImage.save();

  res.status(201).json({
    message: "Image Saved",
    success: true,
    image: savedImage.image,
  });
});
