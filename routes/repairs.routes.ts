import { Router } from 'express';
import {
  createRepair,
  deleteRepair,
  findRepair,
  findRepairs,
  updateRepair,
} from '../controllers/repairs.controller';
import { checkRol, protect } from '../middlewares/auth.middlewares';
import {
  validRepairById,
  validRepairCompleted,
} from '../middlewares/repairs.middlewares';
import validateRepairCreate from '../validators/repairs.validators';

const router = Router();

router.use(protect);
router.get('/', checkRol(['employee']), findRepairs);
router.get('/:id', checkRol(['employee']), validRepairById, findRepair);
router.post('/', validateRepairCreate, createRepair);
router.patch('/:id', checkRol(['employee']), validRepairById, updateRepair);
router.delete(
  '/:id',
  checkRol(['employee']),
  validRepairCompleted,
  deleteRepair
);

export default router;
