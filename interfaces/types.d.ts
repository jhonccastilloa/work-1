import { Request } from 'express';
import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

type Role = 'client' | 'employee';
type Status = 'available' | 'unavailable';

export interface User {
  id: Number;
  name: String;
  email: String;
  password: String;
  role: Role;
  status: status;
}

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<Number>;
  name: String;
  email: String;
  password: String;
  role: Role;
  status: CreationOptional<Status>;
}
export interface RequestExt extends Request {
  user?: UserModel;
}

// declare global {
//   namespace Express {
//     interface Request {
//       user: User;
//     }
//   }
// }
