import { Router } from 'express';
import * as ProductController from '@/controllers/products.controller';
import { protect } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate.middleware';
import { body, param } from 'express-validator';

const router = Router();

router.get('/', ProductController.getAll);

router.get(
  '/:id',
  [param('id').isInt().withMessage('ID debe ser un número entero válido.')],
  validate,
  ProductController.getById,
);

// Proteger y validar rutas sensibles
router.post(
  '/',
  protect,
  [
    body('nombre').notEmpty().withMessage('El nombre es requerido.'),
    body('precio').isFloat({ min: 0 }).withMessage('Precio debe ser un número positivo.'),
    body('stock').isInt({ min: 0 }).withMessage('Stock debe ser un número entero positivo.'),
    body('descripcion').notEmpty().withMessage('La descripción es requerida.'),
    body('marca').notEmpty().withMessage('La marca es requerida.'),
  ],
  validate,
  ProductController.create,
);

router.put(
  '/:id',
  protect,
  [
    param('id').isInt().withMessage('ID debe ser un número entero válido.'),
    body('nombre').optional().notEmpty(),
    body('precio').optional().isFloat({ min: 0 }),
    body('stock').optional().isInt({ min: 0 }),
    body('descripcion').optional().notEmpty(),
  ],
  validate,
  ProductController.update,
);

router.delete(
  '/:id',
  protect,
  [param('id').isInt().withMessage('ID debe ser un número entero válido.')],
  validate,
  ProductController.remove,
);

export default router;
