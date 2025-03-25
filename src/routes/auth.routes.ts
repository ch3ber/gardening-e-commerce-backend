import { Router } from 'express';
import { register, login } from '@/controllers/auth.controller';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('nombres').notEmpty(),
    body('apellidos').notEmpty(),
    body('telefono').notEmpty(),
    body('direccion').notEmpty(),
    body('codigoPostal').notEmpty(),
  ],
  register
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').exists()],
  login
);

export default router;
