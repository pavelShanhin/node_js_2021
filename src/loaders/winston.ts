import winston from 'winston';

export const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.Console({
            level: 'info'
        })
    ]
});

