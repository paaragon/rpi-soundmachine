import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions/HttpException';
import BasicAuthCheck from './authCheckTypes/basicAuthCheck';

const check = new BasicAuthCheck();

export default async function(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  const valid = await check.validate(auth);
  if (!valid) {
    return next(new UnauthorizedException());
  }

  next();
}
