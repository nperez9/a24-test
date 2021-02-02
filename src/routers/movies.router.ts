import { Router } from 'express';

import { moviesValidatorSchema } from '../validators';
import { validateBodyMiddleware, validateIdParamMiddleware, getCacheMiddleware } from '../middlewares';
import { createMovies, deleteMovies, getAllMovies, getOneMovie, updateMovies } from '../endpoints/movies';

const moviesRouter = Router();

moviesRouter.get('/', getCacheMiddleware, getAllMovies);
moviesRouter.get('/:id', validateIdParamMiddleware, getOneMovie);

moviesRouter.post('/', validateBodyMiddleware(moviesValidatorSchema), createMovies);
moviesRouter.put('/:id', validateIdParamMiddleware, validateBodyMiddleware(moviesValidatorSchema), updateMovies);

moviesRouter.delete('/:id', deleteMovies);

export default moviesRouter;
