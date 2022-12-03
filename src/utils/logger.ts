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

export function useLogger(){
  return function (target:any, propertyKey: string, descriptor: PropertyDescriptor){
    const targetMethod = descriptor.value;
    const initTarget = target?.constructor?.name;
    descriptor.value = function(...args: any[]){
      logger.info(`${initTarget}: Calling ${propertyKey}`);
      return targetMethod.apply(this, args);
    }
  }
}
