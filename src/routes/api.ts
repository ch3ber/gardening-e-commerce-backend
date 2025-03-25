import { Router } from 'express';
import productsRoutes from '@/routes/products.routes';
import customersRoutes from '@/routes/customers.routes';
import authRoutes from '@/routes/auth.routes';

const router = Router();

router.use('/products', productsRoutes);
router.use('/customers', customersRoutes);
router.use('/auth', authRoutes);

export default router;
