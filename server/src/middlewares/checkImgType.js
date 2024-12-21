export const checkImgType = (req, res, next) => {
  try {
    if (
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpeg" &&
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/webp"
    ) {
      const error = new Error("Image type should be png, jpeg, jpg or webp");
      error.status = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};
