import { NextFunction, Request, Response } from 'express';
import { RequestExt, User } from '../interfaces/types';
import UserModel from '../models/user.models';

const validUserById = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    if (!user)
      return res.status(404).json({ error: true, message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'internal server error',
    });
  }
};

export default validUserById;
