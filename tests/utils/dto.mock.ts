import { faker } from '@faker-js/faker';
import { CreateProductDTO } from '@/dtos/product.dto';
import { adminNameDomie } from '../domies/user.domie';

export const generateProductDTO = (): CreateProductDTO => ({
  nombre: faker.commerce.productName(),
  descripcion: faker.commerce.productDescription(),
  precio: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
  stock: faker.number.int({ min: 1, max: 100 }),
  departamento: faker.commerce.department(),
  descuento: faker.helpers.maybe(() => faker.number.float({ min: 5, max: 20 }), { probability: 0.5 }),
  precioConDescuento: faker.helpers.maybe(() => faker.number.float({ min: 20, max: 400 }), { probability: 0.5 }),
  mesesSinIntereses: faker.datatype.boolean(),
  mesesConIntereses: faker.helpers.maybe(() => faker.number.int({ min: 3, max: 12 }), { probability: 0.5 }),
  calificacion: faker.helpers.maybe(() => faker.number.float({ min: 1, max: 5 }), { probability: 0.5 }),
  marca: faker.company.name(),
  disponible: true,
  caracteristicas: faker.lorem.sentence(),
  tiempoEntrega: `${faker.number.int({ min: 1, max: 7 })} días`,
  estaEnRebaja: faker.datatype.boolean(),
  creadoPor: adminNameDomie
});
