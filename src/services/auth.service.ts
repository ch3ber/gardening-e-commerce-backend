import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const registerUser = async (email: string, password: string, nombre?: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.usuario.create({
    data: {
      email,
      password: hashedPassword,
      nombre,
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciales incorrectas');
  }
  return user;
};
