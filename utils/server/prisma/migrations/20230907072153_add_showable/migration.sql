/*
  Warnings:

  - You are about to drop the column `description` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Machine` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "description",
ADD COLUMN     "showable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "description",
ADD COLUMN     "showable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Machine" DROP COLUMN "description",
ADD COLUMN     "showable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "description",
ADD COLUMN     "showable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "description",
ADD COLUMN     "showable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
ADD COLUMN     "showable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "description",
ADD COLUMN     "showable" BOOLEAN NOT NULL DEFAULT true;
