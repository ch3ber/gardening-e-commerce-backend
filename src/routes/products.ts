import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ productos: ['planta', 'maceta', 'semilla'] });
});

export default router;
