/*
  Warnings:

  - You are about to drop the `Org` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PuppyAge" AS ENUM ('PUPPY', 'ADULT', 'ELDER');

-- CreateEnum
CREATE TYPE "PuppySize" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "PuppyEnergy" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PuppyDependencie" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('CLOSED', 'SMALL_OPEN', 'WIDE_OPEN');

-- DropTable
DROP TABLE "Org";

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "admin_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "adress_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "puppy_age" "PuppyAge" NOT NULL DEFAULT 'ADULT',
    "puppy_size" "PuppySize" NOT NULL DEFAULT 'MEDIUM',
    "puppy_energy" "PuppyEnergy" NOT NULL DEFAULT 'MEDIUM',
    "environment" "Environment" NOT NULL DEFAULT 'WIDE_OPEN',
    "puppy_dependency" "PuppyDependencie" NOT NULL DEFAULT 'MEDIUM',
    "adopted" BOOLEAN NOT NULL,
    "puppy_photos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "puppy_adoption_req" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "org_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
