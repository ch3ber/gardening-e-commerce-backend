import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '@/index'; // exporta app express desde src/index.ts

const prisma = new PrismaClient();

describe('Pruebas de Autenticación (/api/v1/auth)', () => {
  const userData = {
    email: 'testuser@example.com',
    password: 'testpassword',
    nombres: 'Test',
    apellidos: 'User',
    telefono: '5551234567',
    direccion: 'Calle Demo 123',
    codigoPostal: '54321',
    rol: 'CLIENTE',
  };

  beforeAll(async () => {
    await prisma.usuario.deleteMany({ where: { email: userData.email } });
  });

  afterAll(async () => {
    await prisma.usuario.deleteMany({ where: { email: userData.email } });
    await prisma.$disconnect();
  });

  it('debería registrar un usuario exitosamente (POST /register)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(userData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('email', userData.email);
  });

  it('no debería registrar un usuario si ya existe (POST /register)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(userData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('debería iniciar sesión correctamente (POST /login)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: userData.email, password: userData.password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('no debería iniciar sesión con contraseña incorrecta (POST /login)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: userData.email, password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
