-- CreateTable
CREATE TABLE "Files" (
    "code" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE INDEX "Files_product_id_idx" ON "Files"("product_id");

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
