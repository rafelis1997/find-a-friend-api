-- CreateTable
CREATE TABLE "Org" (
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

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);
