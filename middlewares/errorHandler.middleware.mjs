import createError from "http-errors";

export const notFoundHandler = () => {
  throw createError.NotFound();
};

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  res.status(statusCode || 500).json({
    message: message
  });
};

export const notFoundRenderHandler = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: "/404",
    isAuthenticated: req.session.isLoggedIn
  });
};

export const errorRenderHandler = (err, req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
    message: err.message
  });
};

export default errorHandler;
