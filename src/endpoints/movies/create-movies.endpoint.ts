import { Request, Response } from 'express';

import { ERROR, ResultsLog } from '../../constants'
import MoviesModel from '../../models/movies.model';
import { errorResponse, successResponse } from '../../utils';
import { errorLog, infoLog } from '../../utils/logger/logger';

export const createMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    infoLog('createMoviesEndpoint', req, ResultsLog.IN_PROGRESS);
    const movie = req.body;

    const result = await MoviesModel.create(movie);
    successResponse(res, result);
  } catch (e) {
    errorLog(e, req);
    errorResponse(res, 500, ERROR.DEFAULT);
  }
}