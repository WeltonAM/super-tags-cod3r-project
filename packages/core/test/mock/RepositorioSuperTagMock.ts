import SuperTag from "../../src/super-tag/modelo/SuperTag"
import RepositorioSuperTag from "../../src/super-tag/provedor/SuperTagRepositorio"

export default class RepositorioSuperTagMock implements RepositorioSuperTag {
    private superTags: Map<string, SuperTag>

    constructor(private readonly superTagsIniciais: SuperTag[] = []) {
        this.superTags = new Map<string, SuperTag>()
        this.inicializarSuperTags(superTagsIniciais)
    }

    private inicializarSuperTags(superTagsIniciais: SuperTag[]): void {
        superTagsIniciais.forEach(superTag => {
            this.superTags.set(superTag.id.valor, superTag)
        })
    }

    async salvar(superTag: SuperTag): Promise<SuperTag> {
        this.superTags.set(superTag.id.valor, superTag)
        return superTag
    }

    async obterPorId(superTagId: string): Promise<SuperTag | null> {
        return this.superTags.get(superTagId) || null
    }

    async obterFilhas(superTagId: string): Promise<SuperTag[]> {
        const superTag = this.superTags.get(superTagId)
        if (!superTag) return []

        const filhas: SuperTag[] = []
        for (const propriedade of superTag.propriedades) {
            if (propriedade.tipo === "superTag") {
                const filha = await this.obterPorId(propriedade.valor)
                if (filha) filhas.push(filha)
            }
        }

        return filhas
    }

    async obterPorTitulo(titulo: string): Promise<SuperTag | null> {
        for (const superTag of this.superTags.values()) {
            if (superTag.titulo === titulo) {
                return superTag
            }
        }
        return null
    }
}
