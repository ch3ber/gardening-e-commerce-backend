import { Request, Response } from 'express';
import * as CartService from '@/services/cart.service';

export const getCart = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  if (!userId) {
    res.status(400).json({ error: "El campo 'userId' es requerido" });
    return
  }
  const cart = await CartService.getCartByUser(userId);
  res.json(cart ?? { items: [] });
};

export const addItem = async (req: Request, res: Response) => {
  const { productoId, cantidad, userId } = req.body;
  if (!userId) {
    res.status(400).json({ error: "El campo 'userId' es requerido" });
    return
  }
  const item = await CartService.addItemToCart(userId, productoId, cantidad);
  res.status(201).json(item);
};

export const updateItem = async (req: Request, res: Response) => {
  const { cantidad } = req.body;
  const itemId = Number(req.params.itemId);
  const item = await CartService.updateItemQuantity(itemId, cantidad);
  res.json(item);
};

export const removeItem = async (req: Request, res: Response) => {
  const itemId = Number(req.params.itemId);
  await CartService.removeItemFromCart(itemId);
  res.status(204).send();
};

export const clear = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  if (!userId) {
    res.status(400).json({ error: "El campo 'userId' es requerido" });
    return
  }
  await CartService.clearCart(userId);
  res.status(204).send();
};
