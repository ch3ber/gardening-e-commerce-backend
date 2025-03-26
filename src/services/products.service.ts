import { PrismaClient, Producto } from '@prisma/client';
import { CreateProductDTO, UpdateProductDTO } from '@/dtos/product.dto';

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

export const createProduct = async (data: CreateProductDTO) => {
  return prisma.producto.create({ data });
};

export const updateProduct = async (id: number, data: UpdateProductDTO) => {
  return prisma.producto.update({ where: { id }, data });
};

export const deleteProduct = async (id: number): Promise<Producto> => {
  return prisma.producto.delete({ where: { id } });
};
