import { faker } from '@faker-js/faker';
import { Producto } from '@prisma/client';

export const createProductMock = (): Producto => ({
  id: faker.number.int({ min: 1, max: 10000 }),
  nombre: faker.commerce.productName(),
  descripcion: faker.commerce.productDescription(),
  precio: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
  stock: faker.number.int({ min: 1, max: 100 }),
  departamento: faker.commerce.department(),
  descuento: faker.number.float({ min: 5, max: 20 }),
  precioConDescuento: faker.number.float({ min: 20, max: 400 }),
  mesesSinIntereses: faker.datatype.boolean(),
  mesesConIntereses: faker.number.int({ min: 3, max: 12 }),
  calificacion: faker.number.float({ min: 1, max: 5, fractionDigits: 2 }),
  marca: faker.company.name(),
  disponible: true,
  caracteristicas: faker.lorem.sentence(),
  tiempoEntrega: `${faker.number.int({ min: 1, max: 7 })} días`,
  estaEnRebaja: faker.datatype.boolean(),
  creadoPor: 'MockSeller',
  createdAt: new Date(),
  updatedAt: new Date(),
});
