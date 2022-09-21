import {Request, Response, NextFunction} from 'express';
import logger from '@utils/logger';
const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  if (res.headersSent) return next(err);
  res.status(500).json({error:err.message});
}

export default errorHandler;
