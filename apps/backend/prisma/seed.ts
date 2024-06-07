import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

async function seed() {
    const usuario = {
        id: faker.string.uuid(),
        nome: "Usuário Admin",
        email: "admin@formacao.dev",
        // senha é... #Senha123
        senha: "$2b$10$9LQTRK3LRzIddKYW2C4MTelydFzk5Ys4JoROPajNqvYshhrn1PRa6",
    }

    await prisma.usuario.create({ data: usuario })
}

seed()
