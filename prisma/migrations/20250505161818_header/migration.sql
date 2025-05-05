-- CreateTable
CREATE TABLE "header" (
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "param" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "header_pkey" PRIMARY KEY ("code")
);
