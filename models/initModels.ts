import RepairModel from './repair.models';
import UserModel from './user.models';

const initModels = () => {
  UserModel.hasMany(RepairModel);
  RepairModel.belongsTo(UserModel);
};

export default initModels;
