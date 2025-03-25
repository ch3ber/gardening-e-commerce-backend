import express from 'express';
import apiRouter from '@/routes/api';

const app = express();

app.use(express.json());
app.use('/api/v1', apiRouter);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
