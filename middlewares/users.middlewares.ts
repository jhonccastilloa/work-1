import { NextFunction, Request, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import UserModel from '../models/user.models';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

const validUserById = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await UserModel.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    if (!user) return next(new AppError('User not found', 404));
    req.user = user;
    next();
  }
);

export default validUserById;
