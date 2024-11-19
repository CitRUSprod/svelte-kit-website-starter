-- CreateTable
CREATE TABLE "LinkingToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LinkingToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnlinkingToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnlinkingToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkingToken_token_key" ON "LinkingToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "LinkingToken_email_key" ON "LinkingToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LinkingToken_userId_key" ON "LinkingToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UnlinkingToken_token_key" ON "UnlinkingToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "UnlinkingToken_email_key" ON "UnlinkingToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UnlinkingToken_userId_key" ON "UnlinkingToken"("userId");

-- AddForeignKey
ALTER TABLE "LinkingToken" ADD CONSTRAINT "LinkingToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnlinkingToken" ADD CONSTRAINT "UnlinkingToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
