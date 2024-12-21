import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const refreshToken =
      req.cookies.refreshToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    const accessToken =
      req.cookies.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!refreshToken || !accessToken) {
      return res.status(401).json({ message: "Unauthorized!", success: false });
    }

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized!", success: false, error: true });
      }

      req.userId = decoded.userId;
      
      next();
    });
  } catch (error) {
    next(error);
  }
};

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({
        message: `${req.userRole} not allowed to access this resource.`,
        status: false,
      });
    }
    next();
  };
};
