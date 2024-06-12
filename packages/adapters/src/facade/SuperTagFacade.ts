import { SuperTag, RegistrarSuperTag, Propriedade, Emoji, RepositorioSuperTag } from "core";
import { SuperTagDTO } from "../dto";
import Id from "core/src/compartilhado/Id";

export default class SuperTagFacade {
    constructor(private repo: RepositorioSuperTag) {}

    async criarSuperTag(titulo: string, emoji: Emoji, propriedades: Propriedade[], chaveRelacionamento: Id): Promise<SuperTagDTO> {
        const casoDeUso = new RegistrarSuperTag(this.repo);
        const superTag = await casoDeUso.executar({ titulo, emoji, propriedades, chaveRelacionamento: chaveRelacionamento.valor });

        return superTag.props;
    }
    
    async obterSuperTagPorId(superTagId: string): Promise<SuperTagDTO> {
        const superTag = await this.repo.obterPorId(superTagId);
        
        return superTag!.props;
    }
    
    async obterSuperTagPorTitulo(titulo: string): Promise<SuperTagDTO> {
        const superTag = await this.repo.obterPorTitulo(titulo);
        
        return superTag!.props;
    }
        
    async obterSuperTagFilhas(chaveRelacionamento: Id): Promise<SuperTagDTO[]> {
        const superTagsFilhas = await this.repo.obterFilhas(chaveRelacionamento.valor);
        
        return superTagsFilhas.map(superTag => superTag.props);
    }

    // async adicionarPropriedade(superTagId: string, propriedade: Propriedade): Promise<SuperTagDTO | null> {
    //     const superTag = await this.repo.obterPorId(superTagId);
    //     if (!superTag) return null;
    
    //     superTag.adicionarPropriedade(propriedade);
    //     await this.repo.salvar(superTag);
    //     return superTag.props;
    // }

    // async removerPropriedade(superTagId: string, propriedadeId: string): Promise<SuperTagDTO> {
    //     const superTag = await this.repo.obterPorId(superTagId);
    //     if (!superTag) return null;

    //     superTag.removerPropriedade(propriedadeId);
    //     await this.repo.salvar(superTag);
    //     return superTag;
    // }

    // async atualizarTitulo(superTagId: string, novoTitulo: string): Promise<SuperTagDTO> {
    //     const superTag = await this.repo.obterPorId(superTagId);
    //     if (!superTag) return null;

    //     superTag.atualizarTitulo(novoTitulo);
    //     await this.repo.salvar(superTag);
    //     return superTag;
    // }
}
