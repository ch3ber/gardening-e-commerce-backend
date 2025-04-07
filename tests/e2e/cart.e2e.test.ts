import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '@/index';
import { userAdminDomie, adminCredentialsDomie, adminNameDomie } from '../domies/user.domie';

const prisma = new PrismaClient();
let token: string;
let productId: number;
let cartItemId: number;

describe('E2E para Carrito de Compras API (/api/v1/cart)', () => {
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

  beforeAll(async () => {
    // Crear un producto dummy para usar en el carrito
    const product = await prisma.producto.create({
      data: {
        nombre: 'Producto Test',
        descripcion: 'Descripción del producto test',
        precio: 100.0,
        stock: 50,
        departamento: 'TestDept',
        marca: 'TestBrand',
        disponible: true,
        // Si tu modelo tiene campos opcionales, puedes omitirlos o asignarles un valor:
        descuento: 0,
        precioConDescuento: null,
        mesesSinIntereses: false,
        mesesConIntereses: null,
        calificacion: null,
        caracteristicas: 'Características de prueba',
        tiempoEntrega: '3 días',
        estaEnRebaja: false,
        creadoPor: 'TestSeller',
      },
    });
    productId = product.id;
  });

  afterAll(async () => {
    await prisma.itemCarrito.deleteMany({});
    await prisma.carrito.deleteMany({});
    await prisma.producto.deleteMany({ where: { id: productId } });
    await prisma.usuario.deleteMany({ where: { email: adminCredentialsDomie.email } });
    await prisma.$disconnect();
  });

  it('Debería obtener un carrito vacío inicialmente (GET /cart)', async () => {
    const res = await request(app)
      .get('/api/v1/cart')
    expect(res.status).toBe(200);
    // Se espera que "items" sea un array vacío o similar
    expect(res.body).toHaveProperty('items');
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.items.length).toBe(0);
  });

  it('Debería agregar un producto al carrito (POST /cart/add)', async () => {
    const res = await request(app)
      .post('/api/v1/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user
        productoId: productId,
        cantidad: 2,
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.cantidad).toBe(2);
    cartItemId = res.body.id;
  });

  it('Debería obtener el carrito con 1 ítem (GET /cart)', async () => {
    const res = await request(app)
      .get('/api/v1/cart')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('items');
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.items.length).toBe(1);
  });

  it('Debería actualizar la cantidad del ítem en el carrito (PUT /cart/item/:itemId)', async () => {
    const nuevaCantidad = 5;
    const res = await request(app)
      .put(`/api/v1/cart/item/${cartItemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ cantidad: nuevaCantidad });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('cantidad', nuevaCantidad);
  });

  it('Debería eliminar el ítem del carrito (DELETE /cart/item/:itemId)', async () => {
    const res = await request(app)
      .delete(`/api/v1/cart/item/${cartItemId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });

  it('Debería tener el carrito vacío después de eliminar el ítem (GET /cart)', async () => {
    const res = await request(app)
      .get('/api/v1/cart')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(0);
  });

  it('Debería agregar un producto y luego vaciar el carrito (DELETE /cart/clear)', async () => {
    // Agregar nuevamente un ítem al carrito
    await request(app)
      .post('/api/v1/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ productoId: productId, cantidad: 3 });


    // Vaciar el carrito
    const resClear = await request(app)
      .delete('/api/v1/cart/clear')
    expect(resClear.status).toBe(204);

    // Verificar que el carrito esté vacío
    const resGet = await request(app)
      .get('/api/v1/cart')
    expect(resGet.status).toBe(200);
    expect(resGet.body.items.length).toBe(0);
  });
});
