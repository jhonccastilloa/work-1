import { Request, Response } from 'express';
import UserModel from '../models/user.models';

const findUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll({
      where: {
        status: 'available',
      },
    });
    res.json({
      status: 'success',
      users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal server error' });
  }
};
const findUser = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal server error' });
  }
};
const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await UserModel.create({
      name,
      email,
      password,
      role,
    });
    res.json({
      status: 'succes',
      message: 'the user was created succesfully',
      newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'error', message: 'internal server error' });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal server error' });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal server error' });
  }
};

export { findUser, findUsers, deleteUser, createUser, updateUser };
