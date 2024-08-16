import { Request, Response, NextFunction } from 'express';
import CustomError from './Errors/CustomError';

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.send({ errors: err.serializeErrors() });
  }

  res.send({ errors: [{ message: 'Some Error occured!' }] });
};

export { globalErrorHandler };
