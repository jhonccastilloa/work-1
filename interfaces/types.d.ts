import { NextFunction, Request, Response } from 'express';
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
  id: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
  role: Role;
  status: CreationOptional<UserStatus>;
}
export interface RepairModelProps
  extends Model<
    InferAttributes<repairModelProps>,
    InferCreationAttributes<repairModelProps>
  > {
  id: CreationOptional<number>;
  date: Date;
  userId: number;
  motorsNumber: number;
  description: string;
  status: CreationOptional<RepairStatus>;
}
export interface RequestExt extends Request {
  user: UserModelProps;
  repair: RepairModelProps;
  sessionUser: UserModelProps;
}

export interface JwtPayload {
  id: number;
}

export type RequestHandlerExt=(req: RequestExt, res: Response, next: NextFunction) => void