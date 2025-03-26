import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
}

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No autorizado, token requerido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY') as JwtPayload;
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
    return;
  }
};

