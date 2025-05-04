import { createLogger, transports, format } from 'winston';
import fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';
import { config } from '../config/config';

// Create the log directory if it does not exist
const ensureDirectoryExists = (directoryPath: string): void => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}; // Fixed missing semicolon

// Ensure the log directory exists
ensureDirectoryExists(config.logDirectory);

const logLevel = config.environment === 'development' ? 'debug' : 'info';

const options = {
  file: {
    level: logLevel,
    filename: config.logDirectory + '/%DATE%-logsDemo.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxsize: 5242880, // 5MB
    colorize: true,
  },
};

export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});
