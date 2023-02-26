import { Router } from 'express';
import {
  createUser,
  deleteUser,
  findUser,
  findUsers,
  loginUser,
  updateUser,
} from '../controllers/users.controller';
import { protect, protectAccountOwner } from '../middlewares/auth.middlewares';
import {
  validRepeatEmail,
  validUserById,
} from '../middlewares/users.middlewares';
import validateUserCreate from '../validators/users.validators';

const router = Router();

router.post('/login', loginUser);
router.post('/', validateUserCreate, validRepeatEmail, createUser);

router.use(protect);

router.get('/', findUsers);
router.get('/:id', validUserById, findUser);
router.patch(
  '/:id',
  validUserById,
  protectAccountOwner,
  validRepeatEmail,
  updateUser
);
router.delete('/:id', validUserById, protectAccountOwner, deleteUser);

export default router;
