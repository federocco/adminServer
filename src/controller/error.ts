import { Request, Response } from 'express';

export const get404 = (_: Request, res: Response): void => {
  res.status(404).send('<h1>Page not found</h1>');
};
