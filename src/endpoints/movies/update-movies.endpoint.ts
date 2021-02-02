import { Request, Response } from 'express';

import { ERROR, ResultsLog } from '../../constants'
import MoviesModel from '../../models/movies.model';
import { documentNotFoundResponse, errorResponse, successResponse } from '../../utils';
import { errorLog, infoLog } from '../../utils/logger/logger';

export const updateMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    infoLog('updateMoviesEndpoint', req, ResultsLog.IN_PROGRESS);
    const movie = req.body;
    const { id } = req.params;

    const result = await MoviesModel.findOneAndUpdate({_id: id}, { $set: { ...movie }}, {upsert: false, new: true});
    if (!result) {
      return documentNotFoundResponse(res, 'Movie', 200, { id });
    }

    successResponse(res, result);
    infoLog('updateMoviesEndpoint', req, ResultsLog.SUCCESS);
  } catch (e) {
    errorLog(e, req);
    errorResponse(res, 500, ERROR.DEFAULT);
  }
}
