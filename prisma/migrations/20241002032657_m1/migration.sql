-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "warranty" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "freeDelivery" BOOLEAN NOT NULL,
    "ownerEmail" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
