import { PrismaClient } from "@prisma/client";
import { SuperTag, RepositorioSuperTag, Propriedade, Emoji } from "core";

export default class RepositorioSuperTagPrismaPg
  implements RepositorioSuperTag
{
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async salvar(superTag: SuperTag): Promise<SuperTag> {
    const superTagAtual = await this.obterPorId(superTag.id.valor);
    // const propriedadesParaRemover =
    //   superTagAtual?.aulas.naoEncontradas(curso.aulas).props ?? [];

    const superTagDB: Partial<SuperTag> = {
      id: superTag.id.valor,
      titulo: superTag.titulo,
      emoji: superTag.emoji,
      propriedades: superTag.propriedades,
      chaveRelacionamento: superTag.chaveRelacionamento,
    };

    await this.prisma.$transaction([
      this.prisma.superTag.upsert({
        where: { id: superTag.id.valor ?? -1 },
        update: superTagDB,
        create: superTagDB,
      }),
      ...superTag.propriedades.map((propriedade: Propriedade) => {
        const propriedadesDB: Partial<Propriedade> = {
          id: propriedade.id.valor,
          tipo: propriedade.tipo,
          valor: propriedade.valor,
          descricao: propriedade.descricao,
        };
        return this.prisma.propriedade.upsert({
          where: { id: propriedade.id.valor ?? -1 },
          update: propriedadesDB,
          create: propriedadesDB,
        });
      }),
      //   ...propriedadesParaRemover.map((prop: any) =>
      //     this.prisma.prop.delete({ where: { id: prop.id } })
      //   ),
    ]);

    return superTag;
  }

  obterPorId(superTagId: string): Promise<SuperTag | null> {
    throw new Error("Method not implemented.");
  }

  obterPorTitulo(titulo: string): Promise<SuperTag | null> {
    throw new Error("Method not implemented.");
  }

  obterFilhas(superTagId: string): Promise<SuperTag[]> {
    throw new Error("Method not implemented.");
  }
}
