import { Router } from 'express';
import { createRepair, deleteRepair, findRepair, findRepairs, updateRepair } from '../controllers/repairs.controller';
import { validRepairById, validRepairCompleted } from '../middlewares/repairs.middlewares';
import validateRepairCreate from '../validators/repairs.validators';


const router = Router();

router.get('/', findRepairs);
router.get('/:id', validRepairById, findRepair);
router.post('/', validateRepairCreate,createRepair);
router.patch('/:id', validRepairById, updateRepair);
router.delete('/:id', validRepairCompleted, deleteRepair);

export default router;
