import { Request, Response } from 'express';
import { RequestExt } from '../interfaces/types';
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
    const existEmail = await UserModel.findOne({
      where: {
        email
      },
    });
    console.log(existEmail)
    if (existEmail)
      return res.status(404).json({ error: "error", message: 'this email was created' });
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
const updateUser = async (req: RequestExt, res: Response) => {
  try {
    const { user } = req;
    const { name, email } = req.body;
    const newUser = await user?.update({ name, email });
    res.json({
      status: 'succes',
      message: 'the user was edited succesfully',
      newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal server error' });
  }
};
const deleteUser = async (req: RequestExt, res: Response) => {
  try {
    const { user } = req;
    await user?.update({ status: 'unavailable' });
    res.json({ status: 'success', message: 'User was deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal server error' });
  }
};

export { findUser, findUsers, deleteUser, createUser, updateUser };
