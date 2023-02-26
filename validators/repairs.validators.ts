import { body } from 'express-validator';
import validateField from '../middlewares/validateField.middlewares';

const validateRepairCreate = [
  body('date', 'Make sure you have a correct date')
    .exists()
    .notEmpty()
    .isDate(),
  body('motorsNumber', 'Make sure you have a correct motorcycle number')
    .exists()
    .notEmpty()
    .isNumeric(),
  body('description', 'Make sure you have a correct description')
    .exists()
    .notEmpty(),
  validateField,
];

export default validateRepairCreate;
