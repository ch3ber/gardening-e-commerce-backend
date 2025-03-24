import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.userId) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    next();
  }

  // const token = req.headers.authorization?.split(' ')[1];

  // if (!token) return res.status(401).json({ error: 'No autorizado' });

  // try {
  //   const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY as string) as { userId: number };
  //   req.body.userId = decoded.userId;
  //   next();
  // } catch {
  //   res.status(401).json({ error: 'Token inválido o expirado' });
  // }
};