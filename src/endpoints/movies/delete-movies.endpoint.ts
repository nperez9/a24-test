import { Request, Response } from 'express';

import { ERROR, ResultsLog } from '../../constants'
import MoviesModel from '../../models/movies.model';
import { documentNotFoundResponse, errorResponse, successResponse } from '../../utils';
import { errorLog, infoLog } from '../../utils/logger/logger';

export const deleteMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    infoLog('deleteMoviesEndpoint', req, ResultsLog.IN_PROGRESS);
    const { id } = req.params;

    const result = await MoviesModel.findOneAndDelete({_id: id});
    if (!result) {
      return documentNotFoundResponse(res, 'Movie', 200, { id });
    }

    successResponse(res, result);
    infoLog('deleteMoviesEndpoint', req, ResultsLog.SUCCESS);
  } catch (e) {
    errorLog(e, req);
    errorResponse(res, 500, ERROR.DEFAULT);
  }
}
