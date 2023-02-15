import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import { RequestExt } from '../interfaces/types';
import RepairModel from '../models/repair.models';
import UserModel from '../models/user.models';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

const findRepairs = catchAsync(async (req: Request, res: Response) => {
  const repairs = await RepairModel.findAll({
    where: {
      status: 'pending',
    },
    include: {
      model: UserModel,
    },
  });
  res.json({
    status: 'success',
    repairs,
  });
});
const findRepair = catchAsync(async (req: RequestExt, res: Response) => {
  const { repair } = req;
  res.json({
    status: 'success',
    message: 'repair found succesfully',
    repair,
  });
});
const createRepair = catchAsync(async (req: Request, res: Response) => {
  const { date, motorsNumber, description, userId } = req.body;
  const newRepair = await RepairModel.create({
    date,
    userId,
    motorsNumber,
    description,
  });
  res.json({
    status: 'success',
    message: 'the repair was created succesfully',
    newRepair,
  });
});
const updateRepair = catchAsync(async (req: RequestExt, res: Response) => {
  const { repair } = req;
  const { status } = req.body;
  const newRepair = await repair?.update({ status });
  res.json({
    status: 'succes',
    message: 'the repair was edited succesfully',
    newRepair,
  });
});
const deleteRepair = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { repair } = req;
    await repair?.update({ status: 'cancelled' });
    res.json({ status: 'success', message: 'Repair was deleted successfully' });
  }
);

export { findRepair, findRepairs, deleteRepair, updateRepair, createRepair };
