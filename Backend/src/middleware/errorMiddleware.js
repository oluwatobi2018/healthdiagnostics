const errorHandler = (err, req, res, next) => {
    console.error(`❌ Error: ${err.message}`);
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    res.status(statusCode).json({
      message: err.message || "Server Error",
      stack: process.env.NODE_ENV === "production" ? null : err.stack, // Hide stack trace in production
    });
  };
  
  // Middleware for handling 404 Not Found errors
  const notFound = (req, res, next) => {
    const error = new Error(`🔍 Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  export { errorHandler, notFound };
  