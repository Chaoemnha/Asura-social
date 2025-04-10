import winston from 'winston';

const Logger: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize({all: true}),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console({
        format: winston.format.simple(),
        }),
    ],
    });

    export default Logger;