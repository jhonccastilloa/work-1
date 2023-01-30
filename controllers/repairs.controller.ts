import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { RequestExt } from '../interfaces/types';
import RepairModel from '../models/repair.models';

const findRepairs = async (req: Request, res: Response) => {
  try {
    const repairs = await RepairModel.findAll({
      where: {
        status: 'pending',
      },
    });
    res.json({
      status: 'success',
      repairs,
    });
  } catch (err) {
    console.log(err);
    console.log('err');
    res.status(500).json({ message: 'internal server error' });
  }
};
const findRepair = async (req: RequestExt, res: Response) => {
  try {
    const { repair } = req;
    res.json({
      status: 'success',
      message: 'repair found succesfully',
      repair,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal server error' });
  }
};
const createRepair = async (req: Request, res: Response) => {
  try {
    
    const { date, userId } = req.body;
    const newRepair = await RepairModel.create({
      date,
      userId,
    });
    res.json({
      status: 'success',
      message: 'the repair was created succesfully',
      newRepair,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'error', message: 'internal server error' });
  }
};
const updateRepair = async (req: RequestExt, res: Response) => {
  try {
    const { repair } = req;
    const { status } = req.body;
    const newRepair = await repair?.update({ status });
    res.json({
      status: 'succes',
      message: 'the repair was edited succesfully',
      newRepair,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal server error' });
  }
};
const deleteRepair = async (req: RequestExt, res: Response) => {
  try {
    const { repair } = req;

    if (repair?.status == 'completed')
      return res.json({
        status: 'error',
        message: 'This repair was completate',
      });
    await repair?.update({ status: 'cancelled' });
    res.json({ status: 'success', message: 'Repair was deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal server error' });
  }
};

export { findRepair, findRepairs, deleteRepair, updateRepair, createRepair };
