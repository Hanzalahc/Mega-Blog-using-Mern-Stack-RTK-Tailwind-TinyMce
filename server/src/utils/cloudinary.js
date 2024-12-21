import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        folder: "mega-blog",
        transformation: [
          { width: 800, height: 800, crop: "limit", quality: "auto", fetch_format: "auto" },
        ],
        
      },
      (error, result) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};
