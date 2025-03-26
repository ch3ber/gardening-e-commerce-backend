import { Request, Response } from 'express';
import * as ProductService from '@/services/products.service';

export const getAll = async (_req: Request, res: Response) => {
  const products = await ProductService.getAllProducts();
  res.json(products);
};

export const getById = async (req: Request, res: Response) => {
  const product = await ProductService.getProductById(Number(req.params.id));
  product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
};

export const create = async (req: Request, res: Response) => {
  const newProduct = await ProductService.createProduct(req.body);
  res.status(201).json(newProduct);
};

export const update = async (req: Request, res: Response) => {
  const updatedProduct = await ProductService.updateProduct(Number(req.params.id), req.body);
  res.json(updatedProduct);
};

export const remove = async (req: Request, res: Response) => {
  await ProductService.deleteProduct(Number(req.params.id));
  res.status(204).send();
};
