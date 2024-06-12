import Id from "../../src/compartilhado/Id";
import SuperTag from "../../src/super-tag/modelo/SuperTag";
import RepositorioSuperTag from "../../src/super-tag/provedor/RepositorioSuperTag";

export default class RepositorioSuperTagMock implements RepositorioSuperTag {
  private superTags: SuperTag[];

  constructor(superTags: SuperTag[] = []) {
    this.superTags = superTags;
  }

  async salvar(superTag: SuperTag): Promise<SuperTag> {
    const index = this.superTags.findIndex(
      (tag) => tag.id.valor === superTag.id.valor
    );

    if (index >= 0) {
      this.superTags[index] = superTag;
    } else {
      this.superTags.push(superTag);
    }

    return superTag;
  }

  async obterPorId(
    superTagId: string | Id | undefined
  ): Promise<SuperTag | null> {
    if (superTagId === undefined) return null;

    return (
      this.superTags.find(
        (tag) =>
          tag.id.valor ===
          (superTagId instanceof Id ? superTagId.valor : superTagId)
      ) ?? null
    );
  }

  async obterFilhas(chaveFilha: string | Id | undefined): Promise<SuperTag[]> {
    if (chaveFilha === undefined) return [];

    return (
      this.superTags.filter(
        (tag) =>
          tag.chaveFilha?.valor ===
          (chaveFilha instanceof Id ? chaveFilha.valor : chaveFilha)
      ) ?? []
    );
  }

  async obterPorTitulo(titulo: string): Promise<SuperTag | null> {
    return this.superTags.find((tag) => tag.titulo === titulo) ?? null;
  }
}
