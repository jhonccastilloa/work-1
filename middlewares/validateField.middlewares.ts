import { NextFunction, Request, Response } from 'express';

const { validationResult } = require('express-validator');

const validateField = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array(),
    });
  }
  next();
};

export default validateField;
