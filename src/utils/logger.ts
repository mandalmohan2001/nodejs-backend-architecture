import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';
import { config } from '../config/config';

// Ensure logs directory exists
function ensureDirectoryExistence(directoryPath: string) {
  try {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
  } catch (error) {
    console.error(`Failed to create logs directory: ${(error as Error).message}`);
    process.exit(1); // Exit the application if logs directory cannot be created
  }
}
const logsDir = path.join(__dirname, config.logDirectory);
ensureDirectoryExistence(logsDir);

// Set log level based on environment
const logLevel = config.environment === 'development' ? 'debug' : 'info';

// Define log format
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message, stack, ...meta }) => {
      const metaString = Object.keys(meta).length
        ? ` | Metadata: ${JSON.stringify(meta)}`
        : '';
      return `${timestamp} [${level.toUpperCase()}]: ${stack || message}${metaString}`;
    }),
);

// Daily rotate file options
const dailyRotateFileOptions = {
    filename: path.join(logsDir, '%DATE%-application.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
};

// Create logger instance
const logger = createLogger({
  level: logLevel,
  format: logFormat,
  transports: [
    ...(config.environment === 'development'
      ? [
          new transports.Console({
            format: format.combine(format.colorize(), logFormat),
          }),
        ]
      : []),
    new DailyRotateFile(dailyRotateFileOptions),
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      ...dailyRotateFileOptions,
      filename: path.join(logsDir, '%DATE%-exceptions.log'),
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      ...dailyRotateFileOptions,
      filename: path.join(logsDir, '%DATE%-rejections.log'),
    }),
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

// Export logger instance
export default logger;
