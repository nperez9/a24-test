import { Request, Response } from 'express';

export const deleteMovies = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: 'coll endpoint'});
}
