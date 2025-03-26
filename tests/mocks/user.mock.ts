import { faker } from '@faker-js/faker';
import { Role, Usuario } from '@prisma/client';

export const createUserMock = (rol: Role = Role.CLIENTE): Usuario => ({
  id: faker.number.int({ min: 1, max: 10000 }),
  email: faker.internet.email(),
  password: faker.internet.password(),
  nombres: faker.person.firstName(),
  apellidos: faker.person.lastName(),
  telefono: faker.phone.number(),
  direccion: faker.location.streetAddress(),
  codigoPostal: faker.location.zipCode(),
  rol,
  createdAt: new Date(),
  updatedAt: new Date(),
});
