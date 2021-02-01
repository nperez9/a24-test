import { Router } from 'express';

import { healthEndpoint } from './endpoints/health.endpoint';
import moviesRouter from './routers/movies.router';

const router = Router();

router.get('/health', healthEndpoint);
router.use('/movies', moviesRouter);

export default router;