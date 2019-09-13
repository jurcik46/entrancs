/**
 * *Logger option objects
 */
export const LOG_OUTPUT = process.env.LOG_OUTPUT;

export const winstonDailyFileOptions = {
  level: process.env.LOG_FILE_LEVEL,
  filename: process.env.LOG_FILE_NAME,
  dirname: process.env.LOG_FILE_DIR,
  datePattern: process.env.LOG_FILE_DATEPATTERN,
  zippedArchive: true,
  maxSize: process.env.LOG_FILE_MAXSIZE,
  maxFiles: process.env.LOG_FILE_MAXFILES,
  colorize: false
};

export const winstonConsoleOptions = {
  level: process.env.LOG_CONSOLE_LEVEL,
  handleExceptions: true,
  json: false,
  colorize: true
};
