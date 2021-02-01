import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

import { errorResponse } from '../../utils';
import { ERROR } from '../../constants';

export const validateIdParamMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;

  if (!id || !isValidObjectId(id)) {
    return errorResponse(res, 400, ERROR.INVALID_ID);
  }

  next();
};
