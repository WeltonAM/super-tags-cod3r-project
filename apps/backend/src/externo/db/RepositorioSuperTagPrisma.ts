// import { PrismaClient, SuperTag as PrismaSuperTag, Propriedades as PrismaPropriedades } from "@prisma/client";
// import SuperTag from "../../src/super-tag/modelo/SuperTag";
// import RepositorioSuperTag from "../../src/super-tag/provedor/RepositorioSuperTag";
// import Id from "../../src/compartilhado/Id";
// import Propriedade from "../../src/super-tag/provedor/Propriedade";
// import Emoji from "../../src/super-tag/provedor/Emoji";

// export default class RepositorioSuperTagMock implements RepositorioSuperTag {
//     private prisma = new PrismaClient();

//     async salvar(superTag: SuperTag): Promise<SuperTag> {
//         const data = {
//             id: superTag.id.valor,
//             title: superTag.titulo,
//             emoji: superTag.emoji.codigo,
//             propriedades: {
//                 create: superTag.propriedades.map((prop: Propriedade) => ({
//                     valor: prop.valor,
//                     descricao: prop.descricao,
//                 })),
//             },
//             superTagPaiId: superTag.chaveRelacionamento?.valor,
//         };

//         const savedSuperTag: PrismaSuperTag & { propriedades: PrismaPropriedades[] } = await this.prisma.superTag.create({
//             data,
//             include: { propriedades: true },
//         });

//         return new SuperTag({
//             id: savedSuperTag.id,
//             titulo: savedSuperTag.title,
//             emoji: { codigo: savedSuperTag.emoji } as Emoji,
//             propriedades: savedSuperTag.propriedades.map((prop: PrismaPropriedades) => ({
//                 id: prop.id,
//                 valor: prop.valor,
//                 descricao: prop.descricao,
//             })),
//             chaveRelacionamento: savedSuperTag.superTagPaiId ? new Id(savedSuperTag.superTagPaiId) : undefined,
//         });
//     }

//     async obterPorId(superTagId: string): Promise<SuperTag | null> {
//         const superTag: (PrismaSuperTag & { propriedades: PrismaPropriedades[]; superTagFilha: PrismaSuperTag[] }) | null = await this.prisma.superTag.findUnique({
//             where: { id: superTagId },
//             include: { propriedades: true, superTagFilha: true },
//         });

//         if (!superTag) return null;

//         return new SuperTag({
//             id: superTag.id,
//             titulo: superTag.title,
//             emoji: { codigo: superTag.emoji } as Emoji,
//             propriedades: superTag.propriedades.map((prop: PrismaPropriedades) => ({
//                 id: prop.id,
//                 valor: prop.valor,
//                 descricao: prop.descricao,
//             })),
//             chaveRelacionamento: superTag.superTagPaiId ? new Id(superTag.superTagPaiId) : undefined,
//         });
//     }

//     async obterFilhas(superTagId: string): Promise<SuperTag[]> {
//         const superTags: (PrismaSuperTag & { propriedades: PrismaPropriedades[] })[] = await this.prisma.superTag.findMany({
//             where: { superTagPaiId: superTagId },
//             include: { propriedades: true },
//         });

//         return superTags.map((superTag: PrismaSuperTag & { propriedades: PrismaPropriedades[] }) => new SuperTag({
//             id: superTag.id,
//             titulo: superTag.title,
//             emoji: { codigo: superTag.emoji } as Emoji,
//             propriedades: superTag.propriedades.map((prop: PrismaPropriedades) => ({
//                 id: prop.id,
//                 valor: prop.valor,
//                 descricao: prop.descricao,
//             })),
//             chaveRelacionamento: superTag.superTagPaiId ? new Id(superTag.superTagPaiId) : undefined,
//         }));
//     }
// }
