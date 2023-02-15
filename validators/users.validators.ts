import { body } from 'express-validator';
import validateField from '../middlewares/validateField.middlewares';

const validateUserCreate = [
  body('name', 'Asegurase de tener un nombre correcto').exists().notEmpty(),
  body('email', 'Asegurase de tener un email correcto')
    .exists()
    .notEmpty()
    .isEmail(),
  body('password', 'Asegurase de tener una contraseña correcta')
    .exists()
    .notEmpty(),
  validateField,
];

export default validateUserCreate