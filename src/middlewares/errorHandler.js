// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.log('Error Handler Invoked');
    console.error(`[ERROR]: ${err.message}`, err.stack);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  };
  
  module.exports = errorHandler;
  