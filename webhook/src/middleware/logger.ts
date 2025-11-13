import { Request, Response, NextFunction } from "express";
import winston from "winston";

export const logger = winston.createLogger({
  level: 'info',
  format:    winston.format.json(),
  defaultMeta: { service: 'zap-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({ filename: 'combined.log' }),

    new winston.transports.Console({
    format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  })
  ],
});

 export const mylogger = (req:Request, res:Response, next:NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
}