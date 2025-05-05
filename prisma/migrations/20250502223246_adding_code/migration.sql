-- AlterTable
ALTER TABLE "products" ADD COLUMN     "code" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "gateway" (
    "code_id" TEXT NOT NULL,
    "client_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gateway_pkey" PRIMARY KEY ("code_id")
);
