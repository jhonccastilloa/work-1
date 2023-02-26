import { NextFunction, Request, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import UserModel from '../models/user.models';
import AppError from '../utils/appError';
import { compareEncrypt, encrypt } from '../utils/bcryptPassword';
import catchAsync from '../utils/catchAsync';
import { tokenSign } from '../utils/jwt';

const findUsers = catchAsync(async (req: RequestExt, res: Response) => {
  
  const users = await UserModel.findAll({
    where: {
      status: 'available',
    },
  });
  res.json({
    status: 'success',
    users,
  });
});
const findUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserModel.findOne({
    where: {
      id,
      status: 'available',
    },
  });
  res.json({
    status: 'success',
    message: 'user found succesfully',
    user,
  });
});
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;
    const existEmail = await UserModel.findOne({
      where: {
        email,
      },
    });
    if (existEmail) return next(new AppError('this email was created', 404));
    const passwordEncrypt = await encrypt(password);
    const newUser = await UserModel.create({
      name,
      email,
      password: passwordEncrypt,
      role,
    });
    res.json({
      status: 'succes',
      message: 'the user was created succesfully',
      newUser,
    });
  }
);
const updateUser = catchAsync(async (req: RequestExt, res: Response) => {
  const { user } = req;
  const { name, email } = req.body;
  const newUser = await user?.update({ name, email });
  res.json({
    status: 'succes',
    message: 'the user was edited succesfully',
    newUser,
  });
});
const deleteUser = catchAsync(async (req: RequestExt, res: Response) => {
  const { user } = req;
  await user?.update({ status: 'unavailable' });
  res.json({ status: 'success', message: 'User was deleted successfully' });
});
const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      where: {
        email,
      },
    });
    if (!user) return next(new AppError('this account not exist', 404));

    const checkPassword = await compareEncrypt(password, user.password);
    if (!checkPassword)
      return next(new AppError('Incorrect email or password', 401));
    const token = tokenSign(user.id);
    res.json({ status: 'success', token, user });
  }
);

export { findUser, findUsers, deleteUser, createUser, updateUser, loginUser };
