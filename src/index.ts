import express, { Request, Response } from 'express';
import productosRouter from '@/routes/products';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use('/productos', productosRouter);

app.get('/productosprisma', async (req, res) => {
  const productos = await prisma.producto.findMany();
  res.json(productos);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Backend E-commerce funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
