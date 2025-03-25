import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Registra un nuevo usuario con información completa.
 */
export const registerUser = async (
  email: string,
  password: string,
  nombres: string,
  apellidos: string,
  telefono: string,
  direccion: string,
  codigoPostal: string,
  rol: Role = Role.CLIENTE
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const nuevoUsuario = await prisma.usuario.create({
    data: {
      email,
      password: hashedPassword,
      nombres,
      apellidos,
      telefono,
      direccion,
      codigoPostal,
      rol,
    },
  });

  return nuevoUsuario;
};

/**
 * Autentica un usuario mediante email y contraseña.
 */
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.usuario.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciales incorrectas');
  }

  return user;
};
