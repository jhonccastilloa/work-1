import { Router } from 'express';
import {
  createUser,
  deleteUser,
  findUser,
  findUsers,
  loginUser,
  updateUser,
} from '../controllers/users.controller';
import protect from '../middlewares/sessionActive';
import validUserById from '../middlewares/users.middlewares';
import validateUserCreate from '../validators/users.validators';

const router = Router();
router.use(protect)
router.get('/', findUsers);
router.get('/:id', validUserById, findUser);
router.post('/', validateUserCreate, createUser);
router.patch('/:id', validUserById, updateUser);
router.delete('/:id', validUserById, deleteUser);
router.post('/login', loginUser);

export default router;
