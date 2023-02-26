import { NextFunction, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import RepairModel from '../models/repair.models';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

const validRepairById = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const repair = await RepairModel.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    if (!repair) return next(new AppError('Repair not found', 404));
    req.repair = repair;
    next();
  }
);

const validRepairCompleted = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const repair = await RepairModel.findOne({
      where: {
        id,
      },
    });
    if (!repair) return next(new AppError('Repair not found', 404));
    if (repair?.status == 'completed')
      return next(new AppError('This repair was completate', 404));
    req.repair = repair;
    next();
  }
);
export { validRepairById, validRepairCompleted };
