import bcrypt from 'bcryptjs'
import { Role } from '@prisma/client'

export const adminNameDomie = 'Admin Test'

export const adminCredentialsDomie = {
  email: 'admin@test.com',
  password: 'password123.'
}
export const userAdminDomie = {
  email: adminCredentialsDomie.email,
  password: bcrypt.hashSync(adminCredentialsDomie.password, 10),
  nombres: adminNameDomie,
  apellidos: 'Tlast TName',
  telefono: '1234567890',
  direccion: 'Test Address',
  codigoPostal: '12345',
  rol: Role.ADMIN,
}

export const userDomie = {
  email: 'testuser@example.com',
  password: 'testpassword',
  nombres: 'Test',
  apellidos: 'User',
  telefono: '5551234567',
  direccion: 'Calle Demo 123',
  codigoPostal: '54321',
  rol: Role.CLIENTE
}