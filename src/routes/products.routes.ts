import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Listado de productos' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Detalles del producto ${req.params.id}` });
});

export default router;
