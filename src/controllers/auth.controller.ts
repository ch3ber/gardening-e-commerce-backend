import { Request, Response } from 'express';
import { registerUser, loginUser } from '@/services/auth.service';
import { generateToken } from '@/utils/generateToken';
import { validationResult } from 'express-validator';
import { Role } from '@prisma/client';

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return
  }

  const { email, password, nombres, apellidos, telefono, direccion, codigoPostal, rol } = req.body;

  try {
    const user = await registerUser(
      email,
      password,
      nombres,
      apellidos,
      telefono,
      direccion,
      codigoPostal,
      rol as Role,
    );

    res.status(201).json({ id: user.id, email: user.email, nombres: user.nombres });
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
