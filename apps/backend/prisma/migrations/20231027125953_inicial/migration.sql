-- CreateTable
CREATE TABLE "Usuario" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SuperTag" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "superTagPaiId" UUID,
    CONSTRAINT "SuperTag_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Propriedade" (
    "id" UUID NOT NULL,
    "superTagId" UUID NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    CONSTRAINT "Propriedade_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

ALTER TABLE
    "SuperTag"
ADD
    CONSTRAINT "SuperTag_superTagPaiId_fkey" FOREIGN KEY ("superTagPaiId") REFERENCES "SuperTag"("id") ON DELETE
SET
    NULL ON UPDATE CASCADE;

ALTER TABLE
    "Propriedade"
ADD
    CONSTRAINT "Propriedade_superTagId_fkey" FOREIGN KEY ("superTagId") REFERENCES "SuperTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;