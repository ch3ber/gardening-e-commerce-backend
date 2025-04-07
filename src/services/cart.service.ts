import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getCartByUser = async (userId: number) => {
  return prisma.carrito.findUnique({
    where: { usuarioId: userId },
    include: { items: { include: { producto: true } } },
  });
};

export const addItemToCart = async (
  userId: number,
  productoId: number,
  cantidad: number = 1
) => {
  const carrito = await prisma.carrito.upsert({
    where: { usuarioId: userId },
    update: {},
    create: { usuarioId: userId },
  });

  const existingItem = await prisma.itemCarrito.findFirst({
    where: { carritoId: carrito.id, productoId },
  });

  if (existingItem) {
    return prisma.itemCarrito.update({
      where: { id: existingItem.id },
      data: { cantidad: existingItem.cantidad + cantidad },
    });
  }

  return prisma.itemCarrito.create({
    data: {
      carritoId: carrito.id,
      productoId,
      cantidad,
    },
  });
};

export const updateItemQuantity = async (itemId: number, cantidad: number) => {
  return prisma.itemCarrito.update({
    where: { id: itemId },
    data: { cantidad },
  });
};

export const removeItemFromCart = async (itemId: number) => {
  return prisma.itemCarrito.delete({ where: { id: itemId } });
};

export const clearCart = async (userId: number) => {
  const carrito = await prisma.carrito.findUnique({ where: { usuarioId: userId } });
  if (carrito) {
    await prisma.itemCarrito.deleteMany({ where: { carritoId: carrito.id } });
  }
};
