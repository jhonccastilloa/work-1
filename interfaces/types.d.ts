import { Request } from 'express';
import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

type Role = 'client' | 'employee';
type UserStatus = 'available' | 'unavailable';
type RepairStatus = 'pending' | 'completed' | 'cancelled';


export interface UserModelProps
  extends Model<
    InferAttributes<UserModelProps>,
    InferCreationAttributes<UserModelProps>
  > {
  id: CreationOptional<Number>;
  name: String;
  email: String;
  password: String;
  role: Role;
  status: CreationOptional<UserStatus>;
}
export interface RepairModelProps
  extends Model<
    InferAttributes<repairModelProps>,
    InferCreationAttributes<repairModelProps>
  > {
  id: CreationOptional<Number>;
  date: Date;
  userId: Number;
  status: CreationOptional<RepairStatus>;
}
export interface RequestExt extends Request {
  user?: UserModelProps;
  repair?: RepairModelProps;
}


