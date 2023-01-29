import { NextFunction, Request, Response } from 'express';
import { RequestExt } from '../interfaces/types';
import RepairModel from '../models/repair.models';
import UserModel from '../models/user.models';

const validRepairById = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const repair = await RepairModel.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    if (!repair)
      return res.status(404).json({ error: true, message: 'Repair not found' });
    req.repair = repair;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'internal server error',
    });
  }
};

export default validRepairById;
