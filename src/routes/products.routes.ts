import { Router } from 'express';
import * as ProductController from '@/controllers/products.controller';
import { protect } from '@/middlewares/auth.middleware';

const router = Router();

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);

// Proteger rutas no-GET
router.post('/', protect, ProductController.create);
router.put('/:id', protect, ProductController.update);
router.delete('/:id', protect, ProductController.remove);

export default router;
