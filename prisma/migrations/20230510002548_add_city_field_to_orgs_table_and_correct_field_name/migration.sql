/*
  Warnings:

  - You are about to drop the column `adress_name` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `address_name` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "adress_name",
ADD COLUMN     "address_name" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL;
