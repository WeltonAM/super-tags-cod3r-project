import Id from "../../src/compartilhado/Id";
import SuperTag from "../../src/super-tag/modelo/SuperTag";
import RepositorioSuperTag from "../../src/super-tag/provedor/RepositorioSuperTag";

export default class RepositorioSuperTagMock implements RepositorioSuperTag {
    constructor(private readonly superTags: SuperTag[] = []) {}

    async salvar(superTag: SuperTag): Promise<SuperTag> {
        const index = this.superTags.findIndex((c) => c.id.valor === superTag.id.valor);

        if (index >= 0) {
            this.superTags[index] = superTag;
        } else {
            this.superTags.push(superTag);
        }

        return superTag;
    }

    async obterPorId(superTagId: string | Id | undefined): Promise<SuperTag | null> {
        if (superTagId === undefined) return null; 
     
        return this.superTags.find((u) => u.id.valor === (superTagId instanceof Id ? superTagId.valor : superTagId)) ?? null;
    }
    
    async obterFilhas(chaveRelacionamento: string | Id | undefined): Promise<SuperTag[]> {
        if (chaveRelacionamento === undefined) return [];

        return this.superTags.filter((u) => u.chaveRelacionamento?.valor === (chaveRelacionamento instanceof Id ? chaveRelacionamento.valor : chaveRelacionamento)) ?? [];
    }

    async obterPorTitulo(titulo: string): Promise<SuperTag | null> {
        return this.superTags.find((u) => u.titulo === titulo) ?? null;
    }
}
