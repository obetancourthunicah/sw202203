import logger from '@utils/logger';
import { Request, Response, NextFunction } from 'express';

const onRequestEnd = (req: Request, res: Response, _next: NextFunction) => {
  const { statusCode, statusMessage } = res;
  const { method, url } = req;
  if (statusCode >= 400) {
    logger.error(`${method} ${url} ${statusCode} ${statusMessage}`);
  } else {
    logger.info(`${method} ${url} ${statusCode} ${statusMessage}`);
  }
  //next();
}
const expressLogger = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', ()=>onRequestEnd(req, res, next));
  next();
}

export default expressLogger;
