import { PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Crear usuarios de ejemplo
  await prisma.usuario.createMany({
    data: [
      {
        email: 'admin@ejemplo.com',
        password: faker.internet.password(),
        nombres: 'Admin',
        apellidos: 'Ejemplo',
        telefono: faker.phone.number(),
        direccion: faker.location.streetAddress(),
        codigoPostal: faker.location.zipCode(),
        rol: Role.ADMIN,
      },
      {
        email: 'cliente@ejemplo.com',
        password: faker.internet.password(),
        nombres: 'Cliente',
        apellidos: 'Ejemplo',
        telefono: faker.phone.number(),
        direccion: faker.location.streetAddress(),
        codigoPostal: faker.location.zipCode(),
        rol: Role.CLIENTE,
      },
      {
        email: 'vendedor@ejemplo.com',
        password: faker.internet.password(),
        nombres: 'Vendedor',
        apellidos: 'Ejemplo',
        telefono: faker.phone.number(),
        direccion: faker.location.streetAddress(),
        codigoPostal: faker.location.zipCode(),
        rol: Role.VENDEDOR,
      },
    ],
  });

  // Crear categorías y etiquetas
  const categorias = ['Plantas', 'Herramientas', 'Semillas', 'Macetas'];
  const etiquetas = ['Exterior', 'Interior', 'Promoción', 'Nuevo'];

  for (const nombre of categorias) {
    await prisma.categoria.create({ data: { nombre } });
  }

  for (const nombre of etiquetas) {
    await prisma.etiqueta.create({ data: { nombre } });
  }

  const categoriasDB = await prisma.categoria.findMany();
  const etiquetasDB = await prisma.etiqueta.findMany();

  // Crear productos de ejemplo
  for (let i = 0; i < 20; i++) {
    await prisma.producto.create({
      data: {
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        precio: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
        stock: faker.number.int({ min: 1, max: 100 }),
        departamento: faker.commerce.department(),
        descuento: faker.helpers.maybe(() => faker.number.float({ min: 5, max: 20 }), { probability: 0.5 }),
        precioConDescuento: null,
        mesesSinIntereses: faker.datatype.boolean(),
        mesesConIntereses: faker.number.int({ min: 3, max: 12 }),
        calificacion: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        marca: faker.company.name(),
        disponible: true,
        caracteristicas: faker.lorem.sentence(),
        tiempoEntrega: `${faker.number.int({ min: 1, max: 7 })} días`,
        estaEnRebaja: faker.datatype.boolean(),
        creadoPor: 'Vendedor Ejemplo',
        categorias: {
          connect: faker.helpers.arrayElements(categoriasDB).map((c) => ({ id: c.id })),
        },
        etiquetas: {
          connect: faker.helpers.arrayElements(etiquetasDB).map((e) => ({ id: e.id })),
        },
        imagenes: {
          create: [
            { url: faker.image.urlPicsumPhotos({ width: 640, height: 480 }) },
            { url: faker.image.urlPicsumPhotos({ width: 640, height: 480 }) },
          ],
        },
      },
    });
  }

  await prisma.metodoPago.createMany({
    data: [
      {
        tipo: 'TARJETA_CREDITO',
        cuentaTarjeta: faker.finance.creditCardNumber(),
        cvv: faker.finance.creditCardCVV(),
        nombreCliente: faker.person.fullName(),
      },
      {
        tipo: 'TARJETA_DEBITO',
        cuentaTarjeta: faker.finance.creditCardNumber(),
        cvv: faker.finance.creditCardCVV(),
        nombreCliente: faker.person.fullName(),
      },
      {
        tipo: 'TRANSFERENCIA_SPEI',
        transferenciaSpei: faker.finance.accountNumber(),
        nombreCliente: faker.person.fullName(),
      },
    ],
  });

  console.log('🌱 Información inicial generada con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
