import multer from "multer";

export const multerFileUpload = multer({
  storage: multer.memoryStorage(),
}).single("image");
