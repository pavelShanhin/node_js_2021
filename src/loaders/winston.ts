import winston from 'winston';

// export const WINSTON_CONFIG = () => {
//   process.on('uncaughtException', err => winston.error('uncaught exception: ', err))
//   process.on('unhandledRejection', (reason, p) => winston.error('unhandled rejection: ', reason, p))

//   winston.emitErrs = true
//   winston.exitOnError = false
//   winston.level = process.env.NODE_ENV === 'production' ? 'info' : 'debug'
//   winston.remove(winston.transports.Console)

//   winston.add(winston.transports.Console, {
//     level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
//     handleExceptions: true,
//     prettyPrint: true,
//     humanReadableUnhandledException: false,
//     json: false,
//     colorize: true,
//     timestamp: new Date(),
//   })
// }

// var logger = new winston.L({
//     transports: [
//     new winston.transports.File(options.file),
//     new winston.transports.Console(options.console)
//     ],
//     exitOnError: false, // do not exit on handled exceptions
//     });
 
export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }),
  ],
});
 
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }