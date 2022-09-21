const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  defaultMeta: { ts: new Date().toISOString() },
  transports: [
    new winston.transports.Console({
      format:
        winston.format.simple(),
    })
    ],
});

export default logger;
