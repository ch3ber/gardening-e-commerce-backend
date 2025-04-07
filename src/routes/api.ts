import { Router } from 'express';
import productsRoutes from '@/routes/products.routes';
import customersRoutes from '@/routes/customers.routes';
import authRoutes from '@/routes/auth.routes';
import cartRoutes from '@/routes/cart.routes';

const router = Router();

router.use('/products', productsRoutes);
router.use('/customers', customersRoutes);
router.use('/auth', authRoutes);
// router.use('/cart', cartRoutes);

export default router;
