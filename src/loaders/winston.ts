import winston from 'winston';
import expressWinston from 'express-winston';

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize({all: true}),
    winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
    winston.format.printf(
      info => `Method: ${info.meta.req.method} Status code: ${info.meta.res.statusCode}, ${info.level} info`
     ),
    winston.format.json()
  ),
    meta: true, 
});

export const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({
      level: 'info'
    })
  ]
});

