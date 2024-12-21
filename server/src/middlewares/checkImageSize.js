export const checkImageSize = (req, res, next) => {
  try {
    if (req.file.size > 1024 * 1024 * 3) {
      // 3MB
      const error = new Error("Image size should not exceed 3MB");
      error.status = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};
