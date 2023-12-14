-- CreateTable
CREATE TABLE "cart" (
    "id" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
