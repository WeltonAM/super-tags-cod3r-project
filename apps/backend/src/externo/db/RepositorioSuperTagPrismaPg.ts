import { PrismaClient } from "@prisma/client";
import {
  RepositorioSuperTag,
  SuperTag,
  SuperTagProps,
  PropriedadeTipo,
} from "core";

export default class RepositorioSuperTagPrismaPg
  implements RepositorioSuperTag
{
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private mapSuperTag(superTag: any): SuperTagProps {
    return {
      id: superTag.id,
      titulo: superTag.titulo,
      emoji: superTag.emoji,
      chavePai: superTag.superTagPaiId,
      propriedades: Array.isArray(superTag.propriedades)
        ? superTag.propriedades.map((p: any) => ({
            id: p.id,
            superTagId: p.superTagId,
            valor: p.valor,
            descricao: p.descricao,
            tipo: p.tipo as PropriedadeTipo,
          }))
        : [],
    };
  }

  salvar(superTag: SuperTag): Promise<SuperTag> {
    throw new Error("Method not implemented.");
  }

  async obterPorId(id: string): Promise<SuperTag | null> {
    if (!id) return null;

    const superTag = await this.prisma.superTag.findUnique({
      where: { id },
      include: {
        propriedades: true,
      },
    });

    return superTag ? new SuperTag(this.mapSuperTag(superTag)) : null;
  }

  obterPorTitulo(titulo: string): Promise<SuperTag | null> {
    throw new Error("Method not implemented.");
  }

  obterFilhas(superTagId: string): Promise<SuperTag[]> {
    throw new Error("Method not implemented.");
  }

  async obterTodos(): Promise<SuperTag[]> {
    const superTags = await this.prisma.superTag.findMany({
      include: {
        propriedades: true,
        superTagFilha: {
          include: {
            propriedades: true,
          },
        },
      },
    });

    return superTags.map((s: any) => new SuperTag(s));
  }
}
