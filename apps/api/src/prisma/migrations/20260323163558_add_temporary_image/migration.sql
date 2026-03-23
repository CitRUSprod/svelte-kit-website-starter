-- CreateTable
CREATE TABLE "TemporaryImage" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemporaryImage_pkey" PRIMARY KEY ("id")
);
