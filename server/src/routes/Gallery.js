import express from "express";
const router = express.Router();
import { uploadImage } from "../controllers/Gallery.js";
import { multerFileUpload } from "../middlewares/multerFile.js";
import { checkImageSize } from "../middlewares/checkImageSize.js";
import { checkImgType } from "../middlewares/checkImgType.js";

router.post(
  "/upload",
  multerFileUpload,
  checkImageSize,
  checkImgType,
  uploadImage
);

export default router;
