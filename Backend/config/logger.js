const winston = require("winston");
const path = require("path");

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// Create logger instance
const logger = winston.createLogger({
  level: "info", // Default logging level
  format: logFormat,
  transports: [
    // Log to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    
    // Log errors to a separate file
    new winston.transports.File({ 
      filename: path.join(__dirname, "../logs/error.log"), 
      level: "error" 
    }),

    // Log all info messages to a file
    new winston.transports.File({ 
      filename: path.join(__dirname, "../logs/combined.log") 
    })
  ]
});

// Export logger
module.exports = logger;
