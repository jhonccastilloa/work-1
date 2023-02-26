import { NextFunction, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import UserModel from '../models/user.models';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { verifyToken } from '../utils/jwt';

const protect = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer'))
      return next(
        new AppError('You are not logged in!  please log in to get acess', 401)
      );
    const token = authorization.split(' ')[1];
    const { id } = verifyToken(token);
    if (!id)
      return next(
        new AppError('The owner of this token it not longer available', 401)
      );
    req.sessionIdUser = id;
    next();
  }
);

export default protect;
