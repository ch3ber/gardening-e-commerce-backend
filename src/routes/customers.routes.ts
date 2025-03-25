import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Listado de clientes' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Detalles del cliente ${req.params.id}` });
});

export default router;
