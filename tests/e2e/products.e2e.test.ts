import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '@/index';
import { generateProductDTO } from '@/tests/utils/dto.mock';
import { adminCredentialsDomie, adminNameDomie, userAdminDomie } from '@/tests/domies/user.domie';

const prisma = new PrismaClient();
let token: string;
let createdProductId: number;

describe('E2E Productos API con DTO (/api/v1/products)', () => {
  beforeAll(async () => {
    await prisma.producto.deleteMany({ where: { creadoPor: adminNameDomie } });
    await prisma.usuario.deleteMany({ where: { email: adminCredentialsDomie.email } });
  });

  beforeAll(async () => {
    await prisma.usuario.create({
      data: userAdminDomie
    });

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send(adminCredentialsDomie);

    token = res.body.token;
  });

  afterAll(async () => {
    await prisma.producto.deleteMany({ where: { creadoPor: adminNameDomie } });
    await prisma.usuario.deleteMany({ where: { email: adminCredentialsDomie.email } });
    await prisma.$disconnect();
  });

  it('Crea producto usando DTO (POST /products)', async () => {
    const productDTO = generateProductDTO();

    const res = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${token}`)
      .send(productDTO);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nombre).toEqual(productDTO.nombre);
    createdProductId = res.body.id;
  });

  it('Obtiene producto creado (GET /products/:id)', async () => {
    const res = await request(app).get(`/api/v1/products/${createdProductId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('nombre');
  });

  it('Actualiza producto usando DTO (PUT /products/:id)', async () => {
    const updateDTO = { stock: 50 };

    const res = await request(app)
      .put(`/api/v1/products/${createdProductId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateDTO);

    expect(res.status).toBe(200);
    expect(res.body.stock).toEqual(50);
  });

  it('Elimina producto (DELETE /products/:id)', async () => {
    const res = await request(app)
      .delete(`/api/v1/products/${createdProductId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
