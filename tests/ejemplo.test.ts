import { describe, it, expect } from 'vitest';

describe('Prueba inicial', () => {
  it('Debería sumar correctamente dos números', () => {
    const suma = (a: number, b: number): number => a + b;
    expect(suma(2, 3)).toBe(5);
  });
});
