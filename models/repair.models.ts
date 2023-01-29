import { DataTypes } from 'sequelize';
import db from '../database/db';
import { RepairModelProps } from '../interfaces/types';

console.log('hola');
const RepairModel = db.define<RepairModelProps>('repairs', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'available',
  },
});

export default RepairModel;
