import express, { Request, Response } from 'express';
import productosRouter from '@/routes/products';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/productos', productosRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Backend E-commerce funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
