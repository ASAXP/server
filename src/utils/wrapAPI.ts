import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response) => void;

const wrapAPI = (fn: AsyncFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res);
    } catch (e) {
      next(e);
    }
  };
};

export default wrapAPI;
