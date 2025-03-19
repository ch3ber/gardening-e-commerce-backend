"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
(0, vitest_1.describe)('Prueba inicial', () => {
    (0, vitest_1.it)('Debería sumar correctamente dos números', () => {
        const suma = (a, b) => a + b;
        (0, vitest_1.expect)(suma(2, 3)).toBe(5);
    });
});
