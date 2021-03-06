import { Request, Response } from 'express';

import { ERROR, ResultsLog } from '../../constants'
import { cacheRoute } from '../../middlewares';
import MoviesModel from '../../models/movies.model';
import { documentNotFoundResponse, errorResponse, successResponse } from '../../utils';
import { errorLog, infoLog } from '../../utils/logger/logger';

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    infoLog('getAllMovies', req, ResultsLog.IN_PROGRESS);
    const limit = req.query.limit || 20;
    const page = req.query.page || 1;
    
    const pagination = {
      itemsPerPage: parseInt(limit as string, 10),
      page: parseInt(page as string, 10),
    };

    const skip = (pagination.page - 1) * pagination.itemsPerPage;

    const [count, movies] = [
      await MoviesModel.countDocuments({}),
      await MoviesModel.find({}).skip(skip).limit(pagination.itemsPerPage),
    ];

    const response = {
      ...pagination,
      total: count,
      data: movies,
    };

    successResponse(res, response);
    infoLog('getAllMovies', req, ResultsLog.SUCCESS);
    cacheRoute(req, response);
  } catch (e) {
    errorLog(e, req);
    errorResponse(res, 500, ERROR.DEFAULT);
  }
}

export const getOneMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    infoLog('getOneMovie', req, ResultsLog.IN_PROGRESS);
    const { id } = req.params;

    const movie = await MoviesModel.findById(id);
    if (!movie) {
      return documentNotFoundResponse(res, 'Movie');
    }
    successResponse(res, movie);
    infoLog('getOneMovie', req, ResultsLog.SUCCESS);
  } catch (e) {
    errorLog(e, req);
    errorResponse(res, 500, ERROR.DEFAULT);
  }
};
