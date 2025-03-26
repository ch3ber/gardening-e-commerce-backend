import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const generateToken = (userId: number, role: Role) => {
  return jwt.sign({ userId, role }, process.env.SECRET_JWT_KEY as string, { expiresIn: '7d' });
};
