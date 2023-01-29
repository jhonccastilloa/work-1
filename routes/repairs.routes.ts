import { Router } from 'express';
import { createRepair, deleteRepair, findRepair, findRepairs, updateRepair } from '../controllers/repairs.controller';
import validRepairById from '../middlewares/repairs.middlewares';


const router = Router();

router.get('/', findRepairs);
router.get('/:id', validRepairById, findRepair);
router.post('/', createRepair);
router.patch('/:id', validRepairById, updateRepair);
router.delete('/:id', validRepairById, deleteRepair);

export default router;
