import { Router } from 'express';
import {
  createUser,
  deleteUser,
  findUser,
  findUsers,
  updateUser,
} from '../controllers/users.controller';
import validUserById from '../middlewares/users.middlewares';

const router = Router();

router.get('/', findUsers);
router.get('/:id', validUserById, findUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
