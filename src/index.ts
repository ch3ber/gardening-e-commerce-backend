import express, { Request, Response } from 'express';
import productosRouter from '@/routes/products';
import { PrismaClient } from '@prisma/client';

// Routes
import authRoutes from '@/routes/auth.routes';
import { protect } from './middlewares/authMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/productos', productosRouter);

app.get('/perfil', protect, async (req, res) => {
  const user = await prisma.usuario.findUnique({ where: { id: req.body.userId } });
  res.json(user);
});

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
