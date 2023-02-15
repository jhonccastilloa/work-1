import { body } from 'express-validator';
import validateField from '../middlewares/validateField.middlewares';

const validateRepairCreate = [
  body('date', 'Asegurase de tener una fecha correcto')
    .exists()
    .notEmpty()
    .isDate(),
  body('motorsNumber', 'Asegurase de tener un numero de moto correcto')
    .exists()
    .notEmpty()
    .isNumeric(),
  body('description', 'Asegurase de tener una descripcion correcta')
    .exists()
    .notEmpty(),
  validateField,
];

export default validateRepairCreate;
