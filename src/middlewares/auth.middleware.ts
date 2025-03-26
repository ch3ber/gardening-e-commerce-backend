import { Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
  rol: Role;
}

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No autorizado, token requerido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY || 'SECRET_KEY') as JwtPayload;

    if (decoded.rol === 'CLIENTE') {
      res.status(401).json({ error: 'No autorizado' });
      return;
    }

    next()
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
    return;
  }
};
