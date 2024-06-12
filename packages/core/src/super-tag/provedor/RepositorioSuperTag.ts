import SuperTag from "../modelo/SuperTag"

export default interface RepositorioSuperTag {
    salvar(superTag: SuperTag): Promise<SuperTag>
    obterPorId(superTagId: string): Promise<SuperTag | null>
    obterPorTitulo(titulo: string): Promise<SuperTag | null>
    obterFilhas(superTagId: string): Promise<SuperTag[]>
}
