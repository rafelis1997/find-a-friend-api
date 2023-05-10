-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "puppy_photos" DROP NOT NULL,
ALTER COLUMN "puppy_photos" SET DATA TYPE TEXT,
ALTER COLUMN "puppy_adoption_req" DROP NOT NULL,
ALTER COLUMN "puppy_adoption_req" SET DATA TYPE TEXT;
