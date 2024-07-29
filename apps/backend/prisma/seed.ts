import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  const usuario = {
    id: faker.string.uuid(),
    nome: "Usuário Admin",
    email: "admin@formacao.dev",
    senha: "$2b$10$9LQTRK3LRzIddKYW2C4MTelydFzk5Ys4JoROPajNqvYshhrn1PRa6",
  };

  await prisma.usuario.create({ data: usuario });

  const superTag = {
    id: faker.string.uuid(),
    title: "Super Tag",
    emoji: "👨‍💻",
    updatedAt: new Date(),
  };

  const createdSuperTag = await prisma.superTag.create({ data: superTag });

  const propriedades = [
    {
      id: faker.string.uuid(),
      superTagId: createdSuperTag.id,
      tipo: "texto",
      valor: "string",
      descricao: "Descrição da propriedade 1",
    },
    {
      id: faker.string.uuid(),
      superTagId: createdSuperTag.id,
      tipo: "checkbox",
      valor: "boolean",
      descricao: "Descrição da propriedade 2",
    },
  ];

  await prisma.propriedade.createMany({ data: propriedades });

  console.log("Seed data has been created successfully");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
