import { Request, Response } from 'express';

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: 'coll endpoint'});
}
