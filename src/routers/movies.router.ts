import { Router } from 'express';

import { moviesValidatorSchema } from '../validators';
import { validateBodyMiddleware, validateIdParamMiddleware } from '../middlewares';
import { createMovies, deleteMovies, getAllMovies, updateMovies } from '../endpoints/movies';

const moviesRouter = Router();

moviesRouter.get('/', getAllMovies);
moviesRouter.get('/:id', getAllMovies);

moviesRouter.post('/', validateBodyMiddleware(moviesValidatorSchema), createMovies);
moviesRouter.put('/:id', validateIdParamMiddleware, validateBodyMiddleware(moviesValidatorSchema), updateMovies);

moviesRouter.delete('/id', deleteMovies);

export default moviesRouter;
