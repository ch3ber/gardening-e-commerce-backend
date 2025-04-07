import { Router } from 'express';
import * as CartController from '@/controllers/cart.controller';
import { protect } from '@/middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', CartController.getCart);
router.post('/add', CartController.addItem);
router.put('/item/:itemId', CartController.updateItem);
router.delete('/item/:itemId', CartController.removeItem);
router.delete('/clear', CartController.clear);

export default router;
