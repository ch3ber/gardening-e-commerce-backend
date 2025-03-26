import { PrismaClient, Producto } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async (): Promise<Producto[]> => {
  return prisma.producto.findMany({
    include: { categorias: true, etiquetas: true, imagenes: true },
  });
};

export const getProductById = async (id: number): Promise<Producto | null> => {
  return prisma.producto.findUnique({
    where: { id },
    include: { categorias: true, etiquetas: true, imagenes: true },
  });
};

export const createProduct = async (data: Producto): Promise<Producto> => {
  return prisma.producto.create({ data });
};

export const updateProduct = async (id: number, data: Partial<Producto>): Promise<Producto> => {
  return prisma.producto.update({ where: { id }, data });
};

export const deleteProduct = async (id: number): Promise<Producto> => {
  return prisma.producto.delete({ where: { id } });
};
