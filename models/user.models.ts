import { DataTypes } from 'sequelize';
import db from '../database/db';
import {  UserModel } from '../interfaces/types';

const UserModel = db.define<UserModel>('users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('client', 'employee'),
    allowNull: false,
    defaultValue: 'client',
  },
  status:{
    type: DataTypes.ENUM('available', 'unavailable'),
    allowNull: false,
    defaultValue:'available'
  }
});

export default UserModel