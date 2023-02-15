import { Router } from 'express';
import {
  createUser,
  deleteUser,
  findUser,
  findUsers,
  updateUser,
} from '../controllers/users.controller';
import validUserById from '../middlewares/users.middlewares';
import validateUserCreate from '../validators/users.validators';

const router = Router();

router.get('/', findUsers);
router.get('/:id', validUserById, findUser);
router.post('/', validateUserCreate, createUser);
router.patch('/:id', validUserById, updateUser);
router.delete('/:id', validUserById, deleteUser);

export default router;
