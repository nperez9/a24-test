import { Request, Response, NextFunction } from 'express';
import { ResultsLog } from '../../constants';

import { myCache, successResponse } from '../../utils';
import { errorLog, infoLog } from '../../utils/logger/logger';


/**
 * Gets cache for especific route, you must setted before.
 * If this middleware throws an error, the middleware chain continue, only gets logged
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {Next} next Express next function
 */
export const getCacheMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const cacheKey = `${req.hostname}${req.baseUrl}${req.url}`;
    const chacheData = myCache.get(cacheKey);
    
    if (!chacheData) {
      return next();
    }
    infoLog('getChacheMiddleware', req, ResultsLog.SUCCESS);
    return successResponse(res, chacheData);
  } catch (e) {
    errorLog(e, req);
    return next();
  }
};
