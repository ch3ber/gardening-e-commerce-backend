/*
  Warnings:

  - Changed the type of `tipo` on the `MetodoPago` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoPago" AS ENUM ('TARJETA_CREDITO', 'TARJETA_DEBITO', 'TRANSFERENCIA_SPEI');

-- AlterTable
ALTER TABLE "MetodoPago" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoPago" NOT NULL;
