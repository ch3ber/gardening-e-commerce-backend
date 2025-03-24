import { Router } from 'express';
import { register, login } from '@/controllers/auth.controller';
import { body } from 'express-validator';

const router = Router();

router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists(),
], login);

export default router;
