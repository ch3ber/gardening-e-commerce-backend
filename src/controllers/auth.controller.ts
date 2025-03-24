import { Request, Response } from 'express';
import { registerUser, loginUser } from '@/services/auth.service';
import { generateToken } from '@/utils/generateToken';

export const register = async (req: Request, res: Response) => {
  const { email, password, nombre } = req.body;
  try {
    const user = await registerUser(email, password, nombre);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};
