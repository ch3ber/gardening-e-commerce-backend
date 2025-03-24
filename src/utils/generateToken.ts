import jwt from 'jsonwebtoken';

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.SECRET_JWT_KEY as string, { expiresIn: '7d' });
};
