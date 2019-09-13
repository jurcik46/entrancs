import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import {
  winstonDailyFileOptions,
  winstonConsoleOptions
} from "../configs/logger.config.mjs";

const { createLogger, format, transports } = winston;
const { combine, timestamp, prettyPrint, printf, colorize, ms } = format;

const consoleMyFormat = printf(
  ({ level, label, message, error, timestamp, ms }) => {
    if (!label) {
      label = "?";
    }
    if (!error) {
      error = "";
    }
    return `${timestamp} [${label}] ${level}: ${message} ${error}`;
  }
);

const transportOpt = [
  new transports.Console({
    ...winstonConsoleOptions,
    format: combine(colorize(), timestamp(), consoleMyFormat)
  }),
  new winstonDaily({
    ...winstonDailyFileOptions,
    format: combine(timestamp(), ms(), prettyPrint()) //TODO fix saving fromat to file REQUEST logs
  })
];

const logger = createLogger({
  transports: transportOpt,
  exitOnError: false
});

logger.stream = {
  write: function(message, encoding) {
    logger.debug({ label: "REQUEST", message });
  }
};

export default logger;
